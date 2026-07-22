import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { CurricularUnit, TeachingPlan } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyAwTas2ZVm87b38aa8wCDbyk1u2CaecVP0",
  authDomain: "plano-de-aula-cronograma.firebaseapp.com",
  projectId: "plano-de-aula-cronograma",
  storageBucket: "plano-de-aula-cronograma.firebasestorage.app",
  messagingSenderId: "682418554592",
  appId: "1:682418554592:web:758286437eb301b9647285",
  measurementId: "G-BYQS2BW9DM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const normalizeUnitKey = (unit: CurricularUnit): string => {
  const value = `${unit.id || ""}-${unit.code || ""}-${unit.name || ""}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (value.includes("lidt") || value.includes("leitura")) return "lidt";
  if (value.includes("cdmat") || value.includes("ciencias dos materiais")) return "cdmat";
  if (value.includes("crd") || value.includes("controle dimensional")) return "crd";
  if (value.includes("fusi") || value.includes("fundamentos da usinagem")) return "fusi";
  if (value.includes("prusc") || value.includes("processos de usinagem")) return "prusc";
  if (value.includes("metind") || value.includes("metrologia industrial")) return "metind";
  if (value.includes("matematica")) return "matematica";

  return unit.id || unit.code || unit.name;
};

const cleanUnits = (units: CurricularUnit[] = []): CurricularUnit[] => {
  const seen = new Set<string>();
  const cleaned: CurricularUnit[] = [];

  for (const unit of units) {
    const key = normalizeUnitKey(unit);

    // Matemática Aplicada não faz parte da estrutura atual.
    if (key === "matematica") continue;

    // Remove UCs repetidas dentro do mesmo plano.
    if (seen.has(key)) continue;

    seen.add(key);
    cleaned.push(unit);
  }

  return cleaned.sort((a, b) => {
    if (a.semester !== b.semester) {
      return a.semester - b.semester;
    }

    return a.order - b.order;
  });
};

const cleanPlan = (plan: TeachingPlan): TeachingPlan => ({
  ...plan,
  units: cleanUnits(plan.units)
});

export const FirebaseService = {
  async getPlans(profileId: string): Promise<TeachingPlan[]> {
    try {
      const plansQuery = query(
        collection(db, "plans"),
        where("profileId", "==", profileId)
      );

      const querySnapshot = await getDocs(plansQuery);

      const plans = querySnapshot.docs.map((snapshot) => {
        const data = snapshot.data() as TeachingPlan;

        return cleanPlan({
          ...data,
          id: data.id || snapshot.id
        });
      });

      return plans.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt).getTime();

        return dateB - dateA;
      });
    } catch (error) {
      console.error("Erro ao buscar planos no Firebase:", error);
      throw error;
    }
  },

  async savePlan(plan: TeachingPlan): Promise<void> {
    try {
      const cleanedPlan = cleanPlan(plan);
      const now = new Date().toISOString();

      await setDoc(
        doc(db, "plans", cleanedPlan.id),
        {
          ...cleanedPlan,
          updatedAt: now
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Erro ao salvar plano no Firebase:", error);
      throw error;
    }
  },

  async deletePlan(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "plans", id));
    } catch (error) {
      console.error("Erro ao excluir plano do Firebase:", error);
      throw error;
    }
  }
};

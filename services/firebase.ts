import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { TeachingPlan } from "../types";

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

const safeIsoNow = () => new Date().toISOString();

const safeArray = <T>(v: any): T[] => (Array.isArray(v) ? v : []);

export const FirebaseService = {
  async getPlans(profileId: string): Promise<TeachingPlan[]> {
    try {
      const q = query(
        collection(db, "plans"),
        where("profileId", "==", profileId)
      );

      const querySnapshot = await getDocs(q);

      const results: TeachingPlan[] = querySnapshot.docs.map((snap) => {
        const data = snap.data() as Partial<TeachingPlan>;

        // ✅ garante id sempre (Firestore id)
        const plan: TeachingPlan = {
          ...(data as TeachingPlan),
          id: (data.id as any) || snap.id,
          profileId: (data.profileId as any) || profileId,
          createdAt: (data.createdAt as any) || safeIsoNow(),
          updatedAt: (data.updatedAt as any) || (data.createdAt as any) || safeIsoNow(),
          units: safeArray<any>(data.units) as any
        };

        return plan;
      });

      // ordenação local (mais recentes primeiro)
      return results.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
    } catch (error) {
      console.error("Erro ao buscar planos no Firebase:", error);
      return [];
    }
  },

  async savePlan(plan: TeachingPlan): Promise<void> {
    try {
      if (!plan?.id) throw new Error("Plano sem ID (plan.id vazio).");

      const planRef = doc(db, "plans", plan.id);

      const payload: TeachingPlan = {
        ...plan,
        createdAt: plan.createdAt || safeIsoNow(),
        updatedAt: safeIsoNow(),
        units: safeArray<any>((plan as any).units) as any
      };

      // ✅ merge:true evita apagar campos existentes no documento
      await setDoc(planRef, payload, { merge: true });
    } catch (error) {
      console.error("Erro ao salvar no Firebase:", error);
      throw error;
    }
  },

  async deletePlan(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "plans", id));
    } catch (error) {
      console.error("Erro ao deletar no Firebase:", error);
      throw error;
    }
  }
};

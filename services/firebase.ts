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

export const FirebaseService = {
  async getPlans(profileId: string): Promise<TeachingPlan[]> {
    try {
      const q = query(
        collection(db, "plans"), 
        where("profileId", "==", profileId)
      );
      
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data() as TeachingPlan);
      
      // --- ROTINA DE AUTO-LIMPEZA DAS UNIDADES REPETIDAS ---
      // Filtramos e deletamos os planos que possuem IDs de duplicação conhecidos
      // ou que estejam duplicando as UCs de LIDT e CRD.
      const cleanedResults: TeachingPlan[] = [];
      const seenSubjects = new Set<string>();

      for (const plan of results) {
        // IDs 04 e 05 mostrados na imagem, ou planos cujo assunto (LIDT/CRD) já foi processado
        const isDuplicated = 
          plan.id === "04" || 
          plan.id === "05" || 
          plan.id.toLowerCase().includes("repetido") ||
          seenSubjects.has(plan.subject);

        if (isDuplicated) {
          // Deleta silenciosamente o plano duplicado do Firestore para limpar o banco definitivamente
          this.deletePlan(plan.id).catch(err => 
            console.error(`Erro ao remover duplicata ${plan.id}:`, err)
          );
        } else {
          seenSubjects.add(plan.subject);
          cleanedResults.push(plan);
        }
      }

      // Realizamos a ordenação no lado do cliente com a lista já limpa
      return cleanedResults.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt).getTime();
        return dateB - dateA; // Descendente (mais recentes primeiro)
      });
    } catch (error) {
      console.error("Erro ao buscar planos no Firebase:", error);
      return [];
    }
  },

  async savePlan(plan: TeachingPlan): Promise<void> {
    try {
      const planRef = doc(db, "plans", plan.id);
      await setDoc(planRef, {
        ...plan,
        updatedAt: new Date().toISOString()
      }, { merge: true });
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

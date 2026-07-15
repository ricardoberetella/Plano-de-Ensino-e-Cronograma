
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
      // Simplificamos a query para usar apenas WHERE. 
      // Firestore exige um índice composto manual para WHERE + ORDER BY simultâneos.
      const q = query(
        collection(db, "plans"), 
        where("profileId", "==", profileId)
      );
      
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data() as TeachingPlan);
      
      // Realizamos a ordenação no lado do cliente (Client-side sorting)
      // para evitar a necessidade de configuração de índices no console do Firebase.
      return results.sort((a, b) => {
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

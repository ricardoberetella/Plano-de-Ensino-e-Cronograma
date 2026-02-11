import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwTas2ZVm87b38aa8wCDbyk1u2CaecVP0",
  authDomain: "plano-de-aula-cronograma.firebaseapp.com",
  projectId: "plano-de-aula-cronograma",
  storageBucket: "plano-de-aula-cronograma.firebasestorage.app",
  messagingSenderId: "682418554592",
  appId: "1:682418554592:web:758286437eb301b9647285"
};

// Tenta inicializar, se falhar, não quebra o app
let db: any;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.error("Falha ao conectar no Firebase. Usando modo offline.");
}

export { db };

export const FirebaseService = {
  async getPlans(profileId: string) {
    if (!db) return []; // Retorna vazio em vez de travar se o Firebase estiver off
    try {
      const q = query(collection(db, "plans"), where("profileId", "==", profileId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      return [];
    }
  },
  // ... mantenha os outros métodos com try/catch
};

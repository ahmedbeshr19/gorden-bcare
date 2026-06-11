import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "bcare-sa-24846",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkPass() {
  const snap = await getDocs(collection(db, "admins"));
  snap.forEach(doc => {
    console.log("Admin Data:", doc.data());
  });
}

checkPass();

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "bcare-sa-24846",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkPass() {
  const snap = await getDocs(collection(db, "admins"));
  if (snap.empty) {
    console.log("No admins found. Setup is needed.");
  } else {
    snap.forEach(doc => {
      console.log("Admin Password:", doc.data().password);
    });
  }
}

checkPass();

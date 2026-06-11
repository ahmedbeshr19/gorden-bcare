import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "bcare-sa-24846",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function setPass() {
  const newPass = "01070626890";
  const snap = await getDocs(collection(db, "admins"));
  
  if (snap.empty) {
    await addDoc(collection(db, "admins"), { username: "admin", password: newPass });
    console.log("Admin created with new password.");
  } else {
    // Update all existing admins to this password
    const promises = snap.docs.map(d => updateDoc(doc(db, "admins", d.id), { password: newPass }));
    await Promise.all(promises);
    console.log("Passwords updated for all admins.");
  }
}

setPass();

import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

export const getMenuData = async () => {
  try {
    const menuCollection = collection(db, "menu");
    const menuSnapshot = await getDocs(menuCollection);
    const menuList = menuSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return menuList;
  } catch (error) {
    console.error("Error fetching menu: ", error);
    return [];
  }
};
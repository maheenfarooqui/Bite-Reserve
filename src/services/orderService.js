import { db } from "../app/firebase";
import { collection, addDoc, serverTimestamp ,query, where, getDocs, orderBy} from "firebase/firestore";

export const placeOrder = async (orderData) => {
  try {
    // 'orders' naam ka collection khud hi ban jayega agar nahi hai
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "pending", // Shuru mein order pending hoga
      createdAt: serverTimestamp(), // Firebase ka time
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error placing order:", error);
    return { success: false, error };
  }
};
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, "orders"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc") // Latest order sab se upar
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
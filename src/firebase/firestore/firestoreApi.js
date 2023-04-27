import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const getTasks = async () => {
  try {
    const tasksRef = collection(db, 'tasks');
    const querySnapshot = await getDocs(tasksRef);
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(result);
    return { code: 200, msg: result };
  } catch (error) {
    console.error(error);
    return { code: 500, msg: [] };
  }
};

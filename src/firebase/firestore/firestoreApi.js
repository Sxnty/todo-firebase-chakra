import {
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';
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

const validateTask = (task) => {
  const { title, description} = task;
  if (!title || !description) {
    throw new Error(
      'Need to provide all parameters to add the task'
    );
  }
};

export const addTask = async ({ title, description, important }) => {
  try {
    important = important ?? false
    const task = { title, description, important, done:false };
    validateTask(task);
    let tasksRef = collection(db, 'tasks');
    await addDoc(tasksRef, task);
    return { code: 200, msg: 'Task added' };
  } catch (error) {
    console.error(error);
    return { code: 500, msg: `Error adding the task: ${error}` };
  }
};

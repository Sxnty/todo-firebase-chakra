import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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
    return { code: 200, msg: result };
  } catch (error) {
    console.error(error);
    return { code: 500, msg: [] };
  }
};

const validateTask = (task) => {
  const { title, description } = task;
  if (!title || !description) {
    throw new Error('Need to provide all parameters to add the task');
  }
};

export const addTask = async ({ title, description, important }) => {
  try {
    important = important ?? false;
    const task = { title, description, important, done: false };
    validateTask(task);
    let tasksRef = collection(db, 'tasks');
    let result = await addDoc(tasksRef, task);
    console.log(result.id, 'id');
    return { code: 200, msg: 'Task added', id: result.id };
  } catch (error) {
    console.error(error);
    return { code: 500, msg: `Error adding the task: ${error}` };
  }
};

export const updateStatus = async (id, done) => {
  try {
    console.log(id, done);
    if (!id || done === undefined) {
      throw new Error('Needs to provide id and done parameter');
    }
    if (typeof done !== 'boolean') {
      throw new Error('Done parameter needs to be a boolean');
    }
    let tasksRef = collection(db, 'tasks');
    let taskDocRef = doc(tasksRef, id);
    const taskDocSnapshot = await getDoc(taskDocRef);
    if (taskDocSnapshot.exists()) {
      await updateDoc(taskDocRef, {
        done,
      });
      console.log('task updated!');
      return { code: 200, msg: 'Task updated successfully!' };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.log(error);
    return { code: 500, msg: `updating status: ${error}` };
  }
};

export const deleteTask = async (id) => {
  try {
    if (!id) {
      throw new Error('Need to provide an id.');
    }
    let tasksRef = collection(db, 'tasks');
    let taskDocRef = doc(tasksRef, id);
    let taskDocSnapshot = await getDoc(taskDocRef);
    if (!taskDocSnapshot.exists()) {
      throw new Error('Document not found');
    }
    const deletedTask = await deleteDoc(taskDocRef);
    return {
      code: 200,
      msg: 'Task deleted successfully!',
    };
  } catch (error) {
    console.error(error);
    return { code: 500, msg: error };
  }
};
export const editTask = async (id, { title, description }) => {
  try {
    let tasksRef = collection(db, 'tasks');
    let taskDocRef = doc(tasksRef, id);
    let taskDocSnapshot = await getDoc(taskDocRef);
    if (!taskDocSnapshot.exists()) {
      throw new Error('Document not found');
    }
    await updateDoc(taskDocRef, {
      title,
      description,
    });
    console.log('task updated successfuly');
    return { code: 200, msg: 'task updated successfully' };
  } catch (error) {
    console.error(error);
    return { code: 500, msg: error };
  }
};

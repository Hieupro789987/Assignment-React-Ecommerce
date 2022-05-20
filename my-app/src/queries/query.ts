import {
  addDoc,
  CollectionReference,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

abstract class QueryData {
  async fetchData(feildPath: CollectionReference<any>, ...queryConstraints: QueryConstraint[]) {
    const list = [];
    const ref = feildPath;
    const queryData = query(ref, ...queryConstraints);
    const data = await getDocs(queryData);

    for (const doc of data.docs) {
      const temp = doc.data();
      list.push(temp);
    }
    
    return list;
  }

  async getDataDocById(docRef: DocumentReference<any>, ...options: any[]) {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return;
    }
    return docSnap.data();
  }

  async addDataDoc(data: any, docRef: DocumentReference<any>) {
    const docData: any = data;
    return await setDoc(docRef, docData);
  }
  async addDataCollection(data: any, docRef: CollectionReference<any>) {
    const docData: any = data;
    return await addDoc(docRef, docData);
  }

  async updateData(data: any, docRef: DocumentReference<any>) {
    const docData: any = data;
    await updateDoc(docRef, docData);
  }
}

export default QueryData;

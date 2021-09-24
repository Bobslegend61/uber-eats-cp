import { db, firebase } from "../firebase.config";

class Database {
  protected db = db;

  protected getDoc: (collection: string, doc: string) => Promise<any> = async (
    collection,
    doc,
  ) => {
    if (!collection || !doc) throw { message: "Arguments are required" };
    const res = await this.db.collection(collection).doc(doc).get();
    if (!res) return null;
    return {
      id: res.id,
      ...res.data(),
    };
  };

  protected watchDoc: (
    collection: string,
    doc: string,
    cb: any,
  ) => Promise<void> = async (collection, doc, cb) => {
    if (!collection || !doc) throw { message: "Arguments are required" };
    this.db
      .collection(collection)
      .doc(doc)
      .onSnapshot((doc) => {
        if (doc.exists) {
          cb({
            id: doc.id,
            ...doc.data(),
          });
        } else {
          cb(null);
        }
      });
  };

  protected createDoc: (
    collection: string,
    data: any,
    doc?: string,
  ) => Promise<void> = async (collection, data, doc) => {
    if (!collection || !data) throw { message: "Arguments are required" };
    if (doc) {
      await this.db.collection(collection).doc(doc).set(data);
    } else {
      await this.db.collection(collection).add(data);
    }
  };

  protected upDateDoc: (
    collection: string,
    doc: string,
    data: any,
  ) => Promise<void> = async (collection, doc, data) => {
    if (!collection || !doc || !data)
      throw { message: "Arguments are required" };

    await this.db.collection(collection).doc(doc).update(data);
  };
}

export default Database;

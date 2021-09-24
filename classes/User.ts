import { UserData } from "../slices/authSlice";
import Database from "./Database";

interface IUser {
  getProfile: () => Promise<UserData | null>;
}

class User extends Database implements IUser {
  private collection: string = "users";
  constructor(private id: string) {
    super();
  }

  public getProfile: () => Promise<UserData | null> = async () => {
    const profile = await this.getDoc(this.collection, this.id);
    return profile;
  };

  public watchProfile: (cb: any) => Promise<void> = async (cb) => {
    if (!cb) throw { message: "Callback function not provided." };
    this.watchDoc(this.collection, this.id, cb);
  };

  public createProfile: (data: any) => Promise<void> = async (data) => {
    await this.createDoc(this.collection, data, this.id);
  };

  public updateProfile: (data: any) => Promise<void> = async (data) => {
    await this.upDateDoc(this.collection, this.id, data);
  };

  public placeOrder: (data: any) => Promise<void> = async (data) => {
    await this.createDoc("orders", data);
  };

  public fetchOrders: (cb: any) => Promise<any> = async (cb) => {
    this.db
      .collection("orders")
      .where("userId", "==", this.id)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshots) => {
        const orders: any = [];
        querySnapshots.forEach((doc) => {
          orders.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        cb(orders);
      });
  };
}

export default User;

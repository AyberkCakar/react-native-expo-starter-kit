import Storage from "@react-native-async-storage/async-storage";

export class StorageService {

  static async getStorageString(key: string): Promise<string>  {
    return await Storage.getItem(key) as string;
  }

  static async getStorageObject(key: string): Promise<object>  {
    const object = await Storage.getItem(key);
    return JSON.parse(object as string);
  }

  static async setStorageObject(key: string, object: any)  {
    Storage.setItem(key, JSON.stringify(object));
  }

  static async setStorageString(key: string, object: string)  {
    Storage.setItem(key, object);
  }
};


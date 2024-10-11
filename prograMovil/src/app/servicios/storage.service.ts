import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private db: Storage = new Storage();
  private dbEstado: Promise<void>;

  constructor(private storage: Storage) { 
    this.dbEstado = this.onInit();
  }
  async onInit(): Promise<void> {
    const storage = await this.storage.create();
    this.db = storage;
  }

  async dbConectada(): Promise<void>{
    await this.dbEstado;
  }
  async get(key: string): Promise<any>{
    await this.dbConectada()
    return this.db.get(key);
  }
  async set(key: string, valor: any): Promise<any>{
    await this.dbConectada()
    return this.db.set(key, valor);
  }
  async remove(key: string){
    await this.dbConectada()
    this.db.remove(key);
  }
}

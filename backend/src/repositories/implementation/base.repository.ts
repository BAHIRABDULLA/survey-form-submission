import { IBaseRepository } from "../interface/IBase.repository";
import { Document, Model } from "mongoose";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }
 
  async find(): Promise<T[]> {
    return this.model.find();
  }
  async findOne(filter: any): Promise<T | null> {
    return this.model.findOne(filter);
  }
}

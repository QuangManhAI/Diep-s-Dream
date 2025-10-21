import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MenuItem } from "./menu.schema";

@Injectable()
export class MenuService{
    constructor(@InjectModel(MenuItem.name) private model: Model<MenuItem>){}

    async findAll(): Promise<MenuItem[]>{
        return this.model.find().exec();
    }

    async create(item: any): Promise<MenuItem>{
        const newItem = new this.model(item);
        return newItem.save();
    }

    async findByName(name: string): Promise<MenuItem | null>{
        return this.model.findOne({name: name}).exec();
    }

    async delete(id: string):Promise<MenuItem| null>{
        return this.model.findByIdAndDelete(id);
    }

    async update(id: string, data: Partial<MenuItem>): Promise<MenuItem| null>{
        return this.model.findByIdAndUpdate(id, data, {new: true});
    }
}
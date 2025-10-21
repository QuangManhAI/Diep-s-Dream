import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Cart } from "./cart.schema";

@Injectable()
export class CartService{
    constructor(@InjectModel(Cart.name) private model: Model<Cart>){}
    async getCart(userId: string): Promise<Cart | null>{
        let cart: any = await this.model.findOne({userId: new Types.ObjectId(userId)}).exec();
        if (!cart) {
            cart = new this.model({userId, items: [], total: 0});
            await cart.save();
        }
        return cart;
    }

    async addItem(userId: string, item: {name: string; quantity: number, price: number}){
        let cart: any = await this.getCart(userId);
          if (!cart) {
            cart = await this.model.create({ userId, items: [] });
        }

        const existing = cart.items.find(i => i.name === item.name);
        if (existing) {
            existing.quantity += item.quantity;
        } else {
            cart?.items.push(item);
        }

        cart.total =  cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        await cart.save();
        return cart;
    }

    async removeItem(userId: string, name: string){
        const cart: any = await this.getCart(userId);
        cart.items = cart.items.filter((i) => i.name !==name);

        cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        await cart.save();
        return cart;
    }

    async updateItem(userId: string, name: string, quantity: number){
        const cart: any = await this.getCart(userId);
        const item = cart.items.find(i => i.name === name);
        if (!item) throw new NotFoundException("Không tìm thấy món trong giỏ hàng");

        item.quantity = quantity;
        cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        await cart.save();
        return cart;
    }

    async clearCart(userId: string) {
        const cart: any =  await this.model.findOne({ userId: new Types.ObjectId(userId) }).exec();
        cart.items = [];
        cart.total = 0;
        await cart.save();
        return cart;
    }
    async ensureCart(userId: string) {
        let cart = await this.model.findOne({ userId });
        if (!cart) {
            cart = await this.model.create({ userId, items: [] });
        }
        return cart;
    }

}
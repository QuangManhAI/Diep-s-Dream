import { Order } from "./orders.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../users/users.schema";

@Injectable()
export class OdersService{
    constructor(@InjectModel(Order.name) private model: Model<Order>,
                @InjectModel(User.name) private userModel: Model<User>){}
    async createOrderWithUser(userId: string, orderData: any): Promise<Order> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException("Không tìm thấy người dùng");

    const order = new this.model({
      customerName: user.fullName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      items: orderData.items,
      total: orderData.total,
      status: "pending",
    });

    return order.save();
  }

    async createOrder(order: any): Promise<Order>{
        const newOrder = new this.model(order);
        return newOrder.save();
    }

    async findOrderByPhone(Phone: string){
        return this.model.findOne({phoneNumber: Phone}).exec();
    }

    async updateStatusOrder(id: string, status: string): Promise<Order | null>{
        return this.model.findByIdAndUpdate(id, {status}, {new: true});
    }

    async findTenOrdersRecent(): Promise<Order[]>{
        return this.model.find().sort({createdAt: -1}).limit(10).exec();
    }
}
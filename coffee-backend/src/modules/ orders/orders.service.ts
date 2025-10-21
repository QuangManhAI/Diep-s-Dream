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
    const total = Array.isArray(orderData.items)
        ? orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    const order = new this.model({
        userId,
        customerName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        items: orderData.items,
        total,
        status: "pending",
    });

    return order.save();
  }

    async findOrderByPhone(Phone: string){
        return this.model.findOne({phoneNumber: Phone}).exec();
    }

    async updateStatusOrder(id: string, status: string): Promise<Order | null>{
        return this.model.findByIdAndUpdate(id, {status}, {new: true});
    }

    async searchOrders(query: string): Promise<Order[]> {
        const regex = new RegExp(query, "i");
        return this.model.find({
            $or: [
            { customerName: regex },
            { phoneNumber: regex },
            { address: regex },
            ],
        }).sort({ createdAt: -1 }).exec();
    }

    async findOrdersByUser(userId: string): Promise<Order[]> {
        return this.model
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
    }

    async findAllOrders() {
        return this.model.find().sort({ createdAt: -1 }).exec();
    }
}
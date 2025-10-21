import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})
export class Order extends Document{

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({required: true})
    customerName: string;

    @Prop({required: true})
    phoneNumber: string;

    @Prop({required: true})
    address: string;

    @Prop()
    note?: string;

    @Prop({default: "pending", enum: ["pending", "preparing", "done", "cancelled"]})
    status: "pending" | "preparing" | "done" | "cancelled";

    @Prop({default: [],
        type: [{name: String, quantity: Number, price: Number}]
    })
    items: {name: string; quantity: number; price: number}[];

    @Prop({ type: Number, required: true })
    total: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
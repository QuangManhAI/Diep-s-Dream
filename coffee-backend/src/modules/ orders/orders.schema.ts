import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Order extends Document{
    @Prop({required: true})
    customerName: string;

    @Prop({required: true})
    phoneNumber: string;

    @Prop({required: true})
    address: string;

    @Prop()
    note?: string;

    @Prop({default: "pending", enum: ["pending", "done", "cancelled"]})
    status: "pending" | "done" | "cancelled";

    @Prop({default: [],
        type: [{name: String, quantity: Number, price: Number}]
    })
    items: {name: string; quantity: number; price: number}[];

}

export const OrderSchema = SchemaFactory.createForClass(Order);
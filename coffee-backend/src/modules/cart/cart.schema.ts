import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})
export class Cart extends Document{
    @Prop({required: true, ref: "User", type: Types.ObjectId})
    userId: string;

    @Prop({
        type: [{name: String, quantity: Number, price: Number}],
        default: [],
    })
    items: {name: string; quantity: number; price: number}[];

    @Prop({default: 0})
    total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class MenuItem extends Document{
    
    // Ten mon
    @Prop({required: true})
    name: string;

    // Phan Loai
    @Prop()
    category?: string;

    //Gia tien
    @Prop({required: true})
    price: number;

    // Duong dan toi anh mon
    @Prop()
    imagePath: string;

    // Trang thai mon
    @Prop({default: true})
    avaiable: boolean;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
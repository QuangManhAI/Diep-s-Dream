import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./orders.schema";
import { OdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { User, UserSchema } from "../users/users.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema}, { name: User.name, schema: UserSchema }])],
    providers: [OdersService],
    controllers: [OrdersController],
    exports: [OdersService]
})
export class OrderModule {}
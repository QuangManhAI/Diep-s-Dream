import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.schema";
import { AuthModule } from "../auth/auth.module";
import { CartModule } from "../cart/cart.module";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), AuthModule, CartModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
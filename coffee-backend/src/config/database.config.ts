import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

export const DatabaseConfig = [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI||""),
];
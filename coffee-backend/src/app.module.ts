import { Module } from "@nestjs/common";
import { DatabaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/users/users.module";
import { MenuModule } from "./modules/menu/menu.module";
import { OrderModule } from "./modules/ orders/orders.module";
import { CartModule } from "./modules/cart/cart.module";

@Module({
  imports: [
    ...DatabaseConfig,
    AuthModule,
    UserModule,
    MenuModule,
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}

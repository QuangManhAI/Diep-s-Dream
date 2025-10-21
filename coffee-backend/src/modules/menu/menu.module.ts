import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MenuItem, MenuItemSchema } from "./menu.schema";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: MenuItem.name, schema: MenuItemSchema }])],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}

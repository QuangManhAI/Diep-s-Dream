import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("menu")
export class MenuController {
    constructor(private readonly service: MenuService){}

    @Get()
    async getAll() {
        return this.service.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Post()
    async createItem(@Body() body: any){
        return this.service.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Patch(":id")
    async updateItem(@Param("id") id: string, @Body() body: any){
        return this.service.update(id, body);
    }
    
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Delete(":id")
    async deleteItem(@Param("id") id: string){
        return this.service.delete(id);
    }
}
import { Controller, Post, Get, Patch, Param, Query, Body, Req, UseGuards } from "@nestjs/common";
import { OdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@UseGuards(JwtAuthGuard)
@Controller("Order")
export class OrdersController {
  constructor(private readonly service: OdersService) {}

  @Post()
  async createOrder(@Req() req, @Body() order: any) {
    const userId = req.user.userId;
    return this.service.createOrderWithUser(userId, order);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get()
  async getAllOrders() {
    console.log("📦 [Admin] getAllOrders called");
    return this.service.findAllOrders(); 
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("search")
  async searchOrders(@Query("query") query: string) {
    return this.service.searchOrders(query);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Patch(":id/status")
  async updateStatus(@Param("id") id: string, @Body("status") status: string) {
    return this.service.updateStatusOrder(id, status);
  }

  @Get("my")
  async getUserOrders(@Req() req) {
    const userId = req.user.userId;
    return this.service.findOrdersByUser(userId);
  }
}

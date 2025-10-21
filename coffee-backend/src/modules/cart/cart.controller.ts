import { Controller, Get, Post, Patch, Delete, Body, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post("add")
  async addItem(@Req() req, @Body() body: { name: string; quantity: number; price: number }) {
    return this.cartService.addItem(req.user.userId, body);
  }

  @Patch("update")
  async updateItem(@Req() req, @Body() body: { name: string; quantity: number }) {
    return this.cartService.updateItem(req.user.userId, body.name, body.quantity);
  }

  @Delete("remove")
  async removeItem(@Req() req, @Body() body: {name: string}){
    return this.cartService.removeItem(req.user.userId, body.name);
  }

  @Delete("clear")
  async clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}

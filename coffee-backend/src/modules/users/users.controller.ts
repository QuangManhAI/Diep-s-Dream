import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { RegisterUserDto, LoginUserDto } from "./users.dto";
import { UserService } from "./users.service";
import { AuthService } from "../auth/auth.service";
import { CartService } from "../cart/cart.service";


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const user  = await this.userService.register(dto.email, dto.password, dto.fullName, dto.phoneNumber, dto.address);
    await this.cartService.ensureCart(user._id);
    return { id: user._id, email: user.email, fullName: user.fullName, phoneNumber: user.phoneNumber, address: user.address };
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    try {
      const user = await this.userService.login(dto.email, dto.password);
      return { userId: user.id, accessToken: user.accessToken, role: user.role, email: user.email, fullName: user.fullName};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
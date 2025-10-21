import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginUserDto {
  @IsEmail({}, { message: "Email không hợp lệ." })
  email: string;

  @IsNotEmpty({ message: "Mật khẩu không được để trống." })
  password: string;
}

export class RegisterUserDto {
  @IsEmail({}, { message: "Email không hợp lệ." })
  email: string;

  @IsNotEmpty({ message: "Mật khẩu không được để trống." })
  @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." })
  password: string;

  @IsNotEmpty({ message: "Họ và tên không được để trống." })
  @IsString({ message: "Họ và tên phải là chuỗi ký tự." })
  fullName: string;

  @IsNotEmpty({ message: "Số điện thoại không được để trống." })
  @Matches(/^(0|\+84)[0-9]{9,10}$/, {
    message: "Số điện thoại không hợp lệ. VD: 0901234567 hoặc +84901234567.",
  })
  phoneNumber: string;

  @IsNotEmpty({ message: "Địa chỉ không được để trống." })
  @IsString({ message: "Địa chỉ phải là chuỗi ký tự." })
  address: string;
}

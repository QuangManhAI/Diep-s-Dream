import { BadRequestException, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./users.schema";
import { AuthService } from "../auth/auth.service";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private authService: AuthService) {}
    async register(email: string, password: string, fullName: string, phoneNumber: string, address: string): Promise<UserDocument> {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new this.userModel({email, passwordHash, fullName, phoneNumber, address});
        try {
            return await user.save();
        } catch (e: any){
            if (e.code === 11000) {
                throw new BadRequestException("Email đã được đăng ký trước đó");
            }
            throw e;  
        }
    }

    async login(email: string, password: string){
        const user = await this.userModel.findOne({email}).exec();
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new UnauthorizedException("Email hoặc mật khẩu không chính xác");
        }

        const token = this.authService.generateToken({id: user._id.toString(), email: user.email, phone: user.phoneNumber, role: user.role});
        return {id: user._id.toString(), email: user.email, fullName: user.fullName, phoneNumber: user.phoneNumber, address: user.address, accessToken: token, role: user.role}
    }

    async deleteUser(id: string){
        return this.userModel.findByIdAndDelete(id);
    }

    async updateInfo(id: string, data: Partial<User>){
        if (data["password"]) {
        const passwordHash = await bcrypt.hash(data["password"], 10);
        data["passwordHash"] = passwordHash;
        delete data["password"];
        }

        const updated = await this.userModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new NotFoundException("Không tìm thấy người dùng để cập nhật");
        return updated;
    }

    async findByEmail(email: string) {
        const user = await this.userModel.findOne({ email }).select("-passwordHash");
        if (!user) throw new NotFoundException("Không tìm thấy người dùng với email này");
        return user;
    }

    async findByPhone(phoneNumber: string) {
        const user = await this.userModel.findOne({ phoneNumber }).select("-passwordHash");
        if (!user) throw new NotFoundException("Không tìm thấy người dùng với số điện thoại này");
        return user;
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private service: JwtService){}

    generateToken(user: {id: string; email: string, phone: string, role: string}) {
        const payload = {sub: user.id, email: user.email, phone: user.phone, role: user.role};
        return this.service.sign(payload);
    }
}
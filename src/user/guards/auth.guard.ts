import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JWTPayloadType } from "../utils/types";
import { CURRENT_USER_KEY } from "src/constants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ) { }



   async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        if (token && type === "Bearer") {
            try {
                const payload: JWTPayloadType = await this.jwtService.verifyAsync(token, {
                    secret: this.config.get<string>("JWT_SECRET")
                });

                request[CURRENT_USER_KEY] = payload;
            } catch (error) {
                throw new UnauthorizedException("access denied, invalid token");
           }
        } else {
            throw new UnauthorizedException("access denied, no token provided");
        }
        return true;
    }

}
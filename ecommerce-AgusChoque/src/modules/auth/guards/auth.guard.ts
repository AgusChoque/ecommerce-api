import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "src/config/envs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private reflector: Reflector,
        private jwtService: JwtService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());
        if ( isPublic ) return true;

        const req = context.switchToHttp().getRequest();
        const header: string | undefined = req.headers["authorization"];
        if ( !header ) throw new UnauthorizedException('Header "authorization" not found.');

        const [ bearer, token ] = header.split(" ");
        if (!bearer || !token ) throw new UnauthorizedException("Invalid token.");

        try {
            const payload = await this.jwtService.verify(token, {secret: JWT_SECRET});
            req.user = payload;
            return true;
        } catch (e) {
            throw new UnauthorizedException("Invalid token.");
        };
    }
}
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/role.enum";

@Injectable()
export class OwnUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();

        const user = req.user;
        const paramId = req.params?.id;
        const bodyId = req.body?.userId;

        const targetId = bodyId ? bodyId : paramId;
        if( !user ) throw new UnauthorizedException("User not authenticated.");
        if( user.role === Role.Admin ) return true;

        if( user.sub === targetId) return true;

        if( bodyId ) throw new ForbiddenException("You are not allowed to create an order for another user.")
        throw new ForbiddenException("You can only access your own user data.")
    }
}
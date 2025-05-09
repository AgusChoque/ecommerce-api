import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
            context.getHandler(),
            context.getClass()
        ]);
        if( !requiredRoles ) return true
        const { user } = context.switchToHttp().getRequest();

        const hasRole = () => requiredRoles.some(role => user?.role?.includes(role));
        const isValid = user && user.role && hasRole();
        
        if( !isValid ) throw new ForbiddenException("You don't have permission and aren't allowed to access this route.");
        return isValid;
    }
    
}
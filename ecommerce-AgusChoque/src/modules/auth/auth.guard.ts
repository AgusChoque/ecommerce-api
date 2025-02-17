import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

const validateRequest = (req: Request):boolean => {
    const authorization:string | string[] | undefined = req.headers["authorization"];
    console.log(authorization)
    if(typeof authorization !== "string") return false;

    const [basic, email, password] = authorization.split(":");
    if(!email) return false;
    if(!password) return false;
    return true 
};

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        return validateRequest(req);
    }
}
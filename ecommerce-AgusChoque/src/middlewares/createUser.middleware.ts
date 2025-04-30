import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "src/modules/users/entities/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
        constructor (
            @InjectRepository(User)
            private readonly usersDbRepository: Repository<User>
        ) {};

    async use(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        const user = await this.usersDbRepository.findOneBy({ email });
        if ( user ) throw new ConflictException("A user with this email already exists.");

        next();
    };
};
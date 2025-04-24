import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "matchPassword", async: false})
export class MatchPassword implements ValidatorConstraintInterface {
    validate(passwordConfirm: string, args: ValidationArguments): boolean {
        if (passwordConfirm !== args.object[args.constraints[0]]) return false;
        return true;
    }
    defaultMessage(): string {
        return "Password don't match.";
    }
    
}
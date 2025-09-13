import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JWTPayloadType } from "../utils/types";
import { CURRENT_USER_KEY } from "src/constants";

export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const payload: JWTPayloadType = request[CURRENT_USER_KEY];
        return payload;
    }
)
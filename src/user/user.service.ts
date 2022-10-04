import { Injectable } from "@nestjs/common";
import { updateUser } from "../../models";
import { UpdateUserDto } from "./dto";


@Injectable()
export class UserServices {
    async updateUser(id: number, body: UpdateUserDto) {
        const user = await updateUser(id, body);
        return user
    }
}
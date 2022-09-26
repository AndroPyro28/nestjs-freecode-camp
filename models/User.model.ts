import {PrismaClient, User} from "@prisma/client"
import { SignupDto } from "src/auth/dto";

const prisma = new PrismaClient();
const { user } = prisma;

export async function createUser({email, firstname, lastname, password}: SignupDto): Promise<SignupDto | any> {
    try {
        const newUser = await user.create({
            data: {
              email,
              firstname,
              lastname,
              password,
            },
          });
          return newUser
    } catch (error) {
        return error;
    }
}

export async function findUserByEmail(email:string):Promise<User| null> {
    try {
        const currentUser = await user.findUnique({
            where: {email}
        });
        return currentUser;
    } catch (error) {
        console.log(error);
    }
}

export async function findUserById(id: number):Promise<User| null> {
    try {
        const currentUser = await user.findUnique({
            where: {id}
        });
        return currentUser;
    } catch (error) {
        console.log(error);
    }
}

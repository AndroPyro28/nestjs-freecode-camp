import {PrismaClient, User} from "@prisma/client"
import { SignupDto } from "src/auth/dto";
import { UpdateUserDto } from "src/user/dto";

const prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'query',
          },
          {
            emit: 'stdout',
            level: 'error',
          },
          {
            emit: 'stdout',
            level: 'info',
          },
          {
            emit: 'stdout',
            level: 'warn',
          },
    ]
});

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
        console.error(error);
    }
}

export async function updateUser(id: number, body: UpdateUserDto) {
    try {
        const updatedUser = await user.update({
            where: {
                id
            }, 
            data: body
        })
        delete updatedUser.password;
        return updatedUser;
    } catch (error) {
        console.error(error)
    }
}

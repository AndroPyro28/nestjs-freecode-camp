import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const {user, bookmark} = prisma;

export default prisma;
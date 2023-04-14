import { PrismaClient, Prisma } from '@prisma/client'

declare global {
  var prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
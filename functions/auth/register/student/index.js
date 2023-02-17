// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";


// POST
export async function createStudent(student) {

  console.log(student)

    try {
      const studentFromDB = await prisma.student.create({ data: student });
      return { student: studentFromDB };
    } catch (error) {
      return { error };
    }
  }

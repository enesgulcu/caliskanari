// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";
// GET
export async function getStudents() {
  try {
    const students = await prisma.student.findMany();
    return { students };
  } catch (error) {
    return { error };
  }
}

// POST
export async function createStudent(student) {
  try {
    const studentFromDB = await prisma.student.create({ data: student });
    return { student: studentFromDB };
  } catch (error) {
    return { error };
  }
}

// GET by ID
export async function getStudentById(id) {
  try {
    const student = await prisma.student.findUnique({ where: { id } });
    return { student };
  } catch (error) {
    return { error };
  }
}

// GET by EMAIL
export async function getStudentByEmail(email) {
  try {
    const student = await prisma.student.findUnique({ where: { email } });
    return { student };
  } catch (error) {
    return { error };
  }
}

// UPDATE BY ID
export async function updateStudentId(id, newData) {
  try {
    const studentFromDB = await prisma.student.update({
      where: { id },
      data: newData,
    });
    return { student: studentFromDB };
  } catch (error) {
    return { error };
  }
}

// UPDATE BY EMAIL
export async function updateStudentEmail(email, newData) {
  try {
    const studentFromDB = await prisma.student.update({
      where: { email },
      data: newData,
    });
    return { student: studentFromDB };
  } catch (error) {
    return { error };
  }
}

// DELETE
export async function deleteStudent(id) {
  try {
    const student = await prisma.Student.delete({ where: { id } });
    return { student };
  } catch (error) {
    return { error };
  }
}

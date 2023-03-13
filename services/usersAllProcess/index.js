import prisma from "@/lib/prisma/index";

// GET
export async function getUsers(userRole) {
  try {
    const users = await prisma[userRole].findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

// POST
export async function createUser(userRole, data) {
  try {
    const userFromDB = await prisma[userRole].create({ data: data });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

// GET by ID
export async function getUserById(userRole, id) {
  try {
    const user = await prisma[userRole].findUnique({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
}

// GET by EMAIL
export async function getUserByEmail(userRole, email) {
  try {
    const user = await prisma[userRole].findUnique({ where: { email } });
    return { user };
  } catch (error) {
    return { error };
  }
}

// UPDATE BY ID
export async function updateUserId(userRole, id, newData) {
  try {
    const userFromDB = await prisma[userRole].update({
      where: { id },
      data: newData,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

// UPDATE BY EMAIL
export async function updateUserByEmail(userRole, email, data) {
  try {
    const userFromDB = await prisma[userRole].update({
      where: { email },
      data: data,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

// DELETE BY ID
export async function deleteUser(userRole, id) {
  try {
    const user = await prisma[userRole].delete({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
}

// DELETE BY EMAIL
export async function deleteUserByEmail(userRole, email) {
  try {
    const user = await prisma[userRole].delete({ where: { email } });
    return { user };
  } catch (error) {
    return { error };
  }
}

export default {
  getUsers,

  createUser,

  getUserById,
  getUserByEmail,

  updateUserId,
  updateUserByEmail,
  
  deleteUser,
  deleteUserByEmail,
};
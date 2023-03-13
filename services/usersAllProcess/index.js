import prisma from "@/lib/prisma/index";

// GET
export async function getUsers(userType) {
  try {
    const users = await prisma[userType].findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

// POST
export async function createUser(userType, data) {
  try {
    const userFromDB = await prisma[userType].create({ data: data });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

// GET by ID
export async function getUserById(userType, id) {
  try {
    const user = await prisma[userType].findUnique({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
}

// GET by EMAIL
export async function getUserByEmail(userType, email) {
  try {
    const user = await prisma[userType].findUnique({ where: { email } });
    return { user };
  } catch (error) {
    return { error };
  }
}

// UPDATE BY ID
export async function updateUserId(userType, id, newData) {
  try {
    const userFromDB = await prisma[userType].update({
      where: { id },
      data: newData,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

// UPDATE BY EMAIL
export async function updateUserEmail(userType, email, newData) {
  try {
    const userFromDB = await prisma[userType].update({
      where: { email },
      data: newData,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

// DELETE BY ID
export async function deleteUser(userType, id) {
  try {
    const user = await prisma[userType].delete({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
}

// DELETE BY EMAIL
export async function deleteUserByEmail(userType, email) {
  try {
    const user = await prisma[userType].delete({ where: { email } });
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
  updateUserEmail,
  
  deleteUser,
  deleteUserByEmail,
};
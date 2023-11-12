import prisma from "../../config/prisma";

export const isExistingUser = async (userEmail: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({where: {email: userEmail}});
  return !!user
};


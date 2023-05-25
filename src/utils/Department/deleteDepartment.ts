import prisma from "src/utils/prisma";

const deleteDepartment = async (id: string) => {
  try {
    const deletedDepartment = await prisma.department.delete({
      where: {
        id: id,
      },
    });

    return deletedDepartment;
  } catch (err) {
    return null;
  }
};

export default deleteDepartment;

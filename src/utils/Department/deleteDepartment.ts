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
    throw new Error("Something Went Wrong...");
  }
};

export default deleteDepartment;

import prisma from "src/utils/prisma";

const deleteCourse = async (id: string) => {
  try {
    const deletedCourse = await prisma.course.delete({
      where: {
        id: id,
      },
    });
    return deletedCourse;
  } catch (err) {
    throw new Error("Something Went Wrong...");
  }
};

export default deleteCourse;

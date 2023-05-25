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
    return null;
  }
};

export default deleteCourse;

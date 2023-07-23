import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const searchItemsByName: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const name = req.query.name as string;
    if (!name) {
      return res.json(Error.invalidDetails);
    }
    const items = await Utils.prisma.items.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        file: true,
        likedBy: {
          select: {
            id: true,
            userId: true,
            scholarId: true,
          },
        },
        dislikedBy: {
          select: {
            id: true,
            userId: true,
            scholarId: true,
          },
        },
        bookmarkedBy: {
          select: {
            id: true,
            userId: true,
            scholarId: true,
          },
        },
        profile: {
          select: {
            id: true,
            userId: true,
            scholarId: true,
          },
        },
        topic: {
          select: {
            name: true,
            course: {
              select: {
                name: true,
                department: {
                  select: {
                    name: true,
                    institution: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.json(
      Utils.Response.success({
        items,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default searchItemsByName;

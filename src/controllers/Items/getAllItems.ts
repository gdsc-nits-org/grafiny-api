import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const getAllItems: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    if (!req.query.id) {
      const items = await Utils.prisma.items.findMany({
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
    } else {
      const topicId = req.query.id as string;
      const items = await Utils.prisma.items.findMany({
        where: {
          topicId,
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
    }
  } catch (err) {
    return next(err);
  }
};

export default getAllItems;

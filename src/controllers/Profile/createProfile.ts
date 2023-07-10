import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import * as Error from "../../globals/errors/index";

const createProfile: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { scholarId, year, profilePic, instituteId } =
      req.body as Interfaces.Profile;
    if (!scholarId || !year || !instituteId) {
      return res.json(Error.invalidDetails);
    }
    const existingProfile = await Utils.prisma.profile.findFirst({
      where: {
        OR: [
          { userId: req.user?.id },
          { AND: [{ instituteId }, { scholarId }] },
        ],
      },
    });

    if (existingProfile) {
      return res.json(
        Utils.Response.error(
          "Profile With This Scholar Id Already Exists In Your Institute",
          409
        )
      );
    }

    const profile: Interfaces.Profile = await Utils.prisma.profile.create({
      data: {
        scholarId,
        year,
        profilePic: profilePic ? profilePic : "",
        user: {
          connect: {
            id: req.user?.id,
          },
        },
        institution: {
          connect: {
            id: instituteId,
          },
        },
      },
    });

    return res.json(
      Utils.Response.success({
        profile,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createProfile;

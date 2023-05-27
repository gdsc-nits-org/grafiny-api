import { User, YEAR, Profile } from "@prisma/client";
import prisma from "../prisma";

const createProfile = async (
  scholarId: number,
  year: YEAR,
  user: User,
  instituteId: string,
  profilePic: string
) => {
  const profile: Profile = await prisma.profile.create({
    data: {
      scholarId: scholarId,
      year: year,
      profilePic: profilePic,
      user: {
        connect: {
          id: user.id,
        },
      },
      institution: {
        connect: {
          id: instituteId,
        },
      },
    },
  });

  return profile;
};

export default createProfile;

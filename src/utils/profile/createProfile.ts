import { User, YEAR, Profile, Institution } from "@prisma/client";
import prisma from "../prisma";

const createProfile = async (
  scholarId: number,
  year: YEAR,
  user: User,
  institute: Institution,
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
          id: institute.id,
        },
      },
    },
  });

  return profile;
};

export default createProfile;

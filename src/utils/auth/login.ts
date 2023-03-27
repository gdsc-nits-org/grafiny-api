import prisma from "../prisma";
import checkPassword from "./checkPassword";

const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return;
  }

  const [hashedPassword, salt] = user.password.split("$");
  const isValidUser = checkPassword(hashedPassword, password, salt);

  if (!isValidUser) {
    return;
  } else {
    return user;
  }
};

export default login;

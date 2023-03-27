import hashedPassword from "./passwordhash";

const checkPassword = async (
  hash: string,
  givenPassword: string,
  salt: string
) => {
  const hashedGivenPassword = hashedPassword(givenPassword, salt);
  return hash + "$" + salt === hashedGivenPassword;
};

export default checkPassword;

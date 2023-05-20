import * as crypto from "node:crypto";

const hashedPassword = (password: string, salt: string | null = null) => {
  salt = salt ?? crypto.randomBytes(16).toString("hex");
  const hash =
    crypto.scryptSync(password, salt, 64).toString("hex") + "$" + salt;
  return hash;
};

export default hashedPassword;

import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const logout: Interfaces.Middlewares.Sync = (req, res) => {
  req.logOut(() => false);
  return res.json(Utils.Response.success("Logged Out Successfully"));
};

export default logout;

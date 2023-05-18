import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const logout: Interfaces.Middlewares.Sync = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.json(Utils.Response.error("Something Went Wrong!!!"));
    } else {
      return res.json(Utils.Response.success("Logged Out Successfully"));
    }
  });
};

export default logout;

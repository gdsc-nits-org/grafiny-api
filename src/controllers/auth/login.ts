import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const login: Interfaces.Controllers.Sync = (req, res) => {
  return res.json(Utils.Response.success(req.session.passport.user));
};

export default login;

import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const adminSignUp: Interfaces.Controllers.Async = async (req, res, next) => {
  const data: Interfaces.User = req.body;
  try {
    const user = await Utils.Auth.db.createAdminUser(data);

    return res.json(
      Utils.Response.success({
        id: user.id,
        email: user.email,
        password: null,
        isAdmin: user.authorisationLevel,
      })
    );
  } catch (err) {
    return next(err);
  }
};

const superAdminSignUp: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  const data: Interfaces.User = req.body;
  try {
    const user = await Utils.Auth.db.createSuperAdminUser(data);

    return res.json(
      Utils.Response.success({
        id: user.id,
        email: user.email,
        password: null,
        isAdmin: user.authorisationLevel,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export { adminSignUp, superAdminSignUp };

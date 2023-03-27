import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const signUp: Interfaces.Controllers.Async = async (req, res, next) => {
  const data: Interfaces.User = req.body;
  try {
    const user = await Utils.Auth.db.createUser(data);
    console.log(req.session, req.cookies.session);

    return res.json(
      Utils.Response.success({
        id: user.id,
        email: user.email,
        password: user.password,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default signUp;

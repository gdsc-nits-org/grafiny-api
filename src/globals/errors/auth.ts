import * as Utils from "../../utils/response";

const invalidCredentials = Utils.error("Invalid Email Or Password", 401);

export { invalidCredentials };

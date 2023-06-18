import * as Utils from "../../utils/response";

const invalidDetails = Utils.error(
  "Invalid Details or All details Not Provided",
  401
);

export { invalidDetails };

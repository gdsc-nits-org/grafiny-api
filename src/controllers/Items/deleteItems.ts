import { deleteFiles } from "../../utils/aws/delete";
import * as Utils from "../../utils";

export const deleteFileByName = async (req: any, res: any) => {
  const fileName = req.params.fileName;

  try {
    await deleteFiles([fileName]);
    return res.json(Utils.Response.success("File deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.json(Utils.Response.error("Error deleting file", 500));
  }
};

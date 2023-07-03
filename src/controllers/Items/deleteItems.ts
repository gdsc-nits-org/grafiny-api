import { deleteFiles } from "../../utils/aws/delete";

export const deleteFileByName = async (req: any, res: any) => {
  const fileName = req.params.fileName;

  try {
    await deleteFiles([fileName]);
    return res.json({ message: "File  deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting file", details: err });
  }
};

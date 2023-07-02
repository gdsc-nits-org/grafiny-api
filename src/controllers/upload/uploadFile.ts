//import * as Utils from "../../utils/index";
import { firebaseConfig } from "src/utils/firebase";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const storage = getStorage();

const upload = async (req: any, res: any) => {
  try {
    console.log(req.file);
    const storageRef = ref(storage, `files2/${req.file.originalname}`);

    const metaData = {
      contentType: req.file.mimetype,
    };

    const snap = await uploadBytes(storageRef, req.file.buffer, metaData);

    const url = await getDownloadURL(snap.ref);
    console.log(url, snap);
    res.json({ url, snap });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

export default upload;

const path = require("path");
const fs = require("fs").promises;
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const uploadPicture = async (req, picturePath, pictureName) => {
  const file = await fs.readFile(path.join("uploads", req.file.filename));

  const extension = req.file.originalname.split(".")[1];

  const storage = getStorage();
  const pictureRef = ref(storage, `${picturePath}/${pictureName}.${extension}`);
  const metadata = {
    contentType: req.file.mimetype,
  };

  await uploadBytes(pictureRef, file, metadata);
  const url = await getDownloadURL(pictureRef);

  return url;
};

module.exports = uploadPicture;

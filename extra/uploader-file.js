const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

// Initialize Cloud Storage
const storage = getStorage();

const uploadPdf = async (pdfFile) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(
      storage,
      `pdfs/${pdfFile.originalname}_${dateTime}.pdf`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: pdfFile.mimetype,
    };

    // Upload the PDF file to the storage bucket
    const snapshot = await uploadBytesResumable(
      storageRef,
      pdfFile.buffer,
      metadata
    );

    // Get the public URL of the uploaded PDF file
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("PDF file successfully uploaded.");

    return {
      message: "PDF file uploaded to Firebase Storage",
      name: pdfFile.originalname,
      type: pdfFile.mimetype,
      downloadURL: downloadURL,
    };
  } catch (error) {
    console.error("PDF file upload error:", error);
    throw new Error("Error uploading PDF file to Firebase Storage");
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  const time =
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0") +
    ":" +
    today.getSeconds().toString().padStart(2, "0");
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = { uploadPdf };

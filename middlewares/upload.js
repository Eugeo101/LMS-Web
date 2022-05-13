const multer = require("multer");
const fs = require("fs");

module.exports = (
    folders = { main: "uploads", sub: "" },
    file = { fieldName: "file", fileTypes: [], single: true }
) => {
    const mainFolder = folders.main || "uploads";
    const subFolder = folders.sub || "";
    const fieldName = file.fieldName || "file";
    const fileTypes = file.fileTypes || [];
    const single = file.single || true;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = `${mainFolder}/${subFolder}`;
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            return cb(null, dir);
        },
        filename: (req, file, cb) => {
            const fileName = `${new Date().toISOString()}_${file.originalname}`;
            cb(null, fileName);
        },
    });

    const types = {
        image: fileTypes.indexOf("image") > -1,
        audio: fileTypes.indexOf("audio") > -1,
        video: fileTypes.indexOf("video") > -1,
        comp: fileTypes.indexOf("comp") > -1,
        pdf: fileTypes.indexOf("pdf") > -1,
        spreadsheet: fileTypes.indexOf("sheet") > -1,
        presentation: fileTypes.indexOf("pres") > -1,
        document: fileTypes.indexOf("doc") > -1,
    };
    const fileFilter = (req, file, cb) => {
        switch (file.mimetype) {
            //Image
            case "image/gif":
            case "image/jpeg":
            case "image/jpg":
            case "image/png":
                cb(null, types.image && true);
                break;

            //Audio
            case "audio/aac":
            case "audio/mpeg":
            case "audio/ogg":
            case "audio/wav":
            case "audio/webm":
                cb(null, types.audio && true);
                break;

            //Video
            case "video/x-msvideo":
            case "video/mp2t":
            case "video/mpeg":
            case "video/ogg":
            case "video/webm":
                cb(null, types.video && true);
                break;

            //Compressed
            case "application/gzip":
            case "application/x-7z-compressed":
            case "application/zip":
            case "application/x-bzip2":
            case "application/x-rar-compressed":
            case "application/x-gtar":
                cb(null, types.comp && true);
                break;

            //Pdf
            case "application/pdf":
                cb(null, types.pdf && true);
                break;

            //Spreadsheet
            case "application/vnd.oasis.opendocument.spreadsheet":
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                cb(null, types.spreadsheet && true);
                break;

            //Document
            case "application/vnd.oasis.opendocument.text":
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                cb(null, types.document && true);
                break;

            //Presentation
            case "application/vnd.oasis.opendocument.presentation":
            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                cb(null, types.presentation && true);
                break;

            default:
                cb(null, false);
                break;
        }
    };
    const upload = multer({ storage: storage, fileFilter: fileFilter });
    return single ? upload.single(fieldName) : upload.any();
};

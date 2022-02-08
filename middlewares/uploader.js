const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  /**@param {{path:string,mimetype:string,fieldname:string}} file */
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

var uploader = multer({ storage: storage });

module.exports = uploader;

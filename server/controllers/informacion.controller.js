import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: req.body.filename, // Check if this prints the correct filename
        bucketName: "uploads",
        metadata: {
          idPostulation: req.body.idPostulation, // Check if this prints the correct idPostulation
        },
      };
      console.log("File Info:", fileInfo); // Add this line for debugging
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

export const uploadPdf = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(201).send(req.file);
  });
};

export const getPdf = (req, res) => {
  const fileId = req.params.fileId;

  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
};

export const getAllFiles = (req, res) => {
  gfs.files.find({}).toArray((err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(files);
  });
};

export const getFileByPostulationId = (req, res) => {
  const idPostulation = req.params.idPostulation;

  gfs.files.findOne(
    { "metadata.idPostulation": idPostulation },
    (err, file) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!file) {
        return res
          .status(404)
          .json({ error: "File not found for the given idPostulation" });
      }

      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    }
  );
};

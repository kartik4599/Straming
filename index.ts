import Express from "express";
import { createReadStream, statSync } from "fs";

const app = Express();

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Requires Range header");
  }
  const videopath = "video.mp4";
  const videoSize = statSync(videopath).size;
  const ChunkSize = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + ChunkSize, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  createReadStream(videopath, { start, end }).pipe(res);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

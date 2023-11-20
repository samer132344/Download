const express = require("express");
const ytdl = require("ytdl-core");
const { urlencoded } = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); 
  next();
});

app.use(urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get("*", (req, res) => {
  res.send("Welcome");
});

app.post("/download", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const v_id = req.body.link.split("v=")[1];
    const info = await ytdl.getInfo(req.body.link);

    const videoInfo = {
      url: "https://www.youtube.com/embed/" + v_id,
      info: info.formats.sort((a, b) => {
        return a.mimeType < b.mimeType;
      }),     
    };
    res.status(200).send(videoInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app listening on port  3000");
});

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const weatherRoutes = require("./routes/route");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", true);
}

const allowedOrigins = [
  process.env.NODE_ENV !== "production" ? `http://localhost:${port}` : "",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(weatherRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

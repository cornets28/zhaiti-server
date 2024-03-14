import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import colors from "colors";
import morgan from "morgan";

import testRoutes from "./src/routes/testRoutes.js";

//Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

const app = express();
// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoutes);
// port
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} and listening on port ${PORT}`
      .bgCyan.white
  );
});

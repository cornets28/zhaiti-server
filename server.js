// packages import
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import "express-async-errors";
// API documentation
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
// security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// file import
import connectDB from "./src/config/db.js";
// routes import
import authRoutes from "./src/routes/auth.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import userRoutes from "./src/routes/user.routes.js";
import articleRoutes from "./src/routes/article.routes.js";

//Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

// Swagger API configuration
// API configuration options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ZHaiti news application",
      version: "1.0.0",
      description:
        "ZHaiti news application is a web a web application for interacting with the ZHaiti front-end",
    },
    servers: [
      {
        // url: `http://localhost:${process.env.PORT}`,
        url: "http://localhost:5000"
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const spec = swaggerJsdoc(options);

// rest object
const app = express();


// middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/article", articleRoutes);

// home route root
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} and listening on port ${PORT}`
      .bgCyan.white
  );
});

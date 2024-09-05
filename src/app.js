import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "dotenv/config";

class App {
  port = process.env.PORT || 3050;

  host = process.env.HOST || "localhost";
  expressApp = null;
  constructor() {
    this.expressApp = express();

    this.connectToDatabase();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares = () => {
    this.expressApp.use(
      cors({
        origin: [
          "**",
          "https://ayat-art-craft.web.app",
          "https://ayat-art-craft.firebaseapp.com/**",
        ],
        credential: true,
      })
    );
    this.expressApp.use(express.urlencoded({ extended: false }));
    this.expressApp.use(express.json({ limit: "20mb" }));
  };

  connectToDatabase = async () => {
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rdwf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  };

  getServer = () => {
    return this.expressApp;
  };

  initializeRoutes = () => {
    routes(this.expressApp);
  };

  initializeErrorHandling = () => {};
  run = () => {
    this.expressApp.listen(this.port, () => {
      console.log("App Is running on Port http://localhost:" + this.port);
    });
  };
}

const app = new App();

export { app };

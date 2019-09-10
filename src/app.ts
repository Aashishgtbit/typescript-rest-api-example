import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/posts.routes";
// import imageRoutes from "./routes/images.routes";
// import postWithId from "./routes/posts.routeswithid";
import "dotenv/config";
import * as mongoose from "mongoose";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    console.log("this.initializeMiddlewares called --------");
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev")); /* To print the api calls to the console . */
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers() {
    this.app.use("/user/", userRoutes);
    this.app.use("/posts/", postRoutes);
    // this.app.use("/posts/", postWithId);

    // this.app.use("/uploadImages", imageRoutes);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private connectToTheDatabase() {
    const { HOST, M_DB_PORT, PORT, M_USERNAME, M_PASSWORD } = process.env;
    console.log("******", HOST, M_DB_PORT);
    console.log("PORT : ", PORT);

    mongoose.connect(
      `mongodb://${M_USERNAME}:${M_PASSWORD}@${HOST}:${M_DB_PORT}/my_db`,
      {
        useNewUrlParser: true
      }
    );
  }
}

export default App;

import * as express from "express";
import * as bodyParser from "body-parser";
import Controller from "./interfaces/controller.interface";
import "dotenv/config";
import * as mongoose from "mongoose";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    console.log("this.initializeMiddlewares called --------");
    // this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private connectToTheDatabase() {
    const { MONGO_PATH, PORT } = process.env;
    console.log("******", MONGO_PATH);
    console.log("PORT : ", PORT);

    mongoose.connect(`mongodb://localhost:27017/new_db`, {
      useNewUrlParser: true
    });
  }
}

export default App;

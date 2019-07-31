// import { cleanEnv, str } from "envalid";

const envalid = require("envalid");
const { str, port } = envalid;

function validateEnv() {
  envalid.cleanEnv(process.env, {
    MONGO_PATH: str(),
    PORT: port()
  });
}

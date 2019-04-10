import express from "express";
import path from "path";
import serverRenderer from "../middleware/renderer";
import configureStore from "../../src/store/configureStore";
import { setMessage } from "../../src/actions";

const router = express.Router();

const actionDefault = (req, res, next) => {
  const store = configureStore();
  store.dispatch(setMessage("rendered on server"));
  serverRenderer(store)(req, res, next);
};

router.use("^/$", actionDefault);

router.use(
  express.static(path.resolve(__dirname, "..", "..", "build"), {
    maxAge: "30d"
  })
);

router.use("*", actionDefault);

export default router;

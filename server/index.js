import express from "express";
import Loadable from "react-loadable";
import renderControllet from "./controllers/reactController";

const PORT = process.env.PORT || 3001;
const app = express();
if (!process.env.NODE_ENV) {
  app.use(renderControllet);

  Loadable.preloadAll().then(() => {
    app.listen(PORT, error => {
      if (error) {
        return console.log("Something bad happened", error);
      }
      console.log("listening prod server on " + PORT + "...");
    });
  });
} else {
  app.listen(PORT, error => {
    if (error) {
      return console.log("Something bad happened", error);
    }
    console.log("listening dev server on " + PORT + "...");
  });
}

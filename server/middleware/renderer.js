import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";

import App from "../../src/App";
import manifest from "../../build/asset-manifest.json";

const extractAssets = (assets, chunks, pattern) =>
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace(pattern, "")) > -1)
    .map(k => assets[k]);

export default store => (req, res) => {
  const htmlPath = path.resolve(__dirname, "..", "..", "build", "index.html");
  fs.readFile(htmlPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("err", err);
      return res.status(404).end();
    }

    let modules = [];
    const routerContext = {};

    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <ReduxProvider store={store}>
          <StaticRouter location={req.baseUrl} context={routerContext}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      </Loadable.Capture>
    );

    if (routerContext.url) {
      return res.redirect(301, routerContext.url);
    }

    const reduxState = JSON.stringify(store.getState());
    const extraChunksJs = extractAssets(manifest, modules, ".js")
      .map(link => `<script type="text/javascript" src="${link}"></script>`)
      .join("");
    const extraChunksCSS = extractAssets(manifest, modules, ".css")
      .map(link => `<link href="${link}" type="text/css" rel="stylesheet">`)
      .join("");

    const helmet = Helmet.renderStatic();

    return res.send(
      htmlData
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace("__REDUX_STATE__={}", `__REDUX_STATE__=${reduxState}`)
        .replace("</head>", extraChunksCSS + "</head>")
        .replace("</body>", extraChunksJs + "</body>")
        .replace(
          /<title>.*<\/title>/g,
          helmet.title.toString() + helmet.meta.toString()
        )
    );
  });
};

import React from "react";
import ReactDOM from "react-dom";
import es6Promise from "es6-promise";

import AppContext from "./appcontext";
import MetaPortalPlayer from "./components/MetaPortalPlayer";

export default class Certigo {
    run(appId) {
        const app = document.getElementById(appId);
        const appContext = new AppContext;
        ReactDOM.render(
            <MetaPortalPlayer appContext={appContext}></MetaPortalPlayer>,
        app);
    }

    Aap() {}
}

if (!global.Promise) {
    es6Promise.polyfill();
}
window.Certigo = new Certigo;
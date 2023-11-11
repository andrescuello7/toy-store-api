import { App } from "./src/app";
require("dotenv").config();

async function main() {
    const app = new App()
    app.settings();
    app.routes();
    app.listen();
}
main();
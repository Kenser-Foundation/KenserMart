const express = require("express");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const dotenv = require("dotenv")
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Live reload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "..", "Client"));
app.use(connectLivereload());

app.use(express.static(path.join(__dirname, "..", "Client")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Client", "Views", "index.html"));
});

app.get("/account-settings", (req, res) => {
    res.sendFile((path.join(__dirname, "..", "Client", "Views", "account-settings.html")))
})

app.listen(PORT, () => {
    console.log(`Express Server started at http://localhost:${PORT}`);
});

// Ensure the browser refreshes when files change
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 10);
});

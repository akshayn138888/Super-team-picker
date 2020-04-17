const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");

console.log("__dirname: ", __dirname);

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// METHOD OVERRIDE
app.use(
  // Without this, we cannot accept DELETE, PUT, or PATCH requests from
  // the browser!
  methodOverride((request, response) => {
    if (request.body && request.body._method) {
      const method = request.body._method;
      // This modifies the request object
      // It changes it from a POST request
      // to be whatever the value for _method
      // was within the form that was just submitted.
      return method;
    }
  })
);

//Server
const PORT = 4545;
const ADDRESS = "localhost"; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}/team`);
});

const teamRouter = require("./routes/teamRouter");
app.use("/team", teamRouter);

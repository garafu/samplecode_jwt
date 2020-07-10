var { CsvReader, CsvWriter } = require("at-framework/io");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "your-256-bit-secret";

var reader = new CsvReader("./sample.csv", "utf-8");
var writer = new CsvWriter("./created.csv", "utf-8");
reader.on("data", (row) => {
  var token = jwt.sign({
    "sub": row[0],
    "name": row[1],
    "iat": 1516239022
  }, SECRET_KEY, {
    algorithm: "HS256",
  });

  // console.log(token);
  writer.writeRow([row[0], token]);
});
reader.on("closed", () => {
  writer.close();
});
reader.readRow();


// var token = jwt.sign({
//   "sub": "1234567890",
//   "name": "John Doe",
//   "iat": 1516239022
// }, SECRET_KEY, {
//   algorithm: "HS256",
// });

// console.log(token);
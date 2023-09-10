const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors(
  {
    origin: ["https://frontend-1h8s.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true,
  }
));
app.use(express.json());
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/doingR", require("./Routes/doingR"));
app.use("/api/doneR", require("./Routes/doneR"));
app.use("/api/todoR", require("./Routes/todoR"));

app.listen(port, () => {
  console.log(`Kanban App app listening on port http://localhost:${port}`);
});


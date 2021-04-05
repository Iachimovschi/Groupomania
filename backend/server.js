const express = require("express");
const bodyParser = require("body-parser");
const headers = require("./middleware/headers"); 
const helmet = require("helmet");


const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");


const db = require("./models/index");
db.sequelize.sync();


const app = express();
app.use(express.json());
app.use(helmet());


app.use(headers); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);

const PORT = 8081;
app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));

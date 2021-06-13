const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const app = express();
const port = 3000;
const dbConfig = require("./config/db.config");

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./models");
const Role = db.role;

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
 
app.use(morgan('combined'));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
  res.json({ message: "Hello World!" });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  // function initial() {
  //   Role.estimatedDocumentCount((err, count) => {
  //     if (!err && count === 0) {
  //       new Role({
  //         name: "user"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'user' to roles collection");
  //       });
  
  //       new Role({
  //         name: "moderator"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'moderator' to roles collection");
  //       });
  
  //       new Role({
  //         name: "admin"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'admin' to roles collection");
  //       });
  //     }
  //   });
  // }
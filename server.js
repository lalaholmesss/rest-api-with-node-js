require('dotenv').config();
const express = require('express'); 
const app = express(); // express is a function and we need to initialise it
const PORT = process.env.PORT;

const stdRoutes = require('./src/student/routes');

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.use("/api/v1/students", stdRoutes);

app.listen(
    PORT, 
    () => console.log(`The server is aliveee`)
);


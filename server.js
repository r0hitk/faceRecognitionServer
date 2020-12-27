const express = require("express");

const app = express();

const database = [
    {
        id: 123,
        name: "Rohit",
        email: "rohit@gmail.com",
        password: "cookies",
        entries: 0,
        joined: new Date()
    },
    {
        id: 143,
        name: "Ankit",
        email: "ankit@gmail.com",
        password: "bananas",
        entries: 0,
        joined: new Date()
    }
];

app.get("/", (req,res)=>{
    res.send("Hello from the backend!");
});
""
app.post("/signin",(req,res)=>{
res.send("signing!");
});

app.listen(3000, ()=>{
    console.log("Server at 3000 is running.");
})
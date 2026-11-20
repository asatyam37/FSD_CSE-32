const express = require('express');

const app = express();

const PORT = 3000;

//  middleware
app.use(express.json());

// In-memory data

let students = [
    {
        id: 1,
        name: "Rahul",
        course: "B-Tech",
        branch: "CSE"
    },
    {
        id: 2,
        name: "Priya",
        course: "B-Tech",
        branch: "IT"
    }
];

// ==============================================
//    read - GET STUDENT BY ID
// ==============================================

app.get("/students", (req, res)=>{
    res.json(students);
})
app.get('/students/:id', (req, res) => {
    const id = Number(req.params.id);

});




//  Start Server

app.listen(PORT, (req, res)=>{
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});
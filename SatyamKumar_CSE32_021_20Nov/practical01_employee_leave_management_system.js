
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Start server


// Initial leave records

let leaves = [
    {
        id: 701,
        employeeName: "Ananya Singh",
        employeeCode: "EMP101",
        leaveType: "Casual",
        days: 2,
        status: "Pending"
    },
    {
        id: 702,
        employeeName: "Rahul Verma",
        employeeCode: "EMP102",
        leaveType: "Sick",
        days: 1,
        status: "Approved"
    },
    {
        id: 703,
        employeeName: "Simran Kaur",
        employeeCode: "EMP103",
        leaveType: "Earned",
        days: 3,
        status: "Rejected"
    }
];


app.get("/api/leaves", (req, res) => {
    res.status(200).json(leaves);
});



app.post("/api/leaves", (req, res) => {
    
    const { employeeName, employeeCode, leaveType, days, status } = req.body;
    
    if (!employeeName || !employeeCode || !leaveType || days === undefined || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!Number.isInteger(days) || days <= 0) {
        return res.status(400).json({ message: "Days must be a positive integer" });
    }

    if (!["Casual", "Sick", "Earned"].includes(leaveType)) {
        return res.status(400).json({ message: "Invalid leave type" });
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    const newId = Math.max(...leaves.map(l => l.id)) + 1;

    const newLeave = {
        id: newId,
        employeeName,
        employeeCode,
        leaveType,
        days,
        status
    };

    leaves.push(newLeave);

    res.status(201).json(newLeave);
});

app.get("/api/leaves/filter", (req, res) => {

    const status = req.query.status;

    if (!status) {
        return res.status(400).json({
            message: "Status query parameter is required"
        });
    }

    const filteredLeaves = leaves.filter(
        l => l.status.toLowerCase() === status.toLowerCase()
    );

    res.status(200).json(filteredLeaves);
});


app.get("/api/leaves/pending", (req, res) => {
    
    const pendingLeaves = leaves.filter(
        l => l.status === "Pending"
    );
    
    res.status(200).json(pendingLeaves);
    
});



app.get("/api/leaves/:id", (req, res) => {

    const id = Number(req.params.id);

    const leave = leaves.find(l => l.id === id);

    if (!leave) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    res.status(200).json(leave);

});


app.put("/api/leaves/:id", (req, res) => {

    const id = Number(req.params.id);

    const leave = leaves.find(l => l.id === id);

    if (!leave) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    const { employeeName, employeeCode, leaveType, days, status } = req.body;

    if (!employeeName || !employeeCode || !leaveType ||
        days === undefined || !status) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (!Number.isInteger(days) || days <= 0 ||
        !["Casual", "Sick", "Earned"].includes(leaveType) ||
        !["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    leave.employeeName = employeeName;
    leave.employeeCode = employeeCode;
    leave.leaveType = leaveType;
    leave.days = days;
    leave.status = status;

    res.status(200).json(leave);

});



app.delete("/api/leaves/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = leaves.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    leaves.splice(index, 1);

    res.status(200).json({
        message: "Leave request deleted successfully"
    });

});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});

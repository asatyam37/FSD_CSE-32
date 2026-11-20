const fs = require('fs');


// 1. create a file

fs.writeFileSync('./Experiment/student1.txt', 'Name: Satyam');
console.log('File created successfully');

// Read the file

const data = fs.readFileSync("./Experiment/student1.txt", "utf-8")
console.log("File content") 
console.log(data)

//  update the file

fs.appendFileSync("./Experiment/student1.txt", " Name : ABES ENGINEERING COLLEGE ");
console.log("File updated successfully")

//  read updated file

const updatedData = fs.readFileSync('./Experiment/student1.txt', "utf-8");

console.log(updatedData)

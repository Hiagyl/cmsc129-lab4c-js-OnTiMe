let students_list = []; //list of students

function time_now(){ //get current date and time
    const currentDate = new Date();
    const dateFormat = { //format for date
        weekday:"long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const formattedDate = currentDate.toLocaleDateString("en-US", dateFormat);
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let periodofDay = hours >= 12?"PM" : "AM";
    hours = hours % 12||12 //convert from 24-hr format to 12-hr
    minutes = minutes.toString().padStart(2, "0"); 
    const timeFormat = `${hours}:${minutes} ${periodofDay}`;
    document.getElementById("displayDate").innerHTML = `Today is: ${formattedDate}. <br>The current time is ${timeFormat}.`;
}

function validateForm(event){
        event.preventDefault();

        const studentNum = document.getElementById("studentNumber").value.trim();
        const name = document.getElementById("name").value.trim();
        const age = parseInt(document.getElementById("age").value);
        const upEmail = document.getElementById("upEmail").value.trim();
        const course = document.getElementById("course").value;

        //conditions for input validation
        const inputValidation = [
            {condition: studentNum.length !== 9, message: "Enter a valid student number."},
            {condition: name.length < 5 || !name.includes(" "), message: "Enter a valid name."},
            {condition: age < 18 || age > 99 || isNaN(age), message: "Age must be >=18."},
            {condition: !upEmail.endsWith("@up.edu.ph"), message: "Email must end with @up.edu.ph."},
            {condition: students_list.some(student => student.studentNum === studentNum), message: "Error: Duplicate Student Number detected!"}
        ];
        for (const validation of inputValidation){
            if (validation.condition){
                alert(validation.message);
                return;
            }
        }
        //add student to the list
        let student = {studentNum,name,age,upEmail,course};
        students_list.push(student);
        alert("Student added successfully to database!");
        document.getElementById("studentForm").reset();
        displayStudents();
}

function searchStudent(){
    const searchStudent = document.getElementById("searchStudentNum").value.trim();
    const displayResults = document.getElementById("searchResults");
    const foundStudent = students_list.find(student => student.studentNum === searchStudent);
        if(foundStudent){
                displayResults.innerHTML = `
                <p>Student Found: <br><br>
                <strong>Student Number:</strong> ${foundStudent.studentNum} <br>
                <strong>Name:</strong> ${foundStudent.name} <br>
                <strong>Age:</strong> ${foundStudent.age} <br>
                <strong>UP Email:</strong> ${foundStudent.upEmail} <br>
                <strong>Course:</strong> ${foundStudent.course}</p>
                `;
        } else {
                alert("Error: Student not found.");
            }
}
function displayStudents(){
    const studentList = document.getElementById("studentList");
    if(students_list.length === 0){
        alert("No students found.");
        studentList.innerHTML = "";
        return;
    } else {
        let studentTable = `<table border='1'>
        <tr>
            <th>Student Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>UP Email</th>
            <th>Course</th>
        </tr>`;
        students_list.forEach(student => {
            studentTable += `
            <tr>
                <td>${student.studentNum}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.upEmail}</td>
                <td>${student.course}</td>
            </tr>`;
        });
        studentTable += `</table>`;
        studentList.innerHTML = studentTable;
    }
}

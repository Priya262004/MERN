const form = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const course = document.getElementById('course').value;

  const student = { name, age, course };

  const response = await fetch('http://localhost:5174/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  });

  const newStudent = await response.json();
  addStudentToList(newStudent);
  form.reset();
});

async function fetchStudents() {
  const response = await fetch('http://localhost:5174/api/students');
  const students = await response.json();
  students.forEach(addStudentToList);
}
function addStudentToList(student) {
  const li = document.createElement('li');
  li.innerHTML = `${student.name} - ${student.age} - ${student.course}`;
  studentList.appendChild(li);
}
fetchStudents();
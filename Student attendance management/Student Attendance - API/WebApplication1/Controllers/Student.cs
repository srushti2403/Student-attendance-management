using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private static List<Student> students = new List<Student>()
        {
            new Student { Id = 1, Name = "rohan Doe", RollNumber = "A001", Username = "johndoe", Password = "password", Class = "10A", Maths = 80, Science = 85, English = 90, Hindi = 75, SST = 82, Attendance = new List<Attendance>() },
            new Student { Id = 2, Name = "Jane Smith", RollNumber = "A002", Username = "janesmith", Password = "password", Class = "9B", Maths = 78, Science = 92, English = 85, Hindi = 80, SST = 88, Attendance = new List<Attendance>() },
            new Student { Id = 3, Name = "Alice Johnson", RollNumber = "A003", Username = "alicejohnson", Password = "password", Class = "11C", Maths = 92, Science = 87, English = 91, Hindi = 85, SST = 90, Attendance = new List<Attendance>() }
        };

        // GET api/student
        [HttpGet]
        public ActionResult<IEnumerable<Student>> Get()
        {
            return Ok(students);
        }

        // GET api/student/5
        [HttpGet("{id}")]
        public ActionResult<Student> GetById(int id)
        {
            Student student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound("Student not found");
            }
            return Ok(student);
        }

        // POST api/student/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] Student newStudent)
        {
            if (newStudent == null)
            {
                return BadRequest("Invalid request body");
            }

            // Simulate generating a unique ID for the new student (you can use a real ID generation logic)
            int newId = students.Count + 1;
            newStudent.Id = newId;
            newStudent.RollNumber = newId.ToString();

            // Initialize all marks to zero
            newStudent.Maths = 0;
            newStudent.Science = 0;
            newStudent.English = 0;
            newStudent.Hindi = 0;
            newStudent.SST = 0;

            // Initialize attendance for current month (set presents to 0)
            string currentMonth = DateTime.Now.ToString("MMMM");
            newStudent.Attendance = new List<Attendance> { new Attendance { Month = currentMonth, Presents = 0 } };

            // Add the new student to the list
            students.Add(newStudent);

            // Return the newly created student with a 201 Created status code
            return CreatedAtAction(nameof(GetById), new { id = newId }, newStudent);
        }        // PUT api/student/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Student updatedStudent)
        {
            if (updatedStudent == null)
            {
                return BadRequest("Invalid request body");
            }

            Student existingStudent = students.FirstOrDefault(s => s.Id == id);
            if (existingStudent == null)
            {
                return NotFound("Student not found");
            }

            // Update roll number
            existingStudent.RollNumber = updatedStudent.RollNumber;

            // Update class
            existingStudent.Class = updatedStudent.Class;

            // Update subject marks
            existingStudent.Maths = updatedStudent.Maths;
            existingStudent.Science = updatedStudent.Science;
            existingStudent.English = updatedStudent.English;
            existingStudent.Hindi = updatedStudent.Hindi;
            existingStudent.SST = updatedStudent.SST;

            // Update attendance (assuming attendance data is provided in the request body)
            existingStudent.Attendance = updatedStudent.Attendance;

            return Ok(existingStudent);
        }

        // DELETE api/student/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Student studentToRemove = students.FirstOrDefault(s => s.Id == id);
            if (studentToRemove == null)
            {
                return NotFound("Student not found");
            }

            students.Remove(studentToRemove);
            return NoContent();
        }

        // POST api/student/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid username or password");
            }

            // Find the student with the provided username
            Student student = students.FirstOrDefault(s => s.Username == loginRequest.Username);
            if (student == null)
            {
                return NotFound("Student not found");
            }

            // Check if the password matches
            if (student.Password != loginRequest.Password)
            {
                return BadRequest("Incorrect password");
            }

            // Login successful, return the student details without the password
            student.Password = null; // Remove password from the response
            return Ok(student);
        }


    }

    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RollNumber { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Class { get; set; }
        public int Maths { get; set; }
        public int Science { get; set; }
        public int English { get; set; }
        public int Hindi { get; set; }
        public int SST { get; set; }
        public List<Attendance> Attendance { get; set; }
    }

    public class Attendance
    {
        public string Month { get; set; }
        public int Presents { get; set; }
    }
}

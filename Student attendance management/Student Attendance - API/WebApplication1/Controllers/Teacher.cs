using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private static List<Teacher> teachers = new List<Teacher>()
        {
            new Teacher { Id = 1, Name = "John Doe", Dob = "1990-01-01", Username = "johndoe", Password = "password", Email = "johndoe@example.com" },
            new Teacher { Id = 2, Name = "Jane Smith", Dob = "1985-05-15", Username = "janesmith", Password = "password", Email = "janesmith@example.com" },
            new Teacher { Id = 3, Name = "Alice Johnson", Dob = "1978-09-20", Username = "alicejohnson", Password = "password", Email = "alicejohnson@example.com" }
        };

        // GET api/teacher
        [HttpGet]
        public ActionResult<IEnumerable<Teacher>> Get()
        {
            return Ok(teachers);
        }

        // POST api/teacher/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] Teacher newTeacher)
        {
            if (newTeacher == null)
            {
                return BadRequest("Invalid request body");
            }

            // Simulate generating a unique ID for the new teacher (you can use a real ID generation logic)
            int newId = teachers.Count + 1;
            newTeacher.Id = newId;

            // Add the new teacher to the list
            teachers.Add(newTeacher);

            // Return the newly created teacher with a 201 Created status code
            return CreatedAtAction(nameof(Get), new { id = newId }, newTeacher);
        }

        // POST api/teacher/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid username or password");
            }

            // Simulate checking credentials against a database or external service
            Teacher authenticatedTeacher = teachers.FirstOrDefault(t => t.Username == loginRequest.Username && t.Password == loginRequest.Password);

            if (authenticatedTeacher == null)
            {
                return Unauthorized("Invalid username or password");
            }

            // Return the authenticated teacher with a 200 OK status code
            return Ok(authenticatedTeacher);
        }


    }
        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Dob { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}

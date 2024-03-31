import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/Navbar";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  english: number;
  hindi: number;
  sst: number;
  science: number;
  maths: number;
  attendance: { month: string; presents: number }[];
}

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[] | undefined>(undefined);

  const [editMode, setEditMode] = useState<string | null>(null);
  const [filterRollNumber, setFilterRollNumber] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("ClassA");
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5082/api/Student");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaveMarks = (studentId: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? {
              ...student,
              english: parseInt(student.english + ""),
              hindi: parseInt(student.hindi + ""),
              sst: parseInt(student.sst + ""),
              science: parseInt(student.science + ""),
              maths: parseInt(student.maths + ""),
            }
          : student
      )
    );
    setEditMode(null);
    handleUpdate(studentId);
  };

  const handleUpdate = async (studentId: string) => {
    try {
      const student = await students?.find((s) => s.rollNumber === studentId);
      if (!student) {
        console.error("Student not found");
        return;
      }

      const response = await fetch(
        `http://localhost:5082/api/Student/${student.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (response.ok) {
        console.log("Student updated successfully");
      } else {
        console.error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEditAttendance = (studentId: string) => {
    setEditMode(studentId);
  };

  const handleSaveAttendance = (studentId: string) => {
    setStudents((prevStudents: any) =>
      prevStudents?.map((student: Student) =>
        student.id === studentId
          ? { ...student, attendance: parseInt(student.attendance + "") }
          : student
      )
    );
    setEditMode(null);
  };

  const handleMarksChange = (
    studentId: string,
    subject: string,
    value: string
  ) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, [subject]: parseInt(value) }
          : student
      )
    );
  };

  const handleAttendanceChange = (studentId: string, value: string) => {
    setStudents((prevStudents: any) =>
      prevStudents.map((student: Student) =>
        student.id === studentId
          ? {
              ...student,
              attendance: student.attendance.map((record) =>
                record.month === currentMonth
                  ? { ...record, presents: parseInt(value) }
                  : record
              ),
            }
          : student
      )
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRollNumber(e.target.value);
  };

  const filteredStudents = students?.filter((student) =>
    student.rollNumber.toLowerCase().includes(filterRollNumber.toLowerCase())
  );

  const handleClassChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedClass(event.target.value as string);
  };

  const handleMarksChangeEnglish = (studentId: string, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, english: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeMaths = (studentId: string, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, maths: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeScience = (studentId: string, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, science: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeSST = (studentId: string, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, sst: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeHindi = (studentId: string, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, hindi: parseInt(value) }
          : student
      )
    );
  };

  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{ marginTop: "80px", marginBottom: "20px" }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Filter by Roll Number"
              variant="outlined"
              value={filterRollNumber}
              onChange={handleFilterChange}
              style={{ marginBottom: "20px" }}
            />
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>English Marks</TableCell>
                  <TableCell>Hindi Marks</TableCell>
                  <TableCell>SST Marks</TableCell>
                  <TableCell>Science Marks</TableCell>
                  <TableCell>Maths Marks</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.english}
                          onChange={(e) =>
                            handleMarksChangeEnglish(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.english
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.hindi}
                          onChange={(e) =>
                            handleMarksChangeHindi(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.hindi
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.sst}
                          onChange={(e) =>
                            handleMarksChangeSST(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.sst
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.science}
                          onChange={(e) =>
                            handleMarksChangeScience(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.science
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.maths}
                          onChange={(e) =>
                            handleMarksChangeMaths(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.maths
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={
                            student.attendance.find(
                              (item) => item.month === currentMonth
                            )?.presents || 0
                          }
                          onChange={(e) =>
                            handleAttendanceChange(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.attendance.find(
                          (item) => item.month === currentMonth
                        )?.presents || 0
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <Button
                          variant="contained"
                          onClick={() => handleSaveMarks(student.id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => setEditMode(student.id)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
};

export default StudentTable;

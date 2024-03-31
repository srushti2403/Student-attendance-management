import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Text } from 'recharts';

const data = [
  { month: 'January', attendance: 80 },
  { month: 'February', attendance: 85 },
  { month: 'March', attendance: 90 },
  { month: 'April', attendance: 75 },
  { month: 'May', attendance: 95 },
  { month: 'June', attendance: 85 },
  { month: 'July', attendance: 88 },
  { month: 'August', attendance: 92 },
  { month: 'September', attendance: 87 },
  { month: 'October', attendance: 83 },
  { month: 'November', attendance: 78 },
  { month: 'December', attendance: 91 },
];

const AttendanceBar = () => {
  return (
    <div style={{ height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:"column",paddingTop:"40px"}}>
      <ResponsiveContainer width="90%" height="70%"  >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="attendance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
        <h4>Attendance Percentage per Month</h4>
    </div>
  );
};

export default AttendanceBar;

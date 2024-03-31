import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const data = [
  { name: 'Maths', value: 87 },
  { name: 'English', value: 70 },
  { name: 'Sceince', value: 60 },
  { name: 'Hindi', value: 74 },
  { name: 'SST', value: 278 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PiePercentage = () => {
  const [activeData, setActiveData] = useState(data);

 

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={activeData}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" verticalAlign="bottom" iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiePercentage;
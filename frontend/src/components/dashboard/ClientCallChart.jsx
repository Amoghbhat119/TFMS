import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "This Month", value: 32 },
  { name: "Last Month", value: 24 }
];

function ClientCallChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="value" fill="#3b82f6" />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default ClientCallChart;
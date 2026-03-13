import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

function CandidateSourceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >

          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default CandidateSourceChart;
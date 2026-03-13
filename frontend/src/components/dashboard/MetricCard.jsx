function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-3xl font-bold text-blue-600">
        {value}
      </h3>

    </div>
  );
}

export default MetricCard;
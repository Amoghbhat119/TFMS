function Pipeline({ stages }) {

  return (
    <div className="grid grid-cols-5 text-center">

      {stages.map((stage) => (

        <div key={stage._id}>
          <p className="text-gray-500">{stage._id}</p>
          <p className="text-xl font-bold">{stage.count}</p>
        </div>

      ))}

    </div>
  );
}

export default Pipeline;
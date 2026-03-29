function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        ${value || 0}
      </p>

    </div>
  );
}

export default Card;
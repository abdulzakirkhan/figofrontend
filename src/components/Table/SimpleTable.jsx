const SimpleTable = ({ data }) => {
  return (
    <table className="w-full border-collapse">
      <thead className="bg-indigo-500 text-white">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Name</th>
          <th className="p-3">Country</th>
          <th className="p-3">Data</th>
          <th className="p-3">Validity</th>
          <th className="p-3">Price</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            <td className="p-3">{i + 1}</td>
            <td className="p-3">{row.name}</td>
            <td className="p-3">{row.country}</td>
            <td className="p-3">{row.data}</td>
            <td className="p-3">{row.validity}</td>
            <td className="p-3">{row.price}</td>
            <td className="p-3">
              <span className={`px-3 py-1 rounded-full text-xs
                ${row.status === "Enabled"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"}`}>
                {row.status}
              </span>
            </td>
            <td className="p-3 flex gap-2">
              <img src="/eye.png" className="w-5 cursor-pointer" />
              <img src="/edit.png" className="w-5 cursor-pointer" />
              <img src="/delete.png" className="w-5 cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;

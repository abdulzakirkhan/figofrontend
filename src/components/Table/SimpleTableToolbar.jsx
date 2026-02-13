import { Search } from "@mui/icons-material";

const SimpleTableToolbar = ({ search, onSearch }) => {
  return (
    <div className="bg-app border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="text-gray-400" />
          </div>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-64 border rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <img src="/csv.png" className="w-5 cursor-pointer" />
          <img src="/simimg.png" className="w-5 cursor-pointer" />
          <img src="/pdf.png" className="w-5 cursor-pointer" />
          <img src="/print.png" className="w-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SimpleTableToolbar;

import DataTableToolbar from "../DataTableToolbar";
import Paginate from "../Paginate";
import TableMui from "../TableMui";


const GenericTable = ({
  title,
  headers,
  data,
  customFields,
  page,
  count,
  limit,
  onPageChange,
}) => {
  return (
    <div className="bg-app p-4 rounded-lg shadow">
      <div className="border-b border-gray-200 pb-3 mb-4">
        <p className="text-lg font-semibold">{title}</p>
      </div>

      <DataTableToolbar enableSearch />


      <TableMui
        th={headers}
        td={data}
        customFields={customFields}
        headerRounded
        rowRounded
        styleTableContainer={{
          marginTop: "20px",
          maxHeight: "600px",
          overflow: "auto",
        }}
        styleTableThead={{ backgroundColor: "#6366f1", color: "white" }}
        styleTableTh={{ padding: "12px 16px", fontWeight: "600" }}
      />

      <Paginate
        count={count}
        limit={limit}
        page={page}
        onChange={onPageChange}
      />

    </div>
  );
};

export default GenericTable;

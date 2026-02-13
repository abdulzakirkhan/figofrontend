import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomTabs from "../components/CustomTabs";
import { useGetCustomerDetailQuery } from "../redux/customers/customersApi";
import { useSearchParams } from "react-router-dom";
import Transactions from "./Transactions";
import { DeviceInformation } from "./DeviceInformation";

export const UserDetail = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  console.log("Customer ID:", id);

  const { data, isLoading } = useGetCustomerDetailQuery(id);


  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  const user = data?.user;

  const tabLabels = ["Purchases", "Device Information"];
  const tabPanels = [
    // <Transactions transactions={data?.transactions || []} />,

    <Transactions id={id} />,
    <DeviceInformation imsi={data?.subscriber?.imsi} />,
  ];


  return (
    <div className="m-3">
      <div className="flex gap-6">
        {/* LEFT CARD */}
        <div className="w-80">
          <div className="card-body bg-app overflow-hidden rounded-2xl pb-6">
            <img src="/userCardimage.png" alt="" />

            <div className="flex flex-col items-center mt-2">
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  bgcolor: user?.profilePhoto ? "transparent" : "#2563EB",
                  fontSize: 48,
                  fontWeight: 600,
                }}
                src={user?.profilePhoto || undefined}
                imgProps={{
                  style: {
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  },
                }}
                className="border-4 border-white -mt-12"
              >
                {!user?.profilePhoto && user?.name?.charAt(0).toUpperCase()}
              </Avatar>

              <p className="text-2xl">{user?.name || "—"}</p>
              <p className="text-sm text-gray-500">User</p>
            </div>

            <div className="p-3">
              <p>Personal Info</p>

              <div className="flex gap-4 items-center mt-3">
                <img src="/frofile.png" width="20" />
                <p className="text-sm">: {user?._id || "—"}</p>
              </div>

              <div className="flex gap-4 items-center mt-3">
                <img src="/email.png" width="20" />
                <p className="text-sm">: {user?.email || "—"}</p>
              </div>

              {/* <div className="flex gap-4 items-center mt-3">
                <img src="/phone.png" width="20" />
                <p className="text-sm">: {user?.phone || "—"}</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* RIGHT TABS */}
        <div className="bg-app rounded-2xl px-2 flex-1">
          <CustomTabs tabs={tabLabels} panels={tabPanels} tabBgColor="#fff" />
        </div>
      </div>
    </div>
  );
};

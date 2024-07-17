import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { LuShieldClose } from "react-icons/lu";
import { MdVerifiedUser } from "react-icons/md";
import toast from "react-hot-toast";

const ManageTransReq = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: allPendingUser = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTransaction", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/transaction-request/${user?.email}`
      );
      return data;
    },
  });

  const handleReqApprove = async (user) => {
    try {
      const { data } = await axiosPublic.patch(
        `/cashin-approve/${user?._id}`,
        user
      );
      if (
        data.userResult?.modifiedCount > 0 &&
        data.agentResult?.modifiedCount > 0 &&
        data.transactionResult?.modifiedCount > 0
      ) {
        toast.success("Cash in request accepted");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <section className="container px-4 mx-auto mt-3">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">
          Pending Transaction
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {allPendingUser?.length}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>User Phone</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Transaction Type</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Amount</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {allPendingUser?.map((user) => (
                    <tr key={user?._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.userMobile}
                      </td>
                      <td className="px-4 capitalize py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.type}
                      </td>
                      <td className="px-4 capitalize py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.amount}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-md gap-x-1 ${
                            user?.status === "pending"
                              ? "bg-yellow-100/60 text-yellow-500"
                              : user?.status === "success"
                              ? "bg-green-100/60 text-green-500"
                              : ""
                          } `}
                        >
                          {user?.status === "pending" && (
                            <span>
                              <LuShieldClose size={18} />
                            </span>
                          )}
                          {user?.status === "success" && (
                            <span>
                              <MdVerifiedUser size={18} />
                            </span>
                          )}

                          <h2 className="text-sm font-normal capitalize">
                            {" "}
                            {user?.status}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            disabled={user?.status === "success"}
                            onClick={() => handleReqApprove(user)}
                            className="disabled:cursor-not-allowed flex items-center px-3 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                          >
                            <span className="mx-1">Approve</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageTransReq;

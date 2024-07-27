import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: allTransaction = [], isLoading } = useQuery({
    queryKey: ["transaction-history", user],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/transaction-history/${user?.mobile}`
      );
      return data;
    },
  });
  console.log(allTransaction);
  if (isLoading) return <Spinner />;
  return (
    <section className="container px-4 mx-auto mt-3">
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
                        <span>Mobile</span>
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

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {allTransaction?.map((user) => (
                    <tr key={user?._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.receiverMobile}
                      </td>
                      <td className="px-4 capitalize py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.type}
                      </td>
                      <td className="px-4 capitalize py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.amount} Tk
                      </td>
                      <td className="px-4 capitalize py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user?.date}
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

export default TransactionHistory;

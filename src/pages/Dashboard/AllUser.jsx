import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner";
import { MdBlockFlipped, MdVerifiedUser } from "react-icons/md";
import { LuShieldClose } from "react-icons/lu";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const AllUser = () => {
  const axiosPublic = useAxiosPublic();
  const [name, setName] = useState("");
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", name],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users?name=${name}`);
      return data;
    },
  });

  const handleActivate = async (user) => {
    const { data } = await axiosPublic.patch(`/user/${user?._id}`);
    if (data.modifiedCount > 0) {
      toast.success(`${user?.name} account is now verified!!`);
      refetch();
    }
  };

  const handleBlock = async (user) => {
    const { data } = await axiosPublic.patch(`/block-user/${user?._id}`);
    if (data.modifiedCount > 0) {
      toast.success(`${user?.name} account is Blocked!`);
      refetch();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.toLowerCase();
    setName(name);
  };

  console.log(name);
  if (isLoading) return <Spinner />;
  return (
    <section>
      <div className="container px-4 mx-auto mt-3">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 ">Total Users</h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
              {users?.length}
            </span>
          </div>
          <div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className="w-full border h-12 shadow p-4 pr-10 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                  placeholder="Search..."
                />
                <button
                  className="absolute top-1/2 right-2 hover:scale-125 transition duration-150 ease-in-out transform -translate-x-1/2 -translate-y-1/2"
                  type="submit"
                >
                  <FiSearch size={18} />
                </button>
              </div>
            </form>
          </div>
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
                          <span>Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Email</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Phone</span>
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
                    {users?.map((user) => (
                      <tr key={user?._id}>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user?.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user?.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user?.mobile}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-md gap-x-1 ${
                              user?.status === "pending"
                                ? "bg-yellow-100/60 text-yellow-500"
                                : user?.status === "activate"
                                ? "bg-green-100/60 text-green-500"
                                : "bg-red-100/60 text-red-500"
                            } `}
                          >
                            {user?.status === "pending" && (
                              <span>
                                <LuShieldClose size={18} />
                              </span>
                            )}
                            {user?.status === "activate" && (
                              <span>
                                <MdVerifiedUser size={18} />
                              </span>
                            )}
                            {user?.status === "block" && (
                              <span>
                                <MdBlockFlipped size={18} />
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
                              disabled={
                                user?.status === "activate" ||
                                user?.status === "block"
                              }
                              onClick={() => handleActivate(user)}
                              className="disabled:cursor-not-allowed flex items-center px-3 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                              <span className="mx-1">Activate</span>
                            </button>
                            <button
                              disabled={user?.status === "block"}
                              onClick={() => handleBlock(user)}
                              className="disabled:cursor-not-allowed flex items-center px-3 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                              <span className="mx-1">Block</span>
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
      </div>
    </section>
  );
};

export default AllUser;

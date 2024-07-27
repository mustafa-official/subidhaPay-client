import { useState } from "react";
import { AiOutlineBars, AiOutlineTransaction } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUsers } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsFillSendCheckFill } from "react-icons/bs";
import { MdOutlineSendToMobile } from "react-icons/md";
import { PiHandWithdrawBold } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("identifier");
    navigate("/login");
  };

  return (
    <aside>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">MFS App</div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#F1F5F9] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto">
              MFS App
            </div>
          </div>

          {/* Nav Items */}

          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Menu Items */}
            <NavLink
              end
              to="/dashboard/profile"
              className={({ isActive }) =>
                `relative group flex items-center px-4 py-2 my-5  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                  isActive ? "bg-indigo-200  text-indigo-600" : "text-gray-800"
                }`
              }
            >
              <TbLayoutDashboardFilled className="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-[90deg]" />
              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            {/* admin */}
            {user?.role === "admin" && (
              <>
                <NavLink
                  end
                  to="/dashboard/all-user"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <FaUsers className="w-5 h-5" />

                  <span className="mx-4 font-medium">All Users</span>
                </NavLink>
                <NavLink
                  end
                  to="/dashboard/all-transaction"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5 hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <AiOutlineTransaction className="w-5 h-5" />

                  <span className="mx-4 font-medium">All Transaction</span>
                </NavLink>
              </>
            )}

            {/* user */}
            {user?.role === "user" && (
              <>
                <NavLink
                  end
                  to="/dashboard/send-money"
                  className={({ isActive }) =>
                    `relative group flex items-center px-4 py-2  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <BsFillSendCheckFill size={18} className="transition-transform duration-300 transform group-hover:rotate-[90deg]" />

                  <span className="mx-4 font-medium">Send Money</span>
                </NavLink>

                <NavLink
                  end
                  to="/dashboard/cash-out"
                  className={({ isActive }) =>
                    `relative group flex items-center px-4 py-2 my-5  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <MdOutlineSendToMobile className="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-[90deg]" />

                  <span className="mx-4 font-medium">Cash Out</span>
                </NavLink>

                <NavLink
                  end
                  to="/dashboard/cash-in"
                  className={({ isActive }) =>
                    `relative group flex items-center px-4 py-2   hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <PiHandWithdrawBold className="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-[90deg]" />

                  <span className="mx-4 font-medium">Cash In</span>
                </NavLink>
                <NavLink
                  end
                  to="/dashboard/transaction-history"
                  className={({ isActive }) =>
                    `relative group flex items-center px-4 py-2 my-5  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <RiHistoryFill className="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-[90deg]" />

                  <span className="mx-4 font-medium">Trans History</span>
                </NavLink>
              </>
            )}

            {/* agent */}
            {user?.role === "agent" && (
              <>
                <NavLink
                  end
                  to="/dashboard/trans-request"
                  className={({ isActive }) =>
                    `relative group flex items-center px-4 py-2  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <BsFillSendCheckFill className="transition-transform duration-300 transform group-hover:rotate-[90deg]" size={18} />

                  <span className="mx-4 font-medium">Trans Request</span>
                </NavLink>
                <NavLink
                  end
                  to="/dashboard/transaction-history-agent"
                  className={({ isActive }) =>
                    `relative group flex items-center px-4 py-2 my-5  hover:text-indigo-600  transition-colors duration-300 transform  hover:bg-indigo-200 ${
                      isActive
                        ? "bg-indigo-200  text-indigo-600"
                        : "text-gray-800"
                    }`
                  }
                >
                  <RiHistoryFill className="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-[90deg]" />

                  <span className="mx-4 font-medium">Trans History</span>
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div>
          <hr className="border-dashed border-t-1 border-gray-300" />

          <button
            onClick={handleLogout}
            className="relative group flex w-full items-center py-2 px-4 mt-3 text-gray-800 hover:bg-indigo-200   hover:text-indigo-600 transition-colors duration-300 transform "
          >
            <GrLogout className="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-[-90deg]" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

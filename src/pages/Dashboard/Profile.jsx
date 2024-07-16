import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

const Profile = () => {
  const { user, loading } = useAuth();
  if(loading) return <Spinner></Spinner>
  return (
    <div className="m-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        <div className="w-full">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
            <div className="w-14 h-14 flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75">
              <FaUser color="white" size={25} />
            </div>

            <div className="mx-5 flex flex-col flex-wrap">
              <h4 className="text-2xl flex flex-wrap font-semibold text-gray-700">{user?.name}</h4>
              <div className="text-gray-500">Name</div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
            <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#4EDC85] bg-opacity-75">
              <FaBangladeshiTakaSign color="white" size={25} />
            </div>

            <div className="mx-5 flex flex-col flex-wrap">
              <h4 className="text-2xl flex flex-wrap font-semibold text-gray-700">{user?.balance}</h4>
              <div className="text-gray-500">Balance</div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
            <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#F43F5E] bg-opacity-75">
              <TfiEmail color="white" size={25} />
            </div>

            <div className="mx-5 flex flex-col flex-wrap">
              <h4 className="text-2xl flex flex-wrap font-semibold text-gray-700">{user?.email}</h4>
              <div className="text-gray-500">Email</div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
            <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#0EA5E9] bg-opacity-75">
              <FaPhoneAlt color="white" size={23} />
            </div>

            <div className="mx-5 flex flex-col flex-wrap">
              <h4 className="text-2xl flex flex-wrap font-semibold text-gray-700">{user?.mobile}</h4>
              <div className="text-gray-500">Phone</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

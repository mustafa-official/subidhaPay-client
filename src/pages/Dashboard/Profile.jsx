import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { GrMail } from "react-icons/gr";

const Profile = () => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner></Spinner>;
  return (
    <section>
      <div className="m-6">
        <div className="flex justify-center flex-col items-center gap-5">
          <div className="w-full">
            <div className="flex sm:justify-start flex-wrap gap-2  items-center px-5 py-6 shadow-sm rounded-2xl bg-indigo-100">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75">
                <FaUser color="white" size={25} />
              </div>

              <div className="sm:mx-5 sm:ml-3 flex flex-col flex-wrap">
                <h4 className="text-[18px] md:text-2xl flex flex-wrap font-semibold text-gray-700">
                  {user?.name}
                </h4>
                <div className="text-gray-500 text-sm text-[16px]">Name</div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex sm:justify-start flex-wrap gap-2  items-center px-5 py-6  rounded-2xl bg-indigo-100">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75">
                <GrMail color="white" size={25}></GrMail>
              </div>

              <div className="sm:mx-5 sm:ml-3 flex flex-col flex-wrap">
                <h4 className="text-[18px] md:text-2xl flex flex-wrap font-semibold text-gray-700">
                  {user?.email}
                </h4>
                <div className="text-gray-500 text-sm text-[16px]">Email</div>
              </div>
            </div>
          </div>

          {user?.role === "user" || user?.role === "agent" ? (
            <div className="w-full">
              <div className="flex sm:justify-start flex-wrap gap-2  items-center px-5 py-6  rounded-2xl bg-indigo-100">
                <div className="w-14 h-14 flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75">
                  <FaBangladeshiTakaSign color="white" size={25} />
                </div>

                <div className="sm:mx-5 sm:ml-3 flex flex-col flex-wrap">
                  <h4 className="text-[18px] md:text-2xl flex flex-wrap font-semibold text-gray-700">
                    {user?.balance.toFixed()} Tk
                  </h4>
                  <div className="text-gray-500 text-sm text-[16px]">Balance</div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="w-full">
            <div className="flex sm:justify-start flex-wrap gap-2  items-center px-5 py-6  rounded-2xl bg-indigo-100">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75">
                <FaPhoneAlt color="white" size={23} />
              </div>

              <div className="sm:mx-5 sm:ml-3 flex flex-col flex-wrap">
                <h4 className="text-[18px] md:text-2xl flex flex-wrap font-semibold text-gray-700">
                  {user?.mobile}
                </h4>
                <div className="text-gray-500 text-sm text-[16px]">Mobile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { ImSpinner3 } from "react-icons/im";
import { RiKeyFill } from "react-icons/ri";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.identifier.value;
    const pin = form.pin.value;

    const loginInfo = { identifier, pin };

    try {
      setLoading(true);
      const { data } = await axiosPublic.post("/login", loginInfo);
      if (data.data === "match") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("identifier", identifier);
        const userData = await fetchUserData(identifier, data.token); // Fetch user data
        setUser(userData);
        toast.success("Login Successful");
        navigate("/dashboard/profile");
      } else {
        toast.error(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  const fetchUserData = async (identifier, token) => {
    try {
      const response = await axiosPublic.get(`/user/${identifier}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  };

  const handleShowPin = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <form
          onSubmit={handleLogin}
          className="flex justify-center items-center h-[90vh] flex-col gap-3"
        >
          <label className="input input-bordered flex items-center gap-2 w-full">
            <FaUser color="#4F46E5" size={14}></FaUser>
            <input
              type="text"
              name="identifier"
              placeholder="Email or Mobile"
              className="pr-14"
              required
            />
          </label>
          <label className="input relative input-bordered flex items-center gap-2 w-full">
            <RiKeyFill color="#4F46E5" size={16}></RiKeyFill>
            <input
              type={showPass ? "text" : "password"}
              name="pin"
              placeholder="PIN"
              required
            />

            <div className="absolute cursor-pointer top-1/2 right-6 transform -translate-y-1/2">
              <div onClick={handleShowPin}>
                {showPass ? (
                  <LiaEyeSlashSolid color="gray" size={20} />
                ) : (
                  <LiaEyeSolid color="gray" size={20} />
                )}
              </div>
            </div>
          </label>
          <button
            disabled={loading}
            type="submit"
            className="disabled:cursor-not-allowed flex items-center px-4 w-full justify-center h-12 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            {loading ? (
              <ImSpinner3
                size={18}
                className="animate-spin m-auto"
              ></ImSpinner3>
            ) : (
              "Login"
            )}
          </button>
          <small className="mt-1 mx-auto">
            New user?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;

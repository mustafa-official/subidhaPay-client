import { FaPhoneAlt, FaUser } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiKeyFill } from "react-icons/ri";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
//  const { data } = await axiosPublic.post("/register", registerInfo);

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const role = form.role.value;
    const pin = form.pin.value;

    if (!/^\d{5}$/.test(pin)) {
      toast.error("PIN must be a 5-digit number");
      return;
    }

    const registerInfo = {
      name,
      email,
      mobile,
      role,
      pin,
      balance: 0,
      status: "pending",
    };
    console.log(registerInfo);
    try {
      setLoading(true);
      const { data } = await axiosPublic.post("/register", registerInfo);
      if (data.data === "register successful") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("identifier", email);
        toast.success("Registration Successful");
        navigate("/dashboard/profile");
      } else if (data.data === "already created") {
        toast.error("Email or Mobile already in use");
        setLoading(false);
      } else {
        toast.error("Registration Failed");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  const handleShowPin = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <form
          onSubmit={handleRegister}
          className="flex justify-center items-center h-[90vh] flex-col gap-3"
        >
          <label className="input input-bordered flex items-center gap-2 w-full">
            <FaUser color="#4F46E5" size={14}></FaUser>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className=""
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <FaPhoneAlt color="#4F46E5" size={14}></FaPhoneAlt>
            <input
              name="mobile"
              type="tel"
              placeholder="Phone"
              pattern="^01\d{9}$"
              required
              title="Mobile number must start with 01 and be 11 digits"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <GrMail color="#4F46E5" size={16}></GrMail>
            <input
              className="pr-14"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-1 w-full">
            <BsQuestionDiamondFill
              color="#4F46E5"
              size={16}
            ></BsQuestionDiamondFill>
            <select name="role" className="w-full">
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </label>

          <label className="input relative input-bordered flex items-center gap-2 w-full">
            <RiKeyFill color="#4F46E5" size={16}></RiKeyFill>
            <input
              name="pin"
              type={showPass ? "text" : "password"}
              placeholder="PIN"
              required
              pattern="\d{5}"
              minLength={5}
              maxLength={5}
              title="PIN must be a 5-digit number"
            />

            <div className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2">
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
            className="disabled:cursor-not-allowed flex items-center px-4 w-full justify-center h-12 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 hover:bg-indigo-700 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            {loading ? (
              <ImSpinner3
                size={18}
                className="animate-spin m-auto"
              ></ImSpinner3>
            ) : (
              "Register"
            )}
          </button>
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Register;

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
import logo from "../../img/subidhaPay.png";

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
    <section className="flex justify-center items-center min-h-screen">
      <div className="mockup-phone">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard artboard-demo phone-1">
          <div className="flex justify-center items-center h-screen">
            <div>
              <form
                onSubmit={handleRegister}
                className="flex justify-center items-center h-[90vh] flex-col gap-[10px]"
              >
                <div className="flex flex-col justify-center items-center my-2">
                  <div className="relative">
                    <img src={logo} className="w-20" alt="" />
                    {/* <div className="absolute top-[8px] right-6">
                      <span className="relative flex h-[7px] w-[7px]">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F46E5] opacity-100"></span>
                        <span className="relative inline-flex size-[7px] rounded-full bg-[#4F46E5]"></span>
                      </span>
                    </div> */}
                  </div>
                  <h2 className="text-[#5104d4] font-bold text-xl">
                    <span className="text-indigo-600 font-semibold">
                      Subidha
                    </span>
                    Pay
                  </h2>
                </div>
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
                    placeholder="Mobile"
                    pattern="^01\d{9}$"
                    required
                    title="Mobile number must start with 01 and be 11 digits"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <GrMail color="#4F46E5" size={16}></GrMail>
                  <input
                    className="sm:pr-10"
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
                  <Link
                    to="/"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Register;

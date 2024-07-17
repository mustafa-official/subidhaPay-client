import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";

const SendMoney = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  console.log(user?.email);

  const handleSendMoney = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const mobile = form.mobile.value;
    const amount = parseInt(form.amount.value);
    const pin = form.pin.value;

    if (amount < 50) {
      setLoading(false);
      return toast.error("Amount at least 50tk");
    }
    const sendMoneyInfo = { mobile, amount, pin, userEmail: user?.email };
    try {
      const { data } = await axiosPublic.patch("/send-money", sendMoneyInfo);
      if (data.modifiedCount > 0) {
        setLoading(false);
        form.reset();
        return toast.success("Send Money Successfully");
      } else if (data.data === "Invalid Pin") {
        setLoading(false);
        return toast.error("Invalid Pin");
      } else if (data.data === "Invalid account") {
        setLoading(false);
        return toast.error("Invalid account");
      } else if (data.data === "User not found") {
        setLoading(false);
        return toast.error("User not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };
  return (
    <div className="w-full md:w-[50%]">
      <form
        onSubmit={handleSendMoney}
        className="flex justify-center items-center h-screen flex-col gap-3"
      >
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaPhoneAlt color="gray" size={14}></FaPhoneAlt>
          <input
            name="mobile"
            type="number"
            required
            className="w-full"
            placeholder="Phone number (user)"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaBangladeshiTakaSign color="gray" size={15}></FaBangladeshiTakaSign>
          <input
            name="amount"
            required
            title="Amount at least 50 taka"
            type="number"
            className="w-full"
            placeholder="Amount"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            name="pin"
            required
            type="password"
            className="w-full"
            placeholder="PIN"
          />
        </label>
        <button
          disabled={loading}
          type="submit"
          className="disabled:cursor-not-allowed flex items-center px-4 w-full justify-center py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          {loading ? (
            <ImSpinner3 size={18} className="animate-spin m-auto"></ImSpinner3>
          ) : (
            "Send Money"
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMoney;

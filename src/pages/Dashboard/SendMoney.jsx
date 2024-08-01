import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { RiKeyFill } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendMoney = () => {
  const { user } = useAuth();
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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
      const { data } = await axiosSecure.patch("/send-money", sendMoneyInfo);
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
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSendMoney}
        className="flex justify-center items-center h-[90vh] w-[80%] lg:w-[40%] flex-col gap-3"
      >
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaPhoneAlt color="#626973" size={14}></FaPhoneAlt>
          <input
            name="mobile"
            type="number"
            required
            className="w-full"
            placeholder="Phone number (user)"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaBangladeshiTakaSign
            color="#626973"
            size={15}
          ></FaBangladeshiTakaSign>
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
          <RiKeyFill color="#626973" size={16}></RiKeyFill>
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
          className="disabled:cursor-not-allowed flex items-center px-4 w-full justify-center h-12 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
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

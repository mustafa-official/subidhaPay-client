import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import { RiKeyFill } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CashOut = () => {
  const { user } = useAuth();
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleCashOut = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const mobile = form.mobile.value;
    const amount = parseInt(form.amount.value);
    const pin = form.pin.value;
    const cashOutInfo = { mobile, amount, pin, userEmail: user?.email };
    console.log(cashOutInfo);
    try {
      const { data } = await axiosSecure.patch("/cash-out", cashOutInfo);
      if (data.data === "Cash out successful") {
        setLoading(false);
        form.reset();
        return toast.success("Cash out successful");
      } else if (data.data === "Invalid Pin") {
        setLoading(false);
        return toast.error("Invalid Pin");
      } else if (data.data === "Invalid agent account") {
        setLoading(false);
        return toast.error("Invalid agent account");
      } else if (data.data === "User not found") {
        setLoading(false);
        return toast.error("User not found");
      } else if (data.data === "Insufficient balance") {
        setLoading(false);
        return toast.error("Insufficient balance");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return toast.error("An error occurred");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleCashOut}
        className="flex justify-center items-center h-[90vh] w-[80%] lg:w-[40%] flex-col gap-3"
      >
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaPhoneAlt color="#626973" size={14}></FaPhoneAlt>
          <input
            name="mobile"
            type="number"
            required
            className="w-full"
            placeholder="Phone number (agent)"
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
            "Cash Out"
          )}
        </button>
      </form>
    </div>
  );
};

export default CashOut;

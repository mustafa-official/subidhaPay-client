import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
//  const { data } = await axiosPublic.post("/register", registerInfo);

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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

    const registerInfo = { name, email, mobile, role, pin };
    console.log(registerInfo);
    try {
      const { data } = await axiosPublic.post("/register", registerInfo);
      if (data.data === "register successful") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("identifier", email);
        toast.success("Registration Successful");
        navigate("/dashboard");
      } else {
        toast.error("Registration Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              name="mobile"
              type="number"
              placeholder="Phone"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <select
              name="role"
              className="select select-bordered w-full max-w-xs"
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-control">
            <input
              name="pin"
              type="password"
              placeholder="PIN"
              className="input input-bordered"
              required
              pattern="\d{5}"
              minLength={5}
              maxLength={5}
              title="PIN must be a 5-digit number"
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <small className="mt-1 mx-auto">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

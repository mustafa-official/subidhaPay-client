import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.identifier.value;
    const pin = form.pin.value;

    // Validate the PIN
    if (!/^\d{5}$/.test(pin)) {
      toast.error("PIN must be a 5-digit number");
      return;
    }
    const loginInfo = { identifier, pin };

    try {
      const { data } = await axiosPublic.post("/login", loginInfo);
      if (data.data === "match") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("identifier", identifier);
        const userData = await fetchUserData(identifier, data.token); // Fetch user data
        setUser(userData); // Set user data in state
        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        toast.error(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <input
              type="text"
              name="identifier"
              placeholder="Email or Mobile Number"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              name="pin"
              type="password"
              placeholder="PIN"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <small className="mt-1 mx-auto">
              New user?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

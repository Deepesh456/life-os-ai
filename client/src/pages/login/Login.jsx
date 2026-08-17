import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      // Save authentication token
      localStorage.setItem("token", res.data.token);

      // Save logged-in user information
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      alert("Login Successful!");

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg mb-6"
        onChange={handleChange}
      />

      <button
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
      >
        Login
      </button>

      <p className="text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-purple-600 font-semibold hover:underline"
        >
          Register
        </button>
      </p>

      </form>
    </div>
  );
};

export default Login;
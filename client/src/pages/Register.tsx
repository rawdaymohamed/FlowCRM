// pages/Register.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      dispatch(login(data.token));
      navigate("/dashboard");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} />
      <input
        name="username"
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        onChange={handleChange}
      />
      <input name="password"
        type="password"
        onChange={handleChange}
      />
      <input
        name="confirmPassword"
        type="password"
        onChange={handleChange}
      />
      <button type="submit"  >
        Register
      </button>
    </form>
  );
}

export default Register;

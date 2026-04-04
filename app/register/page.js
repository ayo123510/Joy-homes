"use client";
import { useState } from "react";
import Link from "next/link";
import supabase from "../../lib/supabaseClient";
import "../../styles/auth.css";
import "../../styles/register.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setSuccess("");
    } else {
      setSuccess("Registration successful!");
      setError("");
      // redirect after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  return (
    <div className="register-container">
      <div className="register-right">
        <div className="register-card">
          <img src="/assets/logo.png" alt="Joy Homes Logo" className="logo" />
          <h2>Create Your Account</h2>
          <form onSubmit={handleRegister}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
            <button type="submit">Register</button>
          </form>
          {error && <p style={{color:"red"}}>{error}</p>}
          {success && <p style={{color:"green"}}>{success}</p>}
          <Link href="/login" className="switch-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

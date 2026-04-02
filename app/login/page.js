"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import "../../styles/auth.css";
import "../../styles/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      // redirect or show success
      window.location.href = "/";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/assets/logo.png" alt="Joy Homes Logo" className="logo" />
        <h2>Login to Joy Homes</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{color:"red"}}>{error}</p>}
        <Link href="/register" className="switch-link">
          Don’t have an account? Register
        </Link>
      </div>
    </div>
  );
}

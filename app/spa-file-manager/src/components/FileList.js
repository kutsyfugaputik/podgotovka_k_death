import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      navigate("/files");
    } catch (error) {
      alert("Ошибка входа: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Вход</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Войти
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7fafc",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

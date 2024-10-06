import { auth } from "./Firebase";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInwithGoogle from "./SignInWithGoogle";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.header}>Login</h3>

        <div className="mb-3">
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <div className="d-grid" style={{ textAlign: "center" }}>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </div>

        <p className="forgot-password" style={styles.textCenter}>
          New user? <a href="/register" style={styles.link}>Register Here</a>
        </p>
        <SignInwithGoogle />
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#167bff",
    fontSize: "24px",
    fontWeight: "bold",
  },
  label: {
    fontSize: "14px",
    color: "#495057",
    marginBottom: "8px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    width: "100%",
    marginBottom: "16px",
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#167bff",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  textCenter: {
    textAlign: "center",
    marginTop: "16px",
  },
  link: {
    color: "#167bff",
    textDecoration: "none",
  },
};

export default Login;

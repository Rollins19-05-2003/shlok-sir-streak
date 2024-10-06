import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h3 style={styles.header}>Sign Up</h3>

        <div className="mb-3">
          <label style={styles.label}>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
            style={styles.input}
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div className="d-grid" style={{ textAlign: "center" }}>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </div>

        <p className="forgot-password" style={styles.textCenter}>
          Already registered? <a href="/login" style={styles.link}>Login</a>
        </p>
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

export default Register;

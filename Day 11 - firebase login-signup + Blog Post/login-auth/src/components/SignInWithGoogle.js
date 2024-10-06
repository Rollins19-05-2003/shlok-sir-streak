import { toast } from "react-toastify";
import { auth, db } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignInwithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          firstName: user.displayName,
          email: user.email,
          photo: user.photoURL,
          lastName: "",
        });
        
        toast.success("User logged in Successfully", {
          position: "top-center",
        });

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      toast.error("Error logging in with Google", {
        position: "bottom-center",
      });
    }
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../google.png")} width={"80%"} alt="Google Sign-In" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;

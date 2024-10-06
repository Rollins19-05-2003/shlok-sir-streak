import Blog from "./Blog";
import { toast } from "react-toastify";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      toast.success("User logged out successfully!", {
        position: "top-center",
      });
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      {userDetails ? (
        <>
          <div style={styles.profileHeader}>
            {/* User Icon at top right corner */}
            <div style={styles.userIconContainer} onClick={toggleDropdown}>
              <img
                src={userDetails.photo || "https://via.placeholder.com/50"}
                alt="User Icon"
                style={styles.userIcon}
              />
            </div>

            {/* Dropdown to show user details and logout button */}
            {showDropdown && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownContent}>
                  <p><strong>{userDetails.firstName} {userDetails.lastName}</strong></p>
                  <p>{userDetails.email}</p>
                  <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div style={styles.welcomeText}>
            <h3>Welcome {userDetails.firstName} 🙏</h3>
          </div>

          {/* Blog Component */}
          <div>
            <Blog />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    width:"100%",
    position: "relative",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px",
  },
  userIconContainer: {
    cursor: "pointer",
  },
  userIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  dropdown: {
    position: "absolute",
    top: "60px",
    right: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "250px",
    zIndex: 1000,
  },
  dropdownContent: {
    padding: "20px",
    textAlign: "center",
  },
  logoutButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#167bff",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default Profile;

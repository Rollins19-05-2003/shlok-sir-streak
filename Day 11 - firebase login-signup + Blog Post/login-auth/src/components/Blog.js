import React, { useState, useEffect } from "react";
import { auth, db } from "./Firebase"; // assuming you have already configured firebase
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);

  // Fetch the blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(
        collection(db, "Blogs"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userBlogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(userBlogs);
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!title || !content) {
      toast.error("Both title and content are required!", {
        position: "top-center",
      });
      return;
    }

    try {
      const newBlog = {
        title,
        content,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "Blogs"), newBlog);

      // Add the new blog to the state
      setBlogs((prevBlogs) => [...prevBlogs, { ...newBlog, id: docRef.id }]);
      toast.success("Blog post created successfully!", { position: "top-center" });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding blog: ", error);
      toast.error("Failed to create blog post!", { position: "bottom-center" });
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteDoc(doc(db, "Blogs", blogId));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      toast.success("Blog post deleted successfully!", { position: "top-center" });
    } catch (error) {
      console.error("Error deleting blog: ", error);
      toast.error("Failed to delete blog post!", { position: "bottom-center" });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create a Blog Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="mb-3">
          <label style={styles.label}>Blog Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Blog Content</label>
          <textarea
            className="form-control"
            placeholder="Enter blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <h3 style={styles.blogHeader}>Your Blogs</h3>
      
      {/* Blog Posts Section */}
      <div style={styles.blogContainer}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} style={styles.blogItem}>
              <div style={styles.blogContent}>
                <h4>{blog.title}</h4>
                <p>{blog.content}</p>
              </div>
              <button
                onClick={() => handleDelete(blog.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No blogs created yet!</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#167bff",
  },
  form: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "14px",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "150px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
  button: {
    padding: "10px",
    backgroundColor: "#167bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  blogHeader: {
    marginTop: "30px",
    textAlign: "center",
    color: "#167bff",
  },
  blogContainer: {
    width: "100%",  // Occupy full width of the screen
    marginTop: "20px",
  },
  blogItem: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",  // Stack items vertically
    alignItems: "flex-start",  // Align items to the left
  },
  blogContent: {
    maxWidth: "100%",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px", // Space between content and button
  },
};

export default Blog;

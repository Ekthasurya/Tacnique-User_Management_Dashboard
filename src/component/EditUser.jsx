import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/EditUser.css"


const EditUser = () => {
    const { userId } = useParams(); // Retrieve userId from the URL
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const data = response.data;
            setUser({
                firstName: data.name.split(" ")[0],
                lastName: data.name.split(" ")[1] || "",
                email: data.email,
                department: data.company?.name || "Unknown",
            });
        } catch (err) {
            setError("Failed to fetch user details.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // You can use PUT request or simply update the state here for now
            await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, user);
            navigate("/"); // Navigate to the user management page after saving
            alert("User edited successfully!");
        } catch (err) {
            setError("Failed to update user details.");
        }
    };

    return (
        <div className="edit-user">
            <h1>Edit User</h1>
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        name="department"
                        value={user.department}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>

            <button onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};

export default EditUser;

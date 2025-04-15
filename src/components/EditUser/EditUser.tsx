import React, { useState } from "react";
import { User } from "../../types";
import styles from "./EditUser.module.css";

interface Props {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onCancel: () => void;
}

const EditUser: React.FC<Props> = ({ user, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState<User>({ ...user, _id: user._id });
        console.log("Initial formData:", formData);

    
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value, // Actualitza només el camp corresponent
        _id: prevFormData._id, // Assegura't que `_id` es manté
    }));
};


   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validació bàsica
    if (!formData.name || !formData.email || formData.age <= 0) {
        alert("Name, email, and age are required!");
        return;
    }

    try {
        console.log("Submitting formData:", formData); // Comprova que `formData` conté `_id`
        // Aquí fem la crida a l'API per actualitzar l'usuari
        const response = await fetch(`http://localhost:9000/api/users/${formData._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                age: formData.age,
                email: formData.email,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        const updatedUser = await response.json();
        onUpdate(updatedUser); // Crida a `onUpdate` per actualitzar l'usuari i tancar el formulari
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user. Please try again.");
    }
};


    return (
        <div className={styles.editUser}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <div className={styles.buttons}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
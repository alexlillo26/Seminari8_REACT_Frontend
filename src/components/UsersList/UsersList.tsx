import React, { useState } from "react";
import { User } from '../../types';
import styles from './UsersList.module.css'; // Import CSS module
import EditUser from '../EditUser/EditUser'; // Adjusted the path to match the correct module location

interface Props {
    users: User[];
    onUpdateUser: (updatedUser: User) => void; // Afegim la funció per actualitzar l'usuari
    onRefreshUsers: () => void; // Afegim la funció per refrescar la llista d'usuaris
}

const UsersList: React.FC<Props> = ({ users, onUpdateUser, onRefreshUsers }) => {
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditClick = (user: User): void => {
        console.log("User being edited:", user); // Comprova que l'usuari conté l'`id`
        setEditingUser(user);
    };

    const handleUpdate = (updatedUser: User): void => {
        onUpdateUser(updatedUser);
        handleCancel(); // Tanquem el formulari d'edició
        onRefreshUsers(); // Refresquem la llista d'usuaris
    };

    const handleCancel = (): void => {
        setEditingUser(null); // Cancel·lem l'edició
    };

        const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li key={user._id} className={styles.listItem}> {/* Canviem user.name per user._id */}
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                </div>
                <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(user)}
                >
                    Edit
                </button>
            </li>
        ));
    };

    return (
        <div>
            {editingUser ? (
                <EditUser
                    user={editingUser}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingUser(null)}
                    
                />
            ) : (
                <ul className={styles.list}>
                    {renderList()}
                </ul>
            )}
        </div>
    );
};

export default UsersList;


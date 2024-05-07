import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { getUsers, deleteUser } from "../components/service/Api.js"
import { Link } from "react-router-dom";
import styles from '../components/service/ViewUser.module.css'; // Import the CSS module

const ViewUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersDetails();
    }, []);

    const getUsersDetails = async () => {
        let response = await getUsers();
        console.log(response);
        setUsers(response.data);
    };

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getUsersDetails();
    };

    return (
        <div className={styles.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.headerCell}>Id</TableCell>
                        <TableCell className={styles.headerCell}>Name</TableCell>
                        <TableCell className={styles.headerCell}>Email</TableCell>
                        <TableCell className={styles.headerCell}>Phno</TableCell>
                        <TableCell className={styles.headerCell}>Password</TableCell>
                        <TableCell className={styles.headerCell}>TYPE</TableCell>
                        <TableCell className={styles.headerCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className={styles.rowCell}>{user.id}</TableCell>
                            <TableCell className={styles.rowCell}>{user.name}</TableCell>
                            <TableCell className={styles.rowCell}>{user.email}</TableCell>
                            <TableCell className={styles.rowCell}>{user.phno}</TableCell>
                            <TableCell className={styles.rowCell}>{user.password}</TableCell>
                            <TableCell className={styles.rowCell}>{user.type}</TableCell>
                            
                            <TableCell className={styles.buttonGroup}>
                                <Button className={styles.editButton} component={Link} to={`/edit/${user.id}`}>Edit</Button>
                                <Button className={styles.deleteButton} onClick={() => deleteUserData(user.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ViewUser;
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getUsers, deleteUser } from "../components/service/Api.js";
import { Link } from "react-router-dom";
import styles from '../components/service/ViewUser.module.css'; // Import the CSS module

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        getUsersDetails();
    }, []);

    const getUsersDetails = async () => {
        setLoading(true);
        try {
            let response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setSelectedUserId(id);
        setOpenDialog(true);
    };

    const confirmDeleteUser = async () => {
        try {
            await deleteUser(selectedUserId);
            getUsersDetails(); // Refresh the user list
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setOpenDialog(false);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedUserId(null);
    };

    return (
        <div className={styles.tableContainer}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.headerCell}>Id</TableCell>
                            <TableCell className={styles.headerCell}>Name</TableCell>
                            <TableCell className={styles.headerCell}>Email</TableCell>
                            <TableCell className={styles.headerCell}>Phno</TableCell>
                            <TableCell className={styles.headerCell}>Password</TableCell>
                            <TableCell className={styles.headerCell}>Type</TableCell>
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
                                    <Button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Dialog
                open={openDialog}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={confirmDeleteUser} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewUser;

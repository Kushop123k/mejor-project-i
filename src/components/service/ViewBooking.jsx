import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getBookings, cancelBooking } from "../service/Api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from '../ViewHotel.module.css'; // Import the CSS module

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const getBookingDetails = async () => {
        setLoading(true);
        try {
            let response = await getBookings();
            const username = localStorage.getItem("userName");
            setBookings(response.data.filter((item) => item.userName === username));
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookingDetails();
    }, []);

    const handleCancel = (bookingId) => {
        setSelectedBookingId(bookingId);
        setOpenDialog(true);
    };

    const confirmCancelBooking = async () => {
        try {
            const booking = bookings.find((item) => item.id === selectedBookingId);
            await cancelBooking(booking);
            getBookingDetails(); // Refresh the booking list
            setOpenDialog(false);
            navigate('/home'); // Redirect to the home page after cancelling
        } catch (error) {
            console.error("Error cancelling booking:", error);
        } finally {
            setSelectedBookingId(null);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedBookingId(null);
    };

    return (
        <div className={styles.tableContainer}>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {bookings.length === 0 ? (
                        <p>No bookings done yet.</p>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={styles.headerCell}>Serial no.</TableCell>
                                    <TableCell className={styles.headerCell}>Hotel ID</TableCell>
                                    <TableCell className={styles.headerCell}>Hotel Name</TableCell>
                                    <TableCell className={styles.headerCell}>User</TableCell>
                                    <TableCell className={styles.headerCell}>Rooms</TableCell>
                                    <TableCell className={styles.headerCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.map((booking, index) => (
                                    <TableRow key={booking.id}>
                                        <TableCell className={styles.rowCell}>{index + 1}</TableCell>
                                        <TableCell className={styles.rowCell}>{booking.hotelId}</TableCell>
                                        <TableCell className={styles.rowCell}>{booking.hotelName}</TableCell>
                                        <TableCell className={styles.rowCell}>{booking.userName}</TableCell>
                                        <TableCell className={styles.rowCell}>{booking.rooms}</TableCell>
                                        <TableCell className={styles.buttonGroup}>
                                            <Button
                                                className={styles.cancelButton}
                                                onClick={() => handleCancel(booking.id)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </>
            )}
            <Dialog
                open={openDialog}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Cancellation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this booking?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={confirmCancelBooking} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewBooking;

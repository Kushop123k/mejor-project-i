import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getBookings, cancelBooking } from "../components/service/Api.js";
import styles from '../components/ViewHotel.module.css'; // Import the CSS module

const ViewHotel = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
        getBookingDetails();
    }, []);

    const getBookingDetails = async () => {
        setLoading(true);
        try {
            let response = await getBookings();
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (bookingId) => {
        setSelectedBookingId(bookingId);
        setOpenDialog(true);
    };

    const confirmCancelBooking = async () => {
        try {
            const booking=bookings.find(item=>item.id===selectedBookingId)
            await cancelBooking(booking);
            getBookingDetails(); // Refresh the booking list
        } catch (error) {
            console.error("Error cancelling booking:", error);
        } finally {
            setOpenDialog(false);
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

export default ViewHotel;

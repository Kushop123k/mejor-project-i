import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { getBookings, cancelBooking } from "../components/service/Api.js";
import styles from '../components/ViewHotel.module.css'; // Import the CSS module

const ViewHotel = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getBookingDetails();
    }, []);

    const getBookingDetails = async () => {
        try {
            let response = await getBookings();
            const username = localStorage.getItem("userName");
            console.log(response);
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const cancelBookingData = async (bookingId) => {
        try {
            console.log("Cancelling booking:", bookingId);
            await cancelBooking(bookingId);
            getBookingDetails(); // Refresh the booking list
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    return (
        <div className={styles.tableContainer}>
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
                                <Button className={styles.cancelButton} onClick={() => cancelBookingData(booking.id)}>Cancel</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ViewHotel;

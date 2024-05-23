import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { getBookings, cancelBooking } from "../service/Api";
import styles from '../ViewHotel.module.css'; // Import the CSS module

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);; // Assuming the token is stored in localStorage

    useEffect(() => {
        getBookingDetails();
    }, []);

    const getBookingDetails = async () => {
        let response = await getBookings();
        const username=localStorage.getItem("userName")
        console.log(response);
        setBookings(response.data.filter((item)=>item.userName===username));
    };

    const cancelBookingData = async (body) => {
        console.log(body)
        await cancelBooking({
            hotelId : 63,
            hotelName : "hi kamon a60",
            id: 3,
            rooms: 1,
            userName :"kushalnormal"
        });
        getBookingDetails();
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
                    {bookings.map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell className={styles.rowCell}>{booking.id}</TableCell>
                            <TableCell className={styles.rowCell}>{booking.hotelId}</TableCell>
                            <TableCell className={styles.rowCell}>{booking.hotelName}</TableCell>
                            <TableCell className={styles.rowCell}>{booking.userName}</TableCell>
                            <TableCell className={styles.rowCell}>{booking.rooms}</TableCell>
                            <TableCell className={styles.buttonGroup}>
                                <Button className={styles.cancelButton} onClick={() => cancelBookingData(booking)}>Cancel</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ViewBooking;

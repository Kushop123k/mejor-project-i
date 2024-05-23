import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { getHotels, cancelBooking, getBookings } from "../components/service/Api.js";
import styles from '../components/ViewHotel.module.css'; // Import the CSS module

const ViewHotel = () => {
    const [bookings, setBookings] = useState([])

  
    useEffect(() => {
        getBookingDetails();
    }, []);

    const getBookingDetails = async () => {
        let response = await getBookings();
        const username=localStorage.getItem("userName")
        console.log(response);
        setBookings(response.data);
    };

    const cancelBookingData = async (body) => {
        console.log(body)
        await cancelBooking(body);
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
export default ViewHotel;

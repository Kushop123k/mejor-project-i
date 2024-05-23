import { useEffect, useState } from 'react';
import useRazorpay from "react-razorpay";
import './payment.css'
import { useLocation } from 'react-router-dom';
import {  addbooking, getUser } from '../components/service/Api';
export default function Payment() {
  const location = useLocation();
  const [Razorpay] = useRazorpay();
  useEffect(() => {
    console.log(location.state)
  })
  async function addBooking(body) {
    try {
      console.log("adding booking")
      const booking = await addbooking(body)
      console.log("done booking")
    } catch (error) {
      console.log("error booking")
    }
  }
  const PaymentHandler = async (event) => {
    const amount = location.state.prize
    const currency = 'INR';
    const receiptId = location.state.hotelId.toString();

    try {

      const response = await fetch('http://localhost:4080/order', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId
        })
      })

      const order = await response.json();
      console.log({order})
      const { data: user } = await getUser(localStorage.getItem('userId'))
      console.log({user})
      var option = {

        key: order.id,
        amount,
        currency,
        name: location.state.hotelName,
        description: "Test Transaction",
        image: "https://unsplash.com/photos/lvWw_G8tKsk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cGF5bWVudHxlbnwwfHx8fDE3MTQyNzAyMzN8MA&force=true&w=640",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response, }
          const validateResponse = await fetch("http://localhost:4080/validate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })

          const jsonResponse = await validateResponse.json();
          console.log('jsonResponse', jsonResponse);

        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user.phno
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      }

      var rzpl = new Razorpay(option);
      rzpl.on("payment failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);

      })
      rzpl.on('order.paid', async () => {
        console.log("done")
        try {
          await addBooking({
            hotelId: location.state.hotelId,
            userName: user.name,
            hotelName: location.state.hotelName,
            rooms: location.state.rooms
          })
        } catch (error) {
          console.log(error)
        }
      })
      rzpl.open();
      event.preventDefault();
      addBooking({
        hotelId: location.state.hotelId,
        userName: user.name,
        hotelName: location.state.hotelName,
        rooms: location.state.rooms
      })
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <>
      {/* <div className='product'>
      <h1>Payment Gateway</h1>
      <button className='button' onClick={PaymentHandler}>Pay now</button>

    </div> */}
      <div className="container">
        <div className="image-container">
          <img src="https://unsplash.com/photos/HNPrWOH2Z8U/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cGF5bWVudHxlbnwwfHx8fDE3MTQyNzAyMzN8MA&force=true&w=640" alt="Hotel Image" />
        </div>
        <div className="payment-options">
          <h2>Please choose your payment method</h2>
          <button className="payment-option" onClick={() => alert('Your Booking is confirmed')}>Pay at Hotel</button>

          <h2>or</h2>
          <button className="payment-option" onClick={PaymentHandler}>Pay Now</button>
        </div>
      </div>
    </>
  )
}

import { useState } from 'react';

import './App.css'

function App() {

  const PaymentHandler = async (event) =>{

    const amount =500000;
    const currency = 'INR';
    const receiptId= '1234567890';

    const response = await fetch('http://localhost:4080/order',{
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
    console.log('order',order);


    var option = {
      key:"",
      amount,
      currency,
      name:"Hotel Bookings",
      description: "Test Transaction",
      image:"https://unsplash.com/photos/lvWw_G8tKsk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cGF5bWVudHxlbnwwfHx8fDE3MTQyNzAyMzN8MA&force=true&w=640",
      order_id:order.id,
      handler: async function(response){
          const body = {...response,}
          const validateResponse = await fetch("http://localhost:4080/validate",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })

            const jsonResponse = await validateResponse.json();
            console.log('jsonResponse',jsonResponse);

      },
      prefill:{
        name:"Arnab Mondal",
        email:"abc@example.com",
        contact:"7044487853"
      },
      notes:{
        address:"Razorpay Corporate office",
      },
      theme:{
        color:"#3399cc",
      },
    }

    var rzpl = new Razorpay(option);
    rzpl.on("payment failed", function(response){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);

    })

    rzpl.open();
    event.preventDefault();

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

export default App

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

require("dotenv").config();
 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cors());


app.get("/",(req, res) =>{
    res.send("Server is Running ");
})

app.post("/order", async (req, res) =>{
    try {
        const razorpay = new Razorpay({
            key_id: process.env.KEY_ID,
key_secret: process.env.KEY_SECRET    
        });
        
        if(!req.body){
            return res.status(400).send("BAD REQUEST");
        }
        const options = req.body;
        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(400).send("Bad Request");
        }
        res.json(order);

    } catch (error) {
        console.log(error); 
        res.status(500).send(error)
    }
})


app.post("/validate", async (req, res)=>{
    const {razorpay_order_id,razorpay_payment_id, razorpay_signature }= req.body 

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    try {
        
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");
        if (digest !== razorpay_signature){
            return res.status(400).json({msg: "Transaction is not LEgit!!"});
        }
        res.json({msg:"Trasaction is Legit",orderId: razorpay_order_id,paymentId:razorpay_payment_id});
    } catch (error) {
     console.log(error)   
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
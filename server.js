const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

server.listen(process.env.PORT || 3030);

var nodemailrer = require('nodemailer');

const transporter = nodemailrer.createTransport({
    port:465,
    host:"smpt.gmail.com",
    auth:{
        user:'anitaishu2018@gmail.com',
        pass:'pvdzrptiuyyiszht'
    },
    secure:true,

})

app.post("/send-mail",(req,res)=>{
    const to = req.body.to;
    const name = req.body.name;
    const amount = req.body.amount;
    const date = req.body.date;
    const mailData={
        from:"anitaishu2018@gmail.com",
        to:to,
        subject:"Your payment is due!",
        html: ` <p>
        Hello ${name},
    </p>
    <p>
        This is a reminder email that your payment of amount - ${amount} is due on date - ${date}
    </p>
    <p>
        Kindly make the payment before the due date to avoid any inconvenience.
    </p>
    <p>
        Thanks and Regards,
    </p>`
};
transporter.sendMail(mailData,(error,info)=>{
    if (error){
        return console.log(error);
    }
    res.status(200).send({message:"Invitation sent",message_id: info.messageId});

});
        
})


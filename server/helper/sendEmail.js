
// i made it only for dummy purpose

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure: false ,
    auth :{
        user: "harshalmahadeonagpure@gmail.com",  // using friend gmail here 
        pass: ""
    }

})

//send email
export const sendEmail = async (to , body , subject)=>{

    const mail = await transporter.sendMail({
        from: `Ganesh <harshalmahadeonagpure@gmail.com>`,
        to : `${to}`,
        subject: `${subject}`,
        html: `${body}`
    })
    console.log(mail , "mail")

  return mail
}
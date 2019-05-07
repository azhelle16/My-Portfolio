var express = require ("express");
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
var app = express();

//PORT Flexibility Declaration
var port = process.env.PORT || 3000

//Initialize Express
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

//initialize email config


app.get("/",function(req,res) {
	var o = {page:"main"}
	res.render("pages/index",o)
})

app.get("/about",function(req,res) {
	var o = {page:"about"}
	res.render("pages/index",o)
})

app.get("/portfolio",function(req,res) {
	var o = {page:"portfolio"}
	res.render("pages/index",o)
})

app.get("/contact",function(req,res) {
	var o = {page:"contact"}
	res.render("pages/index",o)
})

app.get("/resume",function(req,res) {
	var o = {page:"resume"}
	res.render("pages/index",o)
})

app.post("/send", async function(req,res) {

	var fname = req.body.name
	var email = req.body.email
	var msg = req.body.message

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount();

  	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
	    host: "smtp.gmail.com",
	    port: 465,
	    secure: true, // true for 465, false for other ports
	    auth: {
	      user: "mlsumulong.myportfolio@gmail.com",
	      pass: "eizhy1624!" // 
	    }
	});

	// send mail to visitor
	let info = await transporter.sendMail({
	    from: 'mlsumulong.myportfolio@gmail.com', // sender address
	    to: email, // list of receivers
	    subject: "Thank You For The Visit 🤝!!! ", // Subject line
	    // text: "Hello world?", // plain text body
	    html: `
	    		<p>Hi ${fname},</p>
	    		<p>Thank you for your time in visiting my website. I will get back to you within the next 24-72 hours if you have any questions.</p>
	    		<p>Regards,</p>
	    		<p>Maricel</p>
	    	  `
	});

	let info2 = await transporter.sendMail({
	    from: email, // sender address
	    to: 'mlsumulong.myportfolio@gmail.com', // list of receivers
	    subject: "Message From "+fname, // Subject line
	    // text: "Hello world?", // plain text body
	    html: `
	    		<p>Hi Maricel,</p>
	    		<p>${msg}</p>
	    		<p>Contact E-mail: ${email}</p>
	    		<p>Regards,</p>
	    		<p>${fname}</p>
	    	  `
	});

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  if (info.messageId && info2.messageId)
  	res.send("1")
  else
  	res.send("0")
  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

})

//Listening to port
app.listen(port, function() {
  console.log("App running on port "+port+"!");
});
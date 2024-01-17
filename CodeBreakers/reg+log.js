import express from "express";
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import axios from 'axios';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const app = express();
const port = 3000;
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//data base connect
var conString = process.env.dbPassword;
var db = new pg.Client(conString);
db.connect();
const apiKey = process.env.apiKey; 
app.get("/", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM reviews WHERE stars >= 4 ");
        const data = response.rows;
        res.render("homepage.ejs", { data });  
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data");
    }
});


// reviews page
app.post('/reviews', async (req, res) => {
    try {
      // Insert reviews into PostgreSQL database  
      await db.query("INSERT INTO reviews (name_of_student, review, stars) VALUES ($1, $2, $3)", [req.body.name, req.body.message,  JSON.parse(req.body.rating)]); 
      res.redirect('/');
    } catch (err) {
      console.error('Error submitting review:', err);
      res.status(500).send('Error submitting review');
    }
  });
    //registration
    app.get("/register" , (req,res) => {
        //render registration page 
        res.render('registration.ejs',{
            apiKey : apiKey,
        });
        });
    var amount,student_name, grade, rollnum,parent_guardian_name,contact_phone,contact_email,school_name,address,password,route_id,coordaddress;
    app.post('/register-submit',async(req,res)=>{
             student_name = req.body.fname;
             grade = req.body.grade;
             rollnum = req.body.rollnum;
             parent_guardian_name = req.body.parentname;
             contact_phone = req.body.phonenum;
             contact_email = req.body.emailadd;
             school_name = req.body.schoolname;
             address = req.body.location;
             const pass = req.body.password;
            
        //hashing the password befor storing 
         password = await bcrypt.hash(pass,13);
        //convert into coordinates
        const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: address,
                        key: apiKey
                    }
                });
                // Extract latitude and longitude from the geocoding response
                const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
                 coordaddress = [lat+","+lng];
                 console.log(coordaddress);
            //*PENDING**use these coordinates to calculate which path is best for student and then add these coordinates to  respective route waypoint
            //ngrok link from harsh server
            var respons;
            try{
                  respons = await axios.post("http://rasengan343.pythonanywhere.com/",{
                    lat : `${lat}`,
                    lng : `${lng}`,
                    schoolName: school_name
               });
               console.log(respons.data);
            }

            catch(err){
                console.log(err)
            }
           
           //respons.data gives route_id in future also price
           const harsh_Response = respons.data;
             route_id = harsh_Response.route_id;
             amount = harsh_Response.amount;
            const busRouteResponse = await db.query("SELECT * from busroutes WHERE route_id =$1",[route_id]);
            const busRouteResult = busRouteResponse.rows[0];
            const origin = busRouteResult.origin;
            const destination = busRouteResult.destination;
            const waypointss = busRouteResult.waypoints;
            const waypoints = [];
            //converting it into correct format
            for(var j=0;j<waypointss.length;j++){
                const w = waypointss[j].split(',');
                    waypoints.push({
                    lat : w[0],
                    lng : w[1]
                    });
            }
            waypoints.push({
              lat : lat,
              lng : lng
            })


            const start = {
                lat: parseFloat(origin.split(",")[0]),
                lng: parseFloat(origin.split(",")[1])
                };
                const end = {
                lat: parseFloat(destination.split(",")[0]),
                lng: parseFloat(destination.split(",")[1])
                };
                res.render('payment.ejs',{
                  amount : amount,
                  start : start,
                  end : end,
                  waypoints : waypoints,
                  apiKey : apiKey
                })               
});
                app.post('/create_order', (req, res) => {
                    
                    const razorpay = new Razorpay({
                    key_id: 'rzp_test_IXvYV0XJbAopd8',
                    key_secret: process.env.razorpay_key_secret,
                    });
                
                    const options = {
                    amount: amount*100,
                    currency: 'INR',
                    receipt: 'receipt#1',
                    payment_capture: 1,

                    };
                
                    razorpay.orders.create(options, async(err, order) => {
                    if (err) {
                        console.log("error has occured");
                        res.status(500).json({ error: err.message });
                    } else {
                       res.json(order);
                    }
                    });
                });

                app.post('/webhook', async(req, res) => {
                    const secret = process.env.webhook_secret;
                  
                    const shasum = crypto.createHmac('sha256', secret);
                    shasum.update(JSON.stringify(req.body));
                    const digest = shasum.digest('hex');
                  
                    if (digest === req.headers['x-razorpay-signature']) {
                      // Signature verification successful
                      const paymentId = req.body.payload.payment.entity.id;
                      const paymentStatus = req.body.payload.payment.entity.status;
                  
                      if (paymentStatus === 'captured') {
                        
                        //successfull then proceed
                        try{
                         await db.query('UPDATE busroutes SET "waypoints" = "waypoints" || $1 WHERE "route_id" = $2',[coordaddress, route_id]);
                            const response = await db.query("SELECT school_id FROM schools where school_name = $1",[school_name]);
                            await db.query("INSERT INTO students (student_name,school_id,grade,parent_guardian_name,contact_phone,contact_email,verified,password,address,rollno,coordinates,route_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",[student_name,response.rows[0].school_id,grade,parent_guardian_name,contact_phone,contact_email,'FALSE',password,address,rollnum,coordaddress,route_id]);
                            const student_id = await db.query('SELECT student_id FROM students WHERE contact_email = $1',[contact_email]);
                            var date = new Date();
                            var real_date = date.toISOString().split('T')[0];
                            await db.query('INSERT INTO busreservations (student_id,reservation_date,amount,payment_id) values($1,$2,$3,$4)',[student_id.rows[0].student_id,real_date,amount,paymentId]);
                        }
                          catch(err){
                            console.log(err.message);
                            res.render('registration.ejs',{
                                error : "Email already exists",
                            })
                          }
                            console.log(`Payment successful for payment ID: ${paymentId}`);
                         }
                    } else {
                      res.status(400).json({ status: 'signature verification failed' });
                    }
                  });

       //login
        app.get("/login",async (req,res)=>{
        res.render("login.ejs");
        });
        app.post('/login',async (req,res)=>{
        const email = req.body.email;
        const pass = req.body.password;
        const type = req.body.type;
        //student
        if(type === 'student'){
                try{
                        const response = await db.query("SELECT * FROM students WHERE contact_email = $1",[email]);
                        const passCheck = await bcrypt.compare(pass,response.rows[0].password);
                    const result = response.rows[0];
                        if(passCheck === true && response.rows[0].verified === true){
                        //route load from database
                        
                    const busRouteResponse = await db.query("SELECT * FROM Students s JOIN BusRoutes br ON s.route_id = br.route_id WHERE s.student_id = $1;",[result.student_id]);
                    const busRouteResult = busRouteResponse.rows[0];
                    const origin = busRouteResult.origin;
                    const destination = busRouteResult.destination;
                    const waypointss = busRouteResult.waypoints;
                    const waypoints = [];
                    //converting it into correct format
                    for(var j=0;j<waypointss.length;j++){
                        const w = waypointss[j].split(',');
                        for(var i=0;i<w.length;i++){
                            waypoints.push({
                            lat : w[0],
                            lng : w[1]
                            });
                        }
                    }
             const start = {
               lat: parseFloat(origin.split(",")[0]),
               lng: parseFloat(origin.split(",")[1])
             };
             const end = {
               lat: parseFloat(destination.split(",")[0]),
               lng: parseFloat(destination.split(",")[1])
             };

                //call for origin
                var lati = parseFloat(origin.split(',')[0]);
                var lngi = parseFloat(origin.split(',')[1]);
                //conversion of coordinates to address
                const busrouteOrigin = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lati},${lngi}&key=${apiKey}`);
               //call destination
                lati = parseFloat(destination.split(',')[0]);
               lngi = parseFloat(destination.split(',')[1]);
               //conversion of coordinates to address
               const busrouteDestination = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lati},${lngi}&key=${apiKey}`);
                var busRoute = {
                    origin : busrouteOrigin.data.results[0].formatted_address,
                    destination : busrouteDestination.data.results[0].formatted_address
                   }
            var busSchedule = await db.query("SELECT schedule_id, day_of_week, departure_time, arrival_time FROM busschedule WHERE bus_id = 1;");
            
            const school = await db.query("SELECT sc.school_id, sc.school_name, sc.address, sc.city, sc.state, sc.country, sc.postal_code, sc.contact_phone, sc.contact_email FROM Students s JOIN Schools sc ON s.school_id = sc.school_id WHERE s.student_id = $1;",[result.student_id]); 

                const schoolRes = school.rows[0]
                const school_name = schoolRes.school_name;
                const city = schoolRes.city;
                const state = schoolRes.state;
                const country = schoolRes.country;
                const postal_code = schoolRes.postal_code;
                const school_contact_email = schoolRes.contact_email;
                const school_contact_phone = schoolRes.contact_phone;


                const driver = await db.query("SELECT d.driver_id, d.driver_name, d.contact_phone, d.contact_email, d.license_number, d.license_expiry FROM busroutes br JOIN Drivers d ON br.driver_id = d.driver_id WHERE br.route_id = $1;",[result.route_id]); 
                const driverRes = driver.rows[0];
                const driver_name = driverRes.driver_name;
                const drivcontact_phone = driverRes.contact_phone;
                const drivcontact_email = driverRes.contact_email;
                const license_number = driverRes.license_number;
                const license_expiry = driverRes.license_expiry

            res.render("student_profile.ejs",{
                student_name : result.student_name,
                grade : result.grade,
                parent_guardian_name :result.parent_guardian_name,
                contact_phone: result.contact_phone,
                contact_email : result.contact_email,
                address : result.address,
                rollno : result.rollno,
                busSchedule : busSchedule.rows,
                busRoute : busRoute,

                school_name:school_name,
                city:city,
                state:state,
                country:country,
                postal_code:postal_code,
                school_contact_email:school_contact_email,
                school_contact_phone:school_contact_phone,

                driver_name : driver_name,
                drivcontact_phone: drivcontact_phone,
                drivcontact_email : drivcontact_email,
                license_number : license_number,
                license_expiry:license_expiry, 

                start : start,
                end : end,
                waypoints : waypoints,
                apiKey : apiKey
            })
        }
            else if(passCheck === true & response.rows[0].verified === false){
                res.render("not_verified.ejs")
            }
            else{
                res.render('login.ejs',{
                    error : "invalid username/password",
                });
            }
    }
    catch(err){
        console.log("error: " + err)
        res.render('login.ejs',{
            error : "invalid username/password",
        });
    }
}
//driver
        else if(type === 'driver'){
            try{
        const response =await db.query("SELECT * FROM drivers WHERE contact_email=$1",[email]);
        const data = response.rows[0];
        if(pass == data.password){
            const busRouteResponse = await db.query("SELECT * FROM BusRoutes br WHERE br.driver_id = $1;",[data.driver_id]);
                    const busRouteResult = busRouteResponse.rows[0];
                    
                    const origin = busRouteResult.origin;
                    const destination = busRouteResult.destination;
                    const waypointss = busRouteResult.waypoints;
                    const waypoints = [];
                    //converting it into correct format
                    for(var j=0;j<waypointss.length;j++){
                        const w = waypointss[j].split(',');
                        for(var i=0;i<w.length;i++){
                            waypoints.push({
                            lat : w[0],
                            lng : w[1]
                            });
                        }
                    }
             const start = {
               lat: parseFloat(origin.split(",")[0]),
               lng: parseFloat(origin.split(",")[1])
             };
             const end = {
               lat: parseFloat(destination.split(",")[0]),
               lng: parseFloat(destination.split(",")[1])
             };

                //call for origin
                var lati = parseFloat(origin.split(',')[0]);
                var lngi = parseFloat(origin.split(',')[1]);
                //conversion of coordinates to address
                const busrouteOrigin = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lati},${lngi}&key=${apiKey}`);
               //call destination
                lati = parseFloat(destination.split(',')[0]);
               lngi = parseFloat(destination.split(',')[1]);
               //conversion of coordinates to address
               const busrouteDestination = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lati},${lngi}&key=${apiKey}`);
                var busRoute = {
                    origin : busrouteOrigin.data.results[0].formatted_address,
                    destination : busrouteDestination.data.results[0].formatted_address
                   }


            var busSchedule = await db.query("SELECT schedule_id, day_of_week, departure_time, arrival_time FROM BusSchedule WHERE bus_id = 1;");
            res.render('driver_profile.ejs', {
                nameOfDriver: data.driver_name,
                contactNumber: data.contact_phone,
                contactEmail: data.contact_email,
                LicenceEmail: data.contact_email,
                ExpiryDate: data.license_expiry,
                driverId: data.driver_id,
                LicenceNum: data.license_number,
                busSchedule : busSchedule.rows,
                busRoute : busRoute,
                start : start,
                end : end,
                waypoints : waypoints,
                apiKey : apiKey
            });
        }
        else{
            res.render('login.ejs',{
                error : "invalid username/password",
            });
        }

    }
    catch(err){
        console.log(err.message)
        res.render('login.ejs',{
            error : "invalid username/password",
        });
    }
}
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    });

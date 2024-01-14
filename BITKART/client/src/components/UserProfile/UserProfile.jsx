import { useState, useEffect } from "react";
import "./UserProfile.css";
import userprofile from "./userprofile.jpg";
import axios from "axios";
import Nav from "../Home/Nav/Nav";

function UserProfile() {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({
    email: "",
    username: "",
    phno: "",
    hno: "",
    roll: "",
    year:"" ,
    branch: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `http://localhost:4000/getUser/${userId}`;
        const response = await axios.get(url);
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    };

    fetchUserData();
  }, [userId]);

  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [phno, setphnumber] = useState(0);
  const [hno, sethostelno] = useState(0);
  const [roll, setroll] = useState("");
  const [year, setyear] = useState(0);
  const [branch, setbranch] = useState("");

  // Set initial values when user data is available
  useEffect(() => {
    setemail(user.email);
    setusername(user.username);
    setphnumber(user.phno);
    sethostelno(user.hno);
    setroll(user.roll);
    setyear(user.year);
    setbranch(user.branch);
  }, [user]);

  const update = () => {
    const url = "http://localhost:4000/UserProfile";
    const data = {
      username,
      email,
      phno,
      hno,
      roll,
      year,
      branch,
      userId,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });
  };

  return (
    <>
    <Nav></Nav>
<div className="udiv">
      
      <div className="uc">
      <img src={userprofile} alt="" />
      <form action="">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
         
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          
        />
        <br />
        <label htmlFor="phno">Mob No.:</label>
        <input
          id="phno"
          type="number"
          value={phno}
          onChange={(e) => setphnumber(e.target.value)}
         
        />
        <br />
        <label htmlFor="hostel-no">Hostel No.:</label>
        <input
          type="number"
          id="hostel-no"
          min="1"
          max="13"
          value={hno}
          onChange={(e) => sethostelno(e.target.value)}
          
        />
        <br />
        <label htmlFor="roll">Roll:</label>
        <input
          id="roll"
          type="text"
          value={roll}
          onChange={(e) => setroll(e.target.value)}
          
        />
        <br />
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          name=""
          id="year"
          max={4}
          min={1}
          value={year}
          onChange={(e) => setyear(e.target.value)}
          
        />
        <br />
        <label htmlFor="branch">Branch:</label>
        <input
          type="text"
          id="branch"
          value={branch}
          onChange={(e) => setbranch(e.target.value)}
          
        />
        <br />
      </form>
      <button onClick={update}>Update Your Profile:</button>
      </div>
      
    </div>
    </>
    
  );
}

export default UserProfile;

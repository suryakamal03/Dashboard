import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setshowpassword] = useState(false);

  async function signup(e) {
    e.preventDefault();
    try{
    if (name.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0){
      const response = await fetch('https://dashboard-6ay3.onrender.com/api/auth/register',{
        method:'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify({name:name,email:email,password:password})
      })
      const data = await response.json();
      if(response.ok){
        alert('Registered Successfully');
        setname('');
        setemail('');
        setpassword('');
        setshowpassword(false);
        navigate('/Login');
      }else{
        alert(data.message)
      }
    }
  }catch(err){
    console.log(err);
  }
  }

  return (
    <form onSubmit={signup}>
      <div className="Container">
        <p>Personal Dashboard</p>
        <p>Create Account</p>

        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <label>name</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder=" "
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <div>
          <input
            type="checkbox"
            onChange={() => setshowpassword(!showPassword)}
          />
          <label className="show-password-label">Show Password</label>
        </div>

          <button className="register">Sign up</button>
          <label>
            Have an account? <Link to="/Login">Log in here</Link>
          </label>
      </div>
    </form>
  );
}

export default Register;

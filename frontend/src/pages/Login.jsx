import React,{useState} from "react";
import { Link,useNavigate } from 'react-router-dom';
import './Login.css'
function Login(){
  const navigate = useNavigate();
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('')
  const [showPassword,setshowpassword] = useState(false)
  async function signin(e){
    e.preventDefault();
    if(email.length > 0 && password.length > 0){
      const response = await fetch('http://localhost:5000/api/auth/login',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify({email:email,password:password})
      })
    const data = await response.json();
    if(response.ok){
      alert('logined successfully');
      setemail('');
      setpassword('');
      setshowpassword(false);
      localStorage.setItem('userToken', data.token);
      navigate('/dashboard');
    }else{
      console.log(data.message);
    }
    }
  }
  return(
    <form onSubmit={signin}>
      <div className="container">
        <p>Personal Dashboard</p>
        <p>Welcome Back,Login</p>
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
        <button className="login">Sign In</button>
        <label>
          Don't have an account? <Link to="/">Sign in here</Link>
        </label>
      </div>
    </form>
  )
}
export default Login
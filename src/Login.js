import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {auth} from './firebase';
import "./Login.css";

function Login() {
  const[formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(fData => ({
      ...fData,
      [name]:value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(formData.email, formData.password)
    .then(auth => {
      history.push("/map")
    }).catch(error => alert(error.message))
  }

  return (
    <div className="Login">
      <div className="Login__MapLink">
      <Link to="/map">
        <i className="fas fa-arrow-left"></i><span>Back To Map</span>
      </Link>
      </div>
      <div className="Login__Container">
        <form>
          <h2>Login To View Your Profile</h2>
          <div className="Login__ContainerFormInputGroup">
            <label htmlFor="email">Email:</label>       
            <input type="text" name="email" value={formData.email} onChange={handleChange}/>   
          </div>
          <div className="Login__ContainerFormInputGroup">
            <label htmlFor="password">Password:</label>       
            <input type="password" name="password" value={formData.password} onChange={handleChange}/>   
          </div>
          <button type="submit" onClick={handleSubmit}>Login</button>
          <Link to="/register" className="Login__ContainerFormRegisterLink">
            New User
          </Link>  
        </form>  
      </div>
    </div>
  )
}

export default Login;

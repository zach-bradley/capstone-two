import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Register.css';
import {auth, db} from './firebase';

function Register() {
  const[formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
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
    auth.createUserWithEmailAndPassword(formData.email, formData.password)
    .then((auth) => {
      console.log(auth)
      return db.collection('users').doc(auth.user.uid).set({
        displayName: formData.name
      });
    })
    .then(() => {
        history.push("/profile")
    }).catch(error => alert(error.message))
  }

  return (
    <div className="Register">
    <div className="Register__MapLink">
    <Link to="/map">
      <i class="fas fa-arrow-left"></i><span>Back To Map</span>
    </Link>
    </div>
    <div className="Register__Container">
      <form onSubmit={handleSubmit}>
        <h2>Join The Party:</h2>
        <div className="Register__ContainerFormInputGroup">
          <label htmlFor="email">Email:</label>       
          <input type="text" name="email" value={formData.email} onChange={handleChange}/>   
        </div>
        <div className="Register__ContainerFormInputGroup">
          <label htmlFor="password">Password:</label>       
          <input type="password" name="password" value={formData.password} onChange={handleChange}/>   
        </div>
        <div className="Register__ContainerFormInputGroup">
          <label htmlFor="name">Name:</label>       
          <input type="name" name="name" value={formData.name} onChange={handleChange}/>   
        </div>
        <button type="submit">Register</button> 
        <Link to="/login" className="Register__ContainerFormRegisterLink">
        Returning user
      </Link>  
      </form>  
    </div>
  </div>
  )
}

export default Register;
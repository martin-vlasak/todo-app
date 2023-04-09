import "bootstrap/dist/css/bootstrap.min.css"
import { Alert, Box, Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'

import {
  MDBContainer,
  MDBInput
} from 'mdb-react-ui-kit';
import { User } from "../model/User";
import { response } from "express";
import Dashboard from "./Dashboard";

function Login() {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[user, setUser] = useState<User>();
  const[error, setError] = useState('');

  const navigate = useNavigate();

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);

  useEffect(() => {
    setValidEmail(email.length > 0);
    setValidPassword(password.length > 0);
  }, [email, password]);

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setPassword(event.target.value)
  }

  /*function handleLogin(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
      fetch('http://localhost:8080/user/' + email, {
        method:'POST'
      })
      .then(response => {
        if (!response.ok) {
          console.log("Error");
        }
        return response.json();
      })
      .then(data => {
        setUser(data)
        if (user?.password === password)
        {
          navigate("./dashboard")
        }
        else{
          setError("Incorrect login");
        }
      })
      .catch(error => {
        setError("Incorrect login")
      });
  }*/

  function handleLogin(event: any) {
    event.preventDefault();
      fetch('http://localhost:8080/user/' + email, {
        method:'POST'
      })
      .then(response => {
        if (!response.ok) {
          console.log("Error");
        }
        return response.json();
      })
      .then(data => {
        setUser(data)
        if (user?.password == password) {
          navigate('./dashboard')
        } else {
          console.log("Error");
        }
      })
      .catch(data => {
        setUser(data)
        if (user?.password == password) {
          navigate('./dashboard')
        } else {
          console.log("Error");
        }
      });
    }

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let newDate = new Date();
  let day = days[newDate.getDay()];
  let date = newDate.getDate();
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();

  return (
    <div className='App'>
      <Card sx={{ 
        minWidth: 500, 
        minHeight: 650, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 25px #CDCDCD'
      }}>
      <CardContent>
        <h2>Hello Again!</h2>
        <Typography sx={{ fontSize: 14, marginBottom: '25px', fontWeight: '100' }} color="text.secondary" gutterBottom>
          Today is <strong>{day}, {date} {month} {year}</strong>.
          <br/>
          The best day to complete some tasks from your list!
        </Typography>
        <form onSubmit={handleLogin}>
          <Box>
            <TextField label='Email' onChange={e => setEmail(e.target.value)} />
          </Box>
          {!validEmail && loginButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Username required!</Alert>
          ) : (
            <Box sx={{marginBottom: '15px'}}></Box>
          )}
          <Box>
            <TextField label='Password' type="password" onChange={e => setPassword(e.target.value)} />
          </Box>
          {!validPassword && loginButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Password required!</Alert>
          ) : (
            <Box sx={{marginBottom: '15px'}}></Box>
          )}

          <Button type='submit' variant='contained' sx={{marginBottom: '15px', width: '225px'}}>
            Log In
          </Button>
        </form>

        <Typography sx={{margin: '15px 0'}}>
          Don't have an account?
        </Typography>

        <Link to='/register' style={{textDecoration: 'none'}}>
          <Button>Sign up</Button>
        </Link>
      </CardContent>
    </Card>
    </div>
  )

  /*return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 border border-1 border-dark rounded-3">
      <h1 className="text-center">Login</h1>
      <MDBInput wrapperClass='mb-4' label='Email address' id="emailInput" value={email} onChange={handleEmailChange}  type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' id="passwordInput" value={password} onChange={handlePasswordChange} type='password'/>

      <button className="btn btn-primary mb-4" onClick={handleLogin}>Sign in</button>

      <div className="text-center">
        <p>Not a member? <Link to="/register">Register</Link></p>
      </div>
      <strong><p className="text-center" style={{color:'red'}}>{error}</p></strong>
    </MDBContainer>
  );*/
}

export default Login;
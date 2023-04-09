import { Card, CardContent, Typography, Box, TextField, Button, Alert } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [signupButtonClicked, setSignupButtonClicked] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Validace
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  // Při každé změně username nebo password se změní useEffect
  useEffect(() => {
    setValidEmail(email.length > 0);
    setValidName(name.length > 0);
    setValidLastName(lastName.length > 0);
    setValidPassword(password.length > 0);
  }, [email, name, lastName, password]);

  function Signup(e: any) {
    e.preventDefault();
    setSignupButtonClicked(true);
    if (!validEmail || !validName || !validLastName || !validPassword) {
      return;
    }

    const signupBody = {
      email: email,
      name: name,
      lastName: lastName,
      password: password
    };

    const url='http://localhost:3306/register';

    axios.post(url, signupBody)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        setSignupError("Cannot connect!");
      });
  }

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
          <h2>Welcome!</h2>
          <Typography sx={{ fontSize: 14, marginBottom: '25px', fontWeight: '100' }} color="text.secondary" gutterBottom>
            If you haven't already, please <strong>sign up today</strong>!
          </Typography>
          <form method='post' action='register.php' onSubmit={Signup}>
            <Box>
              <TextField label='Email' value={email} id="email" onChange={e => setEmail(e.target.value)} />
            </Box>
            {!validEmail && signupButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Email required!</Alert>
            ) : (
              <Box sx={{marginBottom: '15px'}}></Box>
            )}

            <Box>
              <TextField label='First name' value={name} id="firstname" onChange={e => setName(e.target.value)} />
            </Box>
            {!validName && signupButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>First name required!</Alert>
            ) : (
              <Box sx={{marginBottom: '15px'}}></Box>
            )}

            <Box>
              <TextField label='Last name' value={lastName} id="lastname" onChange={e => setLastName(e.target.value)} />
            </Box>
            {!validLastName && signupButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Last name required!</Alert>
            ) : (
              <Box sx={{marginBottom: '15px'}}></Box>
            )}

            <Box>
              <TextField label='Password' type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Box>
            {!validPassword && signupButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Password required!</Alert>
            ) : (
              <Box sx={{marginBottom: '15px'}}></Box>
            )}

            <Button type='submit' variant='contained' sx={{marginBottom: '15px', width: '225px'}}>
              Sign up
            </Button>
          </form>

          <Typography sx={{margin: '15px 0'}}>
            Already have an account?
          </Typography>
          
          <Link to='/' style={{textDecoration: 'none'}}>
            <Button sx={{marginTop: '15px'}}>
              Log in
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;

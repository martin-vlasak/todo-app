import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import { User } from "../model/User";
import axios from "axios";
import { Alert, Box, Button, TextField, Card, CardContent, Typography } from '@mui/material';

import {
  MDBContainer,
  MDBInput
} from 'mdb-react-ui-kit';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[name, setName] = useState("");
  const[lastName, setLastName] = useState("");

  const[user, setUser] = useState<User>();

  // Validace jména a hesla
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  // Kontrola, jestli jsem kliknul na login
  const [signupButtonClicked, setSignupButtonClicked] = useState(false);

  // Uložení stringů (error messages)
  const [signupError, setSignupError] = useState('');

  // Při každé změně username nebo password se změní useEffect
  useEffect(() => {
    setValidUsername(email.length > 0);
    setValidPassword(password.length > 0);
  }, [email, password]);

  function register()
  {
    const user = {email: {email}, password: {password}, name:{name}, lastName:{lastName}};
    fetch("http://localhost:8080/user/register",
    {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
  }
  // Metoda sign up
  async function handleSignup(e: any) {
    // nechci, aby se po odeslání formuláře aktualizovala stránka
    e.preventDefault();

    fetch('http://localhost:8080/user/' + {email}, {
        method:'POST'
      })
      .then(response => {
        if (!response.ok)
        {
          register()
          console.log("User registered")
        }
        else{
          setSignupError("User already exists")
        }
      })
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
        <form onSubmit={handleSignup}>

          <Box>
            <TextField label='Email' onChange={e => setEmail(e.target.value)} />
          </Box>
          {!validUsername && signupButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Username required!</Alert>
          ) : (
            <Box sx={{marginBottom: '15px'}}></Box>
          )}

          <Box>
            <TextField label='Password' type="password" onChange={e => setPassword(e.target.value)} />
          </Box>
          {!validPassword && signupButtonClicked ? (
            <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>Password required!</Alert>
          ) : (
            <Box sx={{marginBottom: '15px'}}></Box>
          )}

          <Box sx={{marginBottom: "15px"}}>
            <TextField label='Name' onChange={e => setName(e.target.value)} />
          </Box>

          <Box sx={{marginBottom: "15px"}}>
            <TextField label='Last name' onChange={e => setLastName(e.target.value)} />
          </Box>
          
          {signupError ? (
          <Alert variant='standard' severity='error' sx={{color: '#d64242', margin: '15px 0'}}>{signupError}</Alert>
        ) : (
          <></>
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

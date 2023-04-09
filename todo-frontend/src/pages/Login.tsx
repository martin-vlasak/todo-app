import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"

import {
  MDBContainer,
  MDBInput
} from 'mdb-react-ui-kit';
import { User } from "../model/User";

function Login() {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[user, setUser] = useState<User>();
  const[error, setError] = useState("");

  const navigate = useNavigate();


  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setPassword(event.target.value)
  }

  function handleLogin(event: React.MouseEvent<HTMLElement>)
  {
    event.preventDefault();
      fetch('http://localhost:8080/user/' + email, {
        method:'POST'
      })
      .then(response => {
        if (!response.ok)
        {
          throw new Error('Incorrect login');
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
        console.log("Incorrect login")
      });
  }


  return (
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
  );
}

export default Login;
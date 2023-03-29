import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {useState} from "react"

import {
  MDBContainer,
  MDBInput
} from 'mdb-react-ui-kit';

function Login() {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[user, setUser] = useState(null);
  const[error, setError] = useState("");


  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setPassword(event.target.value)
  }


  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 border border-1 border-dark rounded-3">
      <h1 className="text-center">Login</h1>
      <MDBInput wrapperClass='mb-4' label='Email address' id="emailInput" value={email} onChange={handleEmailChange}  type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' id="passwordInput" value={password} onChange={handlePasswordChange} type='password'/>

      <button className="btn btn-primary mb-4">Sign in</button>

      <div className="text-center">
        <p>Not a member? <Link to="/register">Register</Link></p>
      </div>
      {email} {password}
    </MDBContainer>
  );
}

export default Login;

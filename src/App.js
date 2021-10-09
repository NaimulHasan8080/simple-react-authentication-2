import './App.css';
import firebaseInitialize from './Firebase/Firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from 'react';


firebaseInitialize();

const auth = getAuth();
function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('password minimum 6 digit')
      return
    }
    isLoggedIn ? oldUserSignIn(email, password) : newUserRegistetion(email, password);
  };

  const newUserRegistetion = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
        verifyEmail();
      })
      .catch(error => {
        setError(error.message)
      })

  }

  const oldUserSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })
  }
  const toggleLogin = e => {
    setIsLoggedIn(e.target.checked);
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result)
      })
  }

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit}>
        <h2 className="text-primary">{isLoggedIn ? 'Log In' : 'Register'}</h2>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" onBlur={handleEmail} className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePassword} className="form-control" id="inputPassword3" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Register
              </label>
            </div>
          </div>
        </div>


        <div className="row mb-3 text-danger">
          {error}
        </div>
        <button type="submit" className="btn btn-primary">{isLoggedIn ? 'Log in' : 'Register'}</button>
      </form>
    </div>
  );
}

export default App;

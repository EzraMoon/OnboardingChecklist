import React from 'react';
import "./login.css"

// title for the login screen
class Title extends React.Component 
{
  render() 
  {
    return (
      <div>
        <h1> Welcome to the Onboarding Checklist! </h1>
        <h2> Create and share checklists relating to onboarding new hires and interns! </h2>
        <p>** Admin accounts must use a Southern Company email **</p>
    </div>
    );
  }
}

// combined the password and username change to one function 
class LoginScreen extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      // blanks for user and password, also declaring them for the code
      email: '',
      password: '',
      code: ''
    };
  }

  // username entry
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  // password entry
  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleCodeChange = (event) => {
    this.setState({ code : event.target.value });
  }

  // click on button entry 
  handleEnterClick = () => {
    let email = this.state.email;
    let password = this.state.password;
    //console.log('server request::')
    console.log(JSON.stringify([email, password]))

    // validating frontend and backend connection
    fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials" : true,
        'Accept': 'application/json'
    },
      body: JSON.stringify([email, password]),
    }).then(response => {
      // this needs to be fixed to print out 'success: True' not 'success: False'
      return response.json()})
    .then(data => {
      console.log(data)
      if (data.id != null) {
        window.location.pathname = '/dashboard';
      } else {
        alert("Incorrect Email or Password.")
      }
    }).catch(error => console.error(error))
  }

  handleSignUp = (event) => {
    window.location.pathname = '/signup';
  }

  handleCodeEntry = (event) => {
    event.preventDefault()
    console.log(this.state.code);
    let test = window.location.href = '/list/' + this.state.code;
    console.log(test)
  }


  //printing out the title, text, and other parts of the login screen and implementing them
  render() {
    return (
      <div className="loginUI">
        <div className="title">
          <Title />
        </div>
        <form>
          <label> Email: </label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          <br />
          <br />
          <label> Password: </label>
          <input type="password" value={this.state.password} onChange={this.handlePassChange} />
        </form>
        <br />
        <button onClick={this.handleEnterClick}>Enter</button>
        <p>Not registed? <a href='/signup' onClick={this.handleSignUp}>Sign up here</a></p>
      </div>
    );
  }
}

// calling the login screen to run 
export default LoginScreen;



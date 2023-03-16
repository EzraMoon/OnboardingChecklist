import React from 'react';

// title for the login screen
class Title extends React.Component 
{
  render() 
  {
    return (
      <div>
        <h1> Welcome to the login page! </h1>
        <h2> *Must be a registered Southern Company Email Address* </h2>
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
    window.location.pathname = '/signup'
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



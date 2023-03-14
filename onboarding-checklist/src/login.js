import React from 'react';

<<<<<<< HEAD
// title for the login scree
=======
// title for the login screen
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
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
<<<<<<< HEAD
      email: '',
=======
      username: '',
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
      password: '',
    };
  }

  // username entry
<<<<<<< HEAD
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
=======
  handleUserchange = (event) => {
    this.setState({ username: event.target.value });
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
  }

  // password entry
  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  }

  // click on button entry 
  handleEnterClick = () => {
<<<<<<< HEAD
    console.log('Email: ', this.state.email);
    console.log('Password: ', this.state.password);
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
=======
    console.log('Username: ', this.state.username);
    console.log('Password: ', this.state.password);
    let username = this.state.username;
    let password = this.state.password;
    //console.log('server request::')
    console.log(JSON.stringify([username, password]))

    // validating frontend and backend connection
    fetch('http://localhost:5000/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([username, password]),
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
    }).then(response => {
      // this needs to be fixed to print out 'success: True' not 'success: False'
      return response.json()})
    .then(data => {
<<<<<<< HEAD
      console.log(data)
      if (data.id != null) {
        window.location.pathname = '/dashboard';
      } else {
        alert("Incorrect Email or Password.")
=======
      console.log(data) // Data -> {success : true or false}
      if (data.success == false) {
        alert("Incorrect Username or Password.")
        this.state.username = '' // Clears out the username and password
        this.state.password = ''
      } else { // if password is correct
        window.location.pathname = '/dashboard'
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
      }
    }).catch(error => console.error(error))
  }

<<<<<<< HEAD
  handleSignUp = (event) => {
    window.location.pathname = '/signup'
  }

=======
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc

  //printing out the title, text, and other parts of the login screen and implementing them
  render() {
    return (
      <div className="loginUI">
        <div className="title">
          <Title />
        </div>
<<<<<<< HEAD
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
=======
        <label>
          Username: 
          <input type="text" value={this.state.username} onChange={this.handleUserchange} />
        </label>
        <br />
        <label>
          Password: 
          <input type="password" value={this.state.password} onChange={this.handlePassChange} />
        </label>
        <br />
        <button onClick={this.handleEnterClick}>Enter</button>
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
      </div>
    );
  }
}

// calling the login screen to run 
export default LoginScreen;


<<<<<<< HEAD
=======

>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc

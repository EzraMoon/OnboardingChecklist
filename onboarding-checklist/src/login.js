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
      username: '',
      password: '',
    };
  }

  // username entry
  handleUserchange = (event) => {
    this.setState({ username: event.target.value });
  }

  // password entry
  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  }

  // click on button entry 
  handleEnterClick = () => {
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
    }).then(response => {
      // this needs to be fixed to print out 'success: True' not 'success: False'
      return response.json()})
    .then(data => {
      console.log(data) // Data -> {success : true or false}
      if (data.success == false) {
        alert("Incorrect Username or Password.")
        this.state.username = '' // Clears out the username and password
        this.state.password = ''
      } else { // if password is correct
        window.location.pathname = '/dashboard'
      }
    }).catch(error => console.error(error))
  }


  //printing out the title, text, and other parts of the login screen and implementing them
  render() {
    return (
      <div className="loginUI">
        <div className="title">
          <Title />
        </div>
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
      </div>
    );
  }
}

// calling the login screen to run 
export default LoginScreen;




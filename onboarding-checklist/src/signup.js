import React from 'react';



class SignUp extends React.Component {

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

  handleEnterClick = () => {
    console.log('Username: ', this.state.username);
    console.log('Password: ', this.state.password);
    let username = this.state.username;
    let password = this.state.password;
    //console.log('server request::')
    console.log(JSON.stringify([username, password]))

    // validating frontend and backend connection
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials" : true,
        'Accept': 'application/json'
    },
      body: JSON.stringify([username, password]),
    }).then(response => {
      // this needs to be fixed to print out 'success: True' not 'success: False'
      return response.json()})
    .then(data => {
      console.log(data)
      if (data.id != null) {
        console.log("Successfully signed up!")
        window.location.pathname = '/dashboard';
      } else {
        alert("Incorrect Username or Password.")
      }
    }).catch(error => console.error(error))
  }

    render() {
        return (
            <div>
                <h1>Sign Up Here!</h1>
        <form>
          <label> Username: </label>
            <input type="text" value={this.state.username} onChange={this.handleUserchange} />
            <br />
            <br />
          <label> Password: </label>
            <input type="password" value={this.state.password} onChange={this.handlePassChange} />
        </form>
        <br />
        <br />
            <button onClick={this.handleEnterClick}>Enter</button>
        </div>
        )
    }

} export default SignUp
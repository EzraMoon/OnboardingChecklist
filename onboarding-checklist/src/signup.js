import React from 'react';
import "./signup.css"


class SignUp extends React.Component {

    constructor(props) 
  {
    super(props);
    this.state = {
      // blanks for user and password, also declaring them for the code
      email: '',
      password: '',
      first: '',
      last: '',
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

  handleFirstChange = (event) => {
    this.setState({first: event.target.value});
  }

  handleLastChange = (event) => {
    this.setState({last: event.target.value})
  }

  handleEnterClick = () => {
    console.log('Email: ', this.state.email);
    console.log('Password: ', this.state.password);
    let email = this.state.email;
    let password = this.state.password;
    let first = this.state.first;
    let last = this.state.last;
    //console.log('server request::')
    console.log(JSON.stringify([email, password, first, last]))

    // validating frontend and backend connection
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials" : true,
        'Accept': 'application/json'
    },
      body: JSON.stringify([email, password, first, last]),
    }).then(response => {
      // this needs to be fixed to print out 'success: True' not 'success: False'
      return response.json()})
    .then(data => {
      console.log(data)
      if (data.id != null) {
        console.log("Successfully signed up!")
        window.location.pathname = '/login';
      } else {
        if (data.error === "Email") {
          alert("Must be a registered Southern Company Email Address");
        } else {
          alert("User already exists. Please sign in.")
        }
      }
    }).catch(error => console.error(error))
  }

  goBack = () => {
    window.history.back();
  }

    render() {
        return (
            <div>
                <img src="https://logodownload.org/wp-content/uploads/2021/12/southern-company-logo-1.png" alt="Southern Company Logo" className="logo" />
                <h1>Sign Up Here</h1>
                <p>*You must sign up with a Southern Company email*</p>
                <p>It is recommended to not use the same credentials as your Southern Company account</p>
        <form>
            <label>First Name: </label>
                <input type="text" value={this.state.first} onChange={this.handleFirstChange} />
            <label>Last Name: </label>
                <input type="text" value={this.state.last} onChange={this.handleLastChange} />
            <br />
            <br />
          <label> Email: </label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
            <br />
            <br />
          <label> Password: </label>
            <input type="password" value={this.state.password} onChange={this.handlePassChange} />
        </form>
        <br />
        <br />
            <button onClick={this.handleEnterClick}>Enter</button>
            <button onClick={this.goBack}>Go Back</button>
        </div>
        )
    }

} export default SignUp
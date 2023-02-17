import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Notes:
 * Functions and class names must be uppercase in order to compile
 * Prop names must be completely lowercase.
 * 'npm start' is the command to start
 * Right click + inspect on the site will show any warnings
 */

/**
 * Class for the title
 */
class Title extends React.Component {
  render() {
    return <h1>Welcome to the login page!</h1>; // Login title message
  }
}

/**
 * Class for user-entry data, specifically
 * for the username.
 * Need to figure out how to store this/use it in
 * the backend.
 */
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}); // changes the value of 'username'
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value); // gives user alert to let them know it works,
                                                        // will replace with back end functionality
    event.preventDefault();
  }

  render() { // deals with how this is rendered
    return (
      <form onSubmit={this.handleSubmit}> 
        <label>
          Username: 
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
      </form>
    )
  }
}
/**
 * Class for password-entry data
 * Need to connect it to backend
 * and also make more secure...
 */
class PassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A password was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Password: 
          <input type="password" value={this.state.value} onChange={this.handleChange}/>
        </label>
      </form>
    )
  }
}

/**
 * Class that renders the entire login screen
 * Will use it to organize the other classes/componenets
 * so that I can just do root.render(LoginScreen)
 */
class LoginScreen extends React.Component {
  render() {
    return (
      <div className="loginscreen">
        <div className="title">
          <Title />
        </div>
        <div className="textentry">
          <NameForm/>
        </div>
        <div className="passentry">
          <PassForm/>
        </div>
      </div>
    )
  }
}

// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginScreen />);




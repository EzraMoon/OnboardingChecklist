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
    return <h1>Welcome to the login page!</h1>;
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
      </div>
    )
  }
}

// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginScreen />);




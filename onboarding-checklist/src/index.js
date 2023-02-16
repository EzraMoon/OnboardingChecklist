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
 * Function to return Login status, should be expanded when 
 * we get it up and working
 * @param {*} props 
 * @returns 
 */
function LoginStatus(props) {
  return <p>Login status: {props.loggedin}!</p>;
}


// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Title />);

// Renders subtext and adds it to the subtext div in index.html
const subtext = ReactDOM.createRoot(document.getElementById('subtext'));
subtext.render(<LoginStatus loggedin="Successful"/>);




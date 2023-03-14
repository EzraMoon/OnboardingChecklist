import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './login.js';
import Dashboard from './dashboard.js';
import SignUp from './signup.js'
import Todo from './todo.js';
import "./index.css"

// runs the app/ login screen
class App extends React.Component {
  render() {
    let Component // Initializes a component, which we can use to load any .js component on screen
    switch(window.location.pathname) {
      case "/": // default condition, basically the homepage
        Component = LoginScreen 
        break;
      case "/dashboard": // localhost:3000/dashboard
        Component = Dashboard
        break;
      case "/login": // another way to access login page localhost:3000/login
        Component = LoginScreen
        break;
      case "/todo": // access to-do list screen 
        Component = Todo;
        break;
      default: // another default condition to appease javascript
        Component = LoginScreen
        break;
    }
    return (
      // calls the appropriate screen -> fills component with whatever screen the user has
      // indicated on the searchbar, also allows us to redirect manually using
      // window.location.pathname
      <div>
        <Component />
      </div>
    );
  }
}

// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

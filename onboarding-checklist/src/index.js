import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './login.js';
import Dashboard from './dashboard.js';
import "./index.css"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// runs the app/ login screen
class App extends React.Component {
  render() {
    let Component
    switch(window.location.pathname) {
      case "/":
        Component = LoginScreen
        break;
      case "/dashboard":
        Component = Dashboard
        break
    }
    return (
      // calls login screen
      <div>
        <Component />
      </div>
    );
  }
}

// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

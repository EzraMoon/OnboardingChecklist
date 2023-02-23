import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './login.js';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// runs the app/ login screen
class App extends React.Component {
  render() {
    return (
      // calls login screen
      <div>
        <LoginScreen/>
      </div>
    );
  }
}

// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

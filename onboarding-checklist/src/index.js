import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import LoginScreen from './login.js';
import Dashboard from './dashboard.js';
import SignUp from './signup.js'
import Todo from './todo.js';
import "./index.css";

// runs the app/ login screen
class App extends React.Component {
  render() {
    
    return (
      // calls the appropriate screen -> fills component with whatever screen the user has
      // indicated on the searchbar, also allows us to redirect manually using
      // window.location.pathname <Route path="/task/:tasklistId" component={Edit}/>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/todo" element={<Todo/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route exact path="/" element={<LoginScreen/>}/>
        </Routes>
    </Router>
    );
  }
}

// Renders the title of the page, and then adds it to the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

import React from 'react';
import TodoList from './todo';

// Test

class Dashboard extends React.Component {

    constructor(props) { // initializes user variables
        super(props)
        this.state = {
            loginStatus: "",
            user: ""
        }
    }

    handleLogout = () => { // logs the user out
        window.location.pathname = '/'
    }

    fetchUserData() { // connects with the backend to receive user data
        console.log("Getting user data from flask...")
        fetch('http://localhost:5000/profile', {
            method: 'GET',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            }
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d);
                this.setState({user : d.username});
                console.log(this.state.user);
            })
        .catch(e => {
            console.log(e);
            return e;
        })
    }

    componentDidMount() { // Allows us to initialize the states/do stuff before render()
        this.fetchUserData()
    }

    //function when you click to-do button
    handleTodoClick = () => {
        window.location.pathname = '/todo';
    };

    //to-do and logout button
    render() {
        const { user } = this.state;
        return (
          <div>
            <h1>Dashboard</h1>
            <h3>Welcome, {user}!</h3>
            <button onClick={this.handleLogout}>Logout</button>
            <button onClick={this.handleTodoClick}>To-Do Tasks</button>
          </div>
        );
      }
}

export default Dashboard;
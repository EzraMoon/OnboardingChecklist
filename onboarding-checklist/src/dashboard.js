import React from 'react';
<<<<<<< HEAD
// Test
=======
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc

class Dashboard extends React.Component {

    constructor(props) { // initializes user variables
        super(props)
        this.state = {
            loginStatus: "",
<<<<<<< HEAD
            user: "",
            name: ""
=======
            user: ""
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
        }
    }

    handleLogout = () => { // logs the user out
<<<<<<< HEAD
        fetch('http://localhost:5000/logout', {
            method: 'GET',
            credentials: 'include',
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
            })
        .catch(e => {
            console.log(e);
            return e;
        })
        window.location.pathname = '/'
    }

    fetchUserData() { // connects with the backend to receive user data
        console.log("Getting user data from flask...")
        fetch('http://localhost:5000/@me', {
            method: 'GET',
            credentials: 'include',
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
                this.setState({name : d.name})
                console.log(this.state.user);
            })
        .catch(e => {
            console.log(e);
            return e;
        })
=======
        window.location.pathname = '/'
    }

    //event for to-do list
    handleTodo = () => {
        window.location.pathname = "/todo";
      }


    fetchUserData() { // connects with the backend to receive user data
        console.log("Getting user data from flask...")
        fetch('http://localhost:5000/validate', {
            method: 'GET',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : true
            }
        }).then(r => {
            return r.json()
        }).then(d => {
                console.log(d)
                this.setState({user : d.username})
                console.log(this.state.user)
            })
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
    }

    componentDidMount() { // Allows us to initialize the states/do stuff before render()
        this.fetchUserData()
    }

<<<<<<< HEAD
    render() {
        return(
            <div>
                <h1> Dashboard </h1>
                <h3>Welcome, {this.state.name}!</h3>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
=======
    //if click on logout, goees to login screen, if clicked on to-do list goes to to-do screen
    render() {
        return(
          <div>
            <h1> Dashboard </h1>
            <h3>Welcome, {this.state.user}!</h3>
            <button onClick={this.handleLogout}>Logout</button>
            <button onClick={this.handleTodo}>To-Do List</button>
          </div>
        )
      }
>>>>>>> 502af12d4124670b8df4af95107a4b3931eb07cc
}

export default Dashboard
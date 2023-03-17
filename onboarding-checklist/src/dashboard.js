import React from 'react';
// Test

class Dashboard extends React.Component {

    constructor(props) { // initializes user variables
        super(props)
        this.state = {
            user: "",
            name: "",
            title: "",
            lists: []
        }
    }

    handleTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    handleLogout = () => { // logs the user out
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

    handleTodo = () => {
        window.location.pathname = '/todo'
    }

    fetchUserData = () => { // connects with the backend to receive user data
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
    }

    componentDidMount() { // Allows us to initialize the states/do stuff before render()
        this.fetchUserData()
        this.listInfo()
    }

    listCreate = (event) => {
        event.preventDefault() // Prevents the page from reloading
        console.log("Creating a new list...");
        let title = this.state.title;
        let name = this.state.name;

        fetch('http://localhost:5000/create', {
            method: 'POST',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
            body: JSON.stringify([title, name]),
        }).then(r => {
            return r.json()})
            .then(d => {
                this.listInfo()
            })
        .catch(e => {
            console.log(e);
            return e;
        })
    }

    listInfo = (event) => {
        fetch('http://localhost:5000/listdata', {
            method: 'GET',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d);
                this.setState({lists : d.data})
                console.log(this.state.lists)
            })
        .catch(e => {
            console.log(e);
            return e;
        })
    }

    //if click on logout, goees to login screen, if clicked on to-do list goes to to-do screen
    render() {
        return(
          <div>
            <h1> Dashboard </h1>
            <h3>Welcome, {this.state.name}!</h3>
            <p>This is your list dashboard! Create a new to-do list or edit an existing one here.</p>
            <ul>
                {this.state.lists.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <form>
                <input type="text" placeholder="Title of list" value={this.state.title} onChange={this.handleTitle}></input>
                <button onClick={this.listCreate}>Create New List</button>
            </form>
            <br/>
            <button onClick={this.listInfo}>Test</button>
            <button onClick={this.handleLogout}>Logout</button>
            <button onClick={this.handleTodo}>To-Do List</button>
          </div>
        )
      }
} export default Dashboard
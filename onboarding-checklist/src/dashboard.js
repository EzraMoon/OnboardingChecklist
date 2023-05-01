import React from 'react';
import './signup.css';

class Dashboard extends React.Component {

    constructor(props) { // initializes user variables
        super(props)
        this.state = {
            user: "",
            name: "",
            title: "",
            lists: [],
            dict: {}
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
                this.setState({dict : d.dict})
            })
        .catch(e => {
            console.log(e);
            return e;
        })
    }

    delList(event, code) {
        event.preventDefault()
        fetch('http://localhost:5000/delete', {
            method: 'POST',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
            body: JSON.stringify(code),
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d);
                this.listInfo();
            })
        .catch(e => {
            console.log(e);
            return e;
        })
    }

    /**
     * Function that puts the list code on the user's clipboard
     * @param {*} event 
     * @param {*} code 
     */
    copyCode(event, code) {
        event.preventDefault();
        navigator.clipboard.writeText(code);
        console.log("Copied list code")
    }

    /**
     * Duplicates an existing list
     * @param {*} event 
     * @param {*} code 
     */
    copyList(event, code) {
        event.preventDefault();
        fetch('http://localhost:5000/copy', {
            method: 'POST',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
            body: JSON.stringify(code),
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d);
                this.listInfo();
            })
        .catch(e => {
            console.log(e);
            return e;
        })
    }

    //if click on logout, goees to login screen, if clicked on to-do list goes to to-do screen
    render() {
        return(
          <div className="dashboard-container">
            <img src="https://logodownload.org/wp-content/uploads/2021/12/southern-company-logo-1.png" alt="Southern Company Logo" className="logo" />
            <h1> Dashboard </h1>
            <h3>Welcome, {this.state.name}!</h3>
            <p>This is your list dashboard(s), create a new to-do list or edit an existing one below.</p>
                <ul>
                {
                    Object.entries(this.state.dict).map(([key, value]) => <li> <a href={'/list/'+ key}>{value}</a><button onClick={(e) => {
                        this.delList(e, key)}}>Delete</button><button onClick={(e) => {
                            this.copyCode(e, key)}}>Copy Code</button><button onClick={(e) => {
                                this.copyList(e, key)}}>Duplicate</button></li>)
                }
                </ul>
            <form>
                <input type="text" placeholder="Title of list" value={this.state.title} onChange={this.handleTitle}></input>
                <button onClick={this.listCreate}>Create</button>
            </form>
            <br/>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        )
      }
} export default Dashboard
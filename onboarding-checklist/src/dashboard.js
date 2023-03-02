import React from 'react';

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
    }

    componentDidMount() { // Allows us to initialize the states/do stuff before render()
        this.fetchUserData()
    }

    render() {
        return(
            <div>
                <h1> Dashboard </h1>
                <h3>Welcome, {this.state.user}!</h3>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Dashboard
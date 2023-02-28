import React from 'react';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loginStatus: ""
        }
    }

    handleLogout = () => {
        window.location.pathname = '/'
    }

    fetchUserData() {
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
            })
    }

    render() {
        this.fetchUserData()
        return(
            <div>
                <h1> Welcome to the Dashboard! </h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Dashboard
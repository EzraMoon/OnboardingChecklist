import React from 'react';

class Dashboard extends React.Component {
    handleLogout = () => {
        window.location.pathname = '/'
    }

    render() {
        return(
            <div>
                <h1> Welcome to the Dashboard! </h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Dashboard
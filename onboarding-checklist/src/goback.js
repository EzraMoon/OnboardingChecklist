import React from 'react';

/**
 * Error screen directing users if they
 * are on an incorrect page.
 */
class GoBack extends React.Component {
    goBack = () => {
        window.history.back();
      }

    render() {
        return(
           <div>
            <h1>404 page not found.</h1>
            <p>If you are seeing this page after attempting to access a list, you might have entered an incorrect code.</p>
            <button onClick={this.goBack()}>Return to previous</button>
           </div>
        )
    }

} export default GoBack;
import React from 'react';
import ReactDOM from 'react-dom';


//to-do screen class
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      presetTodos: ["Get Username and Password", "Turn in 1-9 Forms", "Finish other tasks"],
      newItem: ""
    };
  }



  //add item to list
  addItem = () => {
    const {todos, newItem} = this.state;
    if (newItem.trim() !== "") {
      todos.push(newItem);
      this.setState({ todos, newItem: "" });
    }
  }

  //remove item drom list
  removeItem = (index) => {
    const {todos} = this.state;
    todos.splice(index, 1);
    this.setState({todos});
  }

  //when click, event happens
  handleChange = (event) => {
    this.setState({newItem: event.target.value});
  }

  //go back to previous screen button
  goBack = () => {
    window.history.back();
  }

  populatePreset = () => {
    this.setState({todos: this.state.presetTodos});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // add fetch request to verify username/password
    
    // pass user as prop to Dashboard component
    this.props.history.push({
      pathname: "/dashboard",
      state: {
        user: username
      }
    });
  }

  render() {
    const {todos, newItem} = this.state;
    const { user } = this.props;
  
    return (
      <div>
        <h1>To-Do List </h1>
        <h2> OnBoarding Tasks for: {user}</h2>
        <input type="text" value={newItem} onChange={this.handleChange} />
        <button onClick={this.addItem}> Add Task </button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => this.removeItem(index)}> Complete </button>
            </li>
          ))}
        </ul>
        <button onClick={this.populatePreset}> Populate Preset To-Do List </button>
        <button onClick={this.goBack}> Go Back </button>
      </div>
    );
  }  
}

ReactDOM.render(<Todo />, document.getElementById('root'));
export default Todo;


import React from 'react';
import ReactDOM from 'react-dom';

//to-do screen class with preset functions
class Todo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: [],
        presetTodos: ["Make sure to recieve Laptop and Quest Headset", 
        "Obtain Badge: The Badging office is on the first floor, as a full-time employee for assistance",
        "Complete your I-9 form: Call Tracy Gibby (404-925-6357) to complete",
        "Obtain NTID and Email: Make sure you can sign into your Southern Company Microsoft Email account, if not call HR Direct",
        "Make sure you can access TO Microsoft Teams Chat and channels: This is VERY important",
        "Check access to mySOurce: This is for Southern Company Related apps, links, and personal information",
        "Learn Time Input: Time is entered through Oracle HCM and can be found at the bottom of mySOurce, ask a full time employee",
        "Complete LearningSOurce training",
        "Take a building tour: ask a full-time employee to give you a building tour",
        "Get your showcase shirts: ask a full-time employee to give you your showcase shirt",
        "Request necessary access on COOL Compliance: parking deck, internet, tuiton reimbursement, etc"],
        completedTodos: [],
        newItem: ""
      };
      this.populatePreset();
    }

  //add item to list by user
  addItem = () => {
    const {todos, newItem} = this.state;
    if (newItem.trim() !== "") {
      todos.push(newItem);
      this.setState({ todos, newItem: "" });
    }
  }

  //remove item from list of user to-do
  removeItem = (index) => {
    const {todos, completedTodos} = this.state;
    const completedTask = todos[index];
    todos.splice(index, 1);
    completedTodos.push(completedTask);
    this.setState({todos, completedTodos});
  }

  //undo completed item from list
  undoItem = (index) => {
    const {completedTodos} = this.state;
    const uncompletedTask = completedTodos[index];
    completedTodos.splice(index, 1);
    this.setState({completedTodos});
    this.addItemToList(uncompletedTask);
  }

  //add tasks to list from user
  addItemToList = (item) => {
    const {todos} = this.state;
    todos.push(item);
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

  //populate todos with presetTodos
  populatePreset = () => {
    this.setState({todos: this.state.presetTodos});
  }

  //deletes an item permanently 
  deleteItem = (index) => {
    const {todos} = this.state;
    todos.splice(index, 1);
    this.setState({todos});
  }

  //render function that has completed and uncompleted tasks under their categories
  render() {
    const {todos, completedTodos, newItem} = this.state;
    const { user } = this.props;
  
    return (
        <div>
          <h1>To-Do List </h1>
          <h2> OnBoarding Tasks for: {user}</h2>
          <input type="text" value={newItem} onChange={this.handleChange} />
          <button onClick={this.addItem}> Add Task </button>
          <h3> Uncompleted Tasks: </h3>
          <button onClick={this.populatePreset}> OnBoarding Tasks </button>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo}
                {index >= this.state.presetTodos.length && (
                  <button onClick={() => this.deleteItem(index)}> Delete </button>
                )}
                <button onClick={() => this.removeItem(index)}> Complete </button>
              </li>
            ))}
          </ul>
          <div>
            <h3> Completed Tasks: </h3>
            {completedTodos.length === 0 ? (
              <p> *No tasks completed* </p>
            ) : (
              <ul>
                {completedTodos.map((todo, index) => (
                  <li key={index}>
                    {todo}
                    <button onClick={() => this.undoItem(index)}> Undo </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={this.goBack}> Go Back </button>
        </div>
      );
      
  }     
} export default Todo

// some issues to fix, delete button isn't working, history is not being held when going to previous page, user is not showing up 'OnBoarding tasks for: ' should have inputted user, cannot
// permanently delete added task by user. 

// things to still add, subtasks for user, ability to see onboarding tasks without having to click button, links to pages

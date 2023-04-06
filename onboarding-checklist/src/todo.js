import React from 'react';
import ReactDOM from 'react-dom';

//to-do screen class with preset functions
class Todo extends React.Component {
  constructor(props) {
    super(props);
    const presetTodos = [
        {
          title: "Make sure to recieve Laptop", 
          description: "Collect your laptop.",
          subtasks: [
            { title: "Setup headset/ META account", completed: false },
            { title: "Get bag for headset", completed: false },
            { title: "Get bag for laptop", completed: false },
          ]
        },
        {
          title: "Obtain Badge",
          description: "The badging office is on the first floor, ask a full time employee for assistance",
          subtasks: [
            { title: "Make sure badge can access building", completed: false },
          ]
        },
        {
          title: "Complete your I-9 form",
          description: "Have ID and SSN ready",
          subtasks: [
            {
              title: (
                <>
                  Call{" "}
                  <a href="mailto:ttgibby@southernco.com">Tracy Gibby</a>{" "}
                  (404-925-6357) to complete
                </>
              ),
              completed: false,
            },
          ],
        },
        {
          title: "Obtain NTID and Email",
          description: "Call HR direct if needed, email should end in '@southernco.com'",
          subtasks: [
            { title: "Verify ability to login to SOCO email", completed: false },
          ]
        },
        {
          title: "Make sure you can access TO Microsoft Teams Chat and channels",
          description: "This is very important, and where all communication occurs",
          subtasks: [
            { title: "Join TO Innovations channel", completed: false },
            { title: "Join Emerging Technologies channel", completed: false },
          ]
        },
        {
          title: (
            <>
              Check access to{" "}
              <a href="https://webauth.southernco.com/login.aspx?WL_Type=E&WL_AppId=OracleEmjeErpHcm&WL_ReturnMethod=FV&WL_Expire=1&MFAConfigUnknown=68&MFAExcludeUnknown=7%7cCOOLSECURITY%3aSOCOWEB&WL_ReturnUrl=https%3a%2f%2fwebauthentication.southerncompany.com%2fLogin.aspx%3fReturnUrl%3d%252fHostedRedirect.aspx%253fapp%253dhttps%253a%252f%252fidcs-800659c597c2497788f3ab30e2562a95.identity.oraclecloud.com%253a443%252ffed%2526authRequest%253d1%26app%3dhttps%3a%2f%2fidcs-800659c597c2497788f3ab30e2562a95.identity.oraclecloud.com%3a443%2ffed%26authRequest%3d1" target="_blank" rel="noopener noreferrer">mySOurce</a>
            </>
          ),
          description: "This is for Southern Company Related apps, links, and personal information",
          subtasks: []
        },
        {
          title: (
            <>
              Access Time Input on{" "}
              <a href="https://emje.fa.us6.oraclecloud.com/hcmUI/faces/FndOverview?macKey=rO8HsAI2n8YvHED0">
                Oracle HQ
              </a>{" "}
              on mySOurce
            </>
          ),
          description: "Time Type (Regular), Project (10120163), Task (19.09)",
          subtasks: [{ title: "Write down information", completed: false }],
        },
        {
          title: (
            <>
              Complete{" "}
              <a href="https://southernco.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FSOUTHERNCO.sumtotal.host%2Flearning%2Fapp%2Fmanagement%2FLMS_TrainRequired.aspx%3FUserMode%3D0">
                LearningSOurce
              </a>{" "}
              training
            </>
          ),
          description: "This is due within the first month of employment",
          subtasks: []
        },
        {
          title: "Take a building tour",
          description: "Ask a full-time employee for assistance",
          subtasks: []
        },
        {
          title: "Get showcase shirts",
          description: "Ask a full time employee for assistance",
          subtasks: []
        },
        {
          title: (
            <>
              Request necessary access on{" "}
              <a href="https://coolcompliance.southernco.com/">COOL Compliance</a>
            </>
          ),
          description: "This deals with HR items and other personal SOCO links",
          subtasks: [
            { title: "Request parking access", completed: false },
            { title: "Recieve internet user and password", completed: false },
            { title: "Apply for tuition reimbursement", completed: false },
          ]
        }          
    ];

    this.state = {
      todos: presetTodos.map(task => ({ ...task, completed: false })),
      completedTodos: JSON.parse(localStorage.getItem(`completedTodos-${this.props.user}`)) || [],
      newItem: "",
      newDescription: "",
      newSubtask: "",
      presetTodos,
      listId: window.location.href.split('/')[4],
      tasks: [],
      newLink: "",
    };
  }

  //allows for descriptions on tasks
  handleDescriptionChange = (event) => {
  this.setState({ newDescription: event.target.value });
  }

  handleLinkChange = (event) => {
    this.setState({ newLink: event.target.value });
  }

  //checks for preset item
  componentDidMount() {
    console.log(this.state.listId);
    this.grabList();
  }

  //checks for updated added task
  componentDidUpdate() {
    localStorage.setItem(`completedTodos-${this.props.user}`, JSON.stringify(this.state.completedTodos));
  }

  // Gets the info for the selected list based on the code in the link
  grabList = (event) => {
    fetch('http://localhost:5000/getlist', {
        method: 'POST',
        credentials: 'include',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials" : true,
            'Accept': 'application/json'
        },
        body: JSON.stringify(this.state.listId),
    }).then(r => {
        return r.json()})
        .then(d => {
            console.log(d);
            this.setState({author : d.Author})
            this.setState({title : d.Title})
            this.setState({tasks : d.Data})
        })
    .catch(e => {
        console.log(e);
        return e;
    })
}

  //add item to list by user
  addItem = () => {
    const { todos, newItem, newDescription } = this.state;
    if (newItem.trim() !== "") {
    todos.push({ title: newItem, description: newDescription, subtasks: [], completed: false });
    this.setState({ todos, newItem: "", newDescription: "" });
    this.addTaskGlobal();
    }
  }

  //remove item from list of user to-do
  removeItem = (index) => {
    const { tasks, completedTodos } = this.state;
    const completedTask = tasks[index];
    tasks.splice(index, 1);
    completedTodos.push(completedTask);
    this.setState({ tasks, completedTodos });
  }

  //undo completed item from list
  undoItem = (index) => {
    const { completedTodos, todos } = this.state;
    const uncompletedTask = completedTodos[index];
    completedTodos.splice(index, 1);
    todos.push(uncompletedTask);
    this.setState({ completedTodos, todos });
  }

  //add tasks to list from user
  addItemToList = (item) => {
    const { todos } = this.state;
    todos.push({ title: item, subtasks: [], completed: false });
    this.setState({ todos });
  }

  //when click, event happens
  handleChange = (event) => {
    this.setState({newItem: event.target.value});
  }

  //this handles subtasks completion
  handleSubtaskChange = (event) => {
    this.setState({ newSubtask: event.target.value });
  }

  //go back to previous screen button
  goBack = () => {
    window.history.back();
  }

  //populate todos with presetTodos
  populatePreset = () => {
    fetch('http://localhost:5000/premade', {
        method: 'POST',
        credentials: 'include',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials" : true,
            'Accept': 'application/json'
        },
        body: JSON.stringify(this.state.listId),
    }).then(r => {
        return r.json()})
        .then(d => {
            console.log(d);
            this.grabList()
        })
    .catch(e => {
        console.log(e);
        return e;
    })
  }

  //deletes an item permanently 
  deleteItem = (index) => {
    const {todos} = this.state;
    todos.splice(index, 1);
    this.setState({todos});
  }

  //deletes a completed item
  deleteCompletedItem = (index) => {
    const { completedTodos } = this.state;
    completedTodos.splice(index, 1);
    this.setState({ completedTodos });
  }

  //checks if preset task
  isPresetTask = (task) => {
    return this.state.presetTodos.includes(task);
  }

  //adding a subtask
  addSubtask = (taskIndex, subtask) => {
    const { todos } = this.state;
    todos[taskIndex].subtasks.push({ title: subtask, completed: false });
    this.setState({ todos });
  }

  //removes a subtask
  removeSubtask = (taskIndex, subtaskIndex) => {
    const { todos } = this.state;
    todos[taskIndex].subtasks.splice(subtaskIndex, 1);
    this.setState({ todos });
  }

  //complete subtask
  completeSubtask = (taskIndex, subtaskIndex) => {
    const { todos } = this.state;
    todos[taskIndex].subtasks[subtaskIndex].completed = !todos[taskIndex].subtasks[subtaskIndex].completed;
    this.setState({ todos });
  }

  //boolean for if task is complete
  isTaskComplete = (task) => {
    return task.subtasks.every(subtask => subtask.completed);
  }

  //completes the task
  completeTask = (id) => {
    fetch('http://localhost:5000/complete', {
            method: 'POST',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
            body: JSON.stringify([this.state.listId, id]), // get listcode from link
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d)
                console.log(this.state.tasks)
                this.grabList()
            })
        .catch(e => {
            console.log(e);
            return e;
        })
  }
  
  // Adds task to the selected tasklist
  // which is connected to the database/the user
  // who created it.
  addTaskGlobal = () => {
    fetch('http://localhost:5000/addnote', {
            method: 'POST',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
            body: JSON.stringify([this.state.listId, this.state.newItem, this.state.newDescription, this.state.newSubtask, this.state.newLink]), // get listcode from link
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d)
                console.log(this.state.tasks)
                this.grabList()
            })
        .catch(e => {
            console.log(e);
            return e;
        })
  }

  deleteTaskGlobal = (id) => {
    fetch('http://localhost:5000/deletenote', {
            method: 'POST',
            credentials: 'include',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials" : true,
                'Accept': 'application/json'
            },
            body: JSON.stringify([this.state.listId, id]), // get listcode from link
        }).then(r => {
            return r.json()})
            .then(d => {
                console.log(d)
                console.log(this.state.tasks)
                this.grabList()
            })
        .catch(e => {
            console.log(e);
            return e;
        })
  }

  //render function that has completed and uncompleted tasks under their categories
  render() {
    const { tasks, todos, completedTodos, newItem, newDescription, newSubtask, newLink } = this.state;
    const { user } = this.props;
  
    return (
      <div>
      <h1>{this.state.title}</h1>
      <h3>Author: {this.state.author}</h3>
      <p>Share this list with other users using the code <b>{this.state.listId}</b></p>
      <input type="text" value={newItem} onChange={this.handleChange} placeholder="Task title" />
      <input type="text" value={newDescription} onChange={this.handleDescriptionChange} placeholder="Task description" />
      <input type="text" value={newSubtask} onChange={this.handleSubtaskChange} placeholder="Subtask" />
      <input type="text" value={newLink} onChange={this.handleLinkChange} placeholder="Relevant Link" />
      <button onClick={this.addTaskGlobal}>Add Task</button>
        <h3>Uncompleted Tasks:</h3>

        <button onClick={this.populatePreset}>OnBoarding Tasks</button>
        <ul>
          {tasks.map((item, taskIndex) => (
            <li key={taskIndex}>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              {item.link ? <a href={item.link}>Relevant link</a> : null}
              <button onClick={() => this.deleteTaskGlobal(item.id)}>Delete</button>
              {!item.completed && (
                <button onClick={() => this.removeItem(taskIndex)}>Complete</button>
              )}
              
            </li>
          ))}
        </ul>
        <h3>Completed Tasks:</h3>
        {completedTodos.length === 0 ? (
        <p>*No Tasks Completed*</p>
      ) : (
        <ul>
          {completedTodos.map((task, taskIndex) => (
            <li key={taskIndex}>
              {task.title}
              
              <button onClick={() => this.deleteCompletedItem(taskIndex)}>Delete</button>
              <button onClick={() => this.undoItem(taskIndex)}>Undo</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={this.goBack}>Go Back</button>
    </div>
  );
 }       
} export default Todo

// some issues to fix: user is not showing up 'OnBoarding tasks for: ' should have inputted user 

// things to still add: links to pages

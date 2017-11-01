import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import $ from 'jquery';
import uuid from 'uuid';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }
  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data});
        console.log(this.state);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Site',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social Media App',
          category:'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category:'Web Development'
        }   
      ]
    }); 
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project){
    console.log(project);
    let projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects: projects
    })
  }
  handleDelete(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects: projects});
  }
  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <h3>Latest Projects</h3>
        <Projects onDelete={this.handleDelete.bind(this)} projects={this.state.projects}/>
        <h3>Todo List</h3>
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;

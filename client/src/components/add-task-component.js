import React, { Component } from "react";
import TasksDataService from "../services/task-service";

export default class AddTask extends Component {
    constructor(props) {
      super(props);
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangePriority = this.onChangePriority.bind(this);
      this.onChangeDueDate = this.onChangeDueDate.bind(this);
      this.onChangeDoDate = this.onChangeDoDate.bind(this);
      this.onChangeCategory = this.onChangeCategory.bind(this);
      this.saveTask = this.saveTask.bind(this);
      this.newTask = this.newTask.bind(this);
  
      this.state = {
        id: null,
        title: "",
        description: "", 
        priority: "",
        dueDate: "",
        doDate: "",
        category: "",
        published: false,
        submitted: false
      };
    }

    onChangeCategory(e) {
        this.setState({
          category: e.target.value
        });
      }

    onChangeDoDate(e) {
        this.setState({
          doDate: e.target.value
        });
      }

    onChangeDueDate(e) {
        this.setState({
          dueDate: e.target.value
        });
      }

    onChangePriority(e) {
        this.setState({
          priority: e.target.value
        });
      }

    onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }
    
      saveTask() {
        var data = {
          title: this.state.title,
          description: this.state.description,
          category: this.state.category, 
          dueDate: this.state.dueDate, 
          doDate: this.state.doDate,
          priority: this.state.priority
        };
    
        TasksDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              title: response.data.title,
              description: response.data.description,
              category: response.data.category,
              dueDate: response.data.dueDate,
              doDate: response.data.doDate,
              priority: response.data.priority,
              published: response.data.published,
    
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      newTask() {
        this.setState({
          id: null,
          title: "",
          description: "",
          category: "",
          dueDate: "",
          doDate: "",
          priority: "",
          published: false,
    
          submitted: false
        });
      }
    
      render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newTask}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>
    
                
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    required
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                    name="category"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dueDate"
                    required
                    value={this.state.dueDate}
                    onChange={this.onChangeDueDate}
                    name="Due Date"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doDate">Do Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Do Date"
                    required
                    value={this.state.doDate}
                    onChange={this.onChangeDoDate}
                    name="doDate"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <input
                    type="text"
                    className="form-control"
                    id="priority"
                    required
                    value={this.state.priority}
                    onChange={this.onChangePriority}
                    name="priority"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>
                
                <button onClick={this.saveTask} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
    }
import React, { Component } from "react";
import TasksDataService from "../services/task-service";
import { withRouter } from '../common/with-router';

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeDoDate = this.onChangeDoDate.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);

    this.getTask = this.getTask.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",  
        published: false, 
        priority: "",
        doDate: "",
        dueDate: "",
        category: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.router.params.id);
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          category: category
        }
      };
    });
  }

  onChangeDueDate(e) {
    const dueDate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          dueDate: dueDate
        }
      };
    });
  }

  onChangeDoDate(e) {
    const doDate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          doDate: doDate
        }
      };
    });
  }


  onChangePriority(e) {
    const priority = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          priority: priority
        }
      };
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }

  getTask(id) {
    TasksDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      published: status
    };

    TasksDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TasksDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TasksDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tasks');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTask.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>
        
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}

render() {
        const { currentTask } = this.state;
    
        return (
          <div>
            {currentTask ? (
              <div className="edit-form">
                <h4>Task</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={currentTask.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      value={currentTask.category}
                      onChange={this.onChangeCategory}
                    />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="doDate">Do Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="doDate"
                      value={currentTask.doDate}
                      onChange={this.onChangedoDate}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dueDate"
                      value={currentTask.dueDate}
                      onChange={this.onChangeDueDate}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <input
                      type="text"
                      className="form-control"
                      id="note"
                      value={currentTask.note}
                      onChange={this.onChangeNote}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      value={currentTask.status}
                      onChange={this.onChangeStatus}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="assignedTo">Assigned To</label>
                    <input
                      type="text"
                      className="form-control"
                      id="assignedTo"
                      value={currentTask.assignedTo}
                      onChange={this.onChangeAssignedTo}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="area">Area</label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      value={currentTask.area}
                      onChange={this.onChangeArea}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <input
                      type="text"
                      className="form-control"
                      id="priority"
                      value={currentTask.priority}
                      onChange={this.onChangePriority}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nextDoDate">Next Do Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nextDoDate"
                      value={currentTask.nextDoDate}
                      onChange={this.onChangeNextDoDate}
                    />
                  </div>
                </form>   
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.deleteTask}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="m-3 btn btn-sm btn-success"
                  onClick={this.updateTask}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Task...</p>
              </div>
            )}
          </div>
        );
      }
}

////////////////////////////////look at
/*
render() {
        const { currentTask } = this.state;
    
        return (
          <div>
            {currentTask ? (
              <div className="edit-form">
                <h4>Task</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={currentTask.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      value={currentTask.category}
                      onChange={this.onChangeCategory}
                    />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="doDate">Do Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="doDate"
                      value={currentTask.doDate}
                      onChange={this.onChangedoDate}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dueDate"
                      value={currentTask.dueDate}
                      onChange={this.onChangeDueDate}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <input
                      type="text"
                      className="form-control"
                      id="note"
                      value={currentTask.note}
                      onChange={this.onChangeNote}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      value={currentTask.status}
                      onChange={this.onChangeStatus}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="assignedTo">Assigned To</label>
                    <input
                      type="text"
                      className="form-control"
                      id="assignedTo"
                      value={currentTask.assignedTo}
                      onChange={this.onChangeAssignedTo}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="area">Area</label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      value={currentTask.area}
                      onChange={this.onChangeArea}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <input
                      type="text"
                      className="form-control"
                      id="priority"
                      value={currentTask.priority}
                      onChange={this.onChangePriority}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nextDoDate">Next Do Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nextDoDate"
                      value={currentTask.nextDoDate}
                      onChange={this.onChangeNextDoDate}
                    />
                  </div>
                </form>   
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.deleteTask}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="m-3 btn btn-sm btn-success"
                  onClick={this.updateTask}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Task...</p>
              </div>
            )}
          </div>
        );
      }
}
*/

export default withRouter(Task);
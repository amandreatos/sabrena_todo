import React, { Component } from "react";
import { Card, Loader, Dimmer } from "semantic-ui-react";
import ConfirmationModal from "../components/ConfirmationModal";

class TodoList extends Component {
    state = {
        confirmationOpen: false
    }

    handleDelete = i => {
        this.props.deleteItem(i);
        this.setState({ confirmationOpen: false});
    }

  render() {
    let view = <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>;
    let lis = [];
    let completionColor = this.props.done === false ? "blue" : "green";
    let spanStatus = this.props.done === false ? "button green" : "button tto";
    let mark = this.props.done === false ? <span>Complete <i className="fas fa-check i-right"></i></span> : <span>Undo <i className="fas fa-undo-alt i-right"></i></span>;
    for (let i in this.props.items) {
      if (this.props.items[i].completed === this.props.done) {
        lis.push(<Card key={i} color={completionColor}>
            <Card.Content>
              <Card.Header>{this.props.items[i].item}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two button-holder">
                <button onClick={() => this.props.action(i)} className={spanStatus}>
                  {mark}
                </button>
                <button onClick={() => this.setState({confirmationOpen: true})} className="button red">
                  Delete <i className="fas fa-trash-alt i-right" />
                </button>
              </div>
            </Card.Content>
            <ConfirmationModal open={this.state.confirmationOpen} close={() => this.setState({confirmationOpen: false})} confirmDelete={() => this.handleDelete(i)} />
          </Card>);
      }
    }
    if (this.props.isLoading !== true) {
        if (lis[0]) {
            view = lis;
        } else {
            view = <h5>Add a todo to get started!</h5>;
        }
    }
    return <div className="todoItems">
        {view}
      </div>;
  }
}
export default TodoList;

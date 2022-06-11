import React from 'react';
import FormHandle from './FormHandle';
import TaskList from './TaskList';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quest:'',
      reward:'',
      poi:'',
  };

    //this.handleSubmit = this.handleSubmit;
  }

  //handle the form submission in the child formhandle
  handleSubmit = (e, quest, reward, poi) => {
    e.preventDefault();
    this.setState({quest, reward, poi});
  }
  


  //children: formhandle, tasklist
  render() {
    return (
      <div>
        <FormHandle
        handleSubmit={(e, quest,reward,poi) => 
          this.handleSubmit(e, quest,reward,poi)}
        />
        <TaskList 
        reward={this.state.reward}
        poi={this.state.poi}
        quest={this.state.quest}
        taskArray={this.state.taskArray}
        />
      </div>
    );
  }
}

export default NameForm;
import React from "react";

const TodoList = ({ items, action, done }) => {
  let lis = [];
  let completionStatus = done === false ? 'Todo' : 'Done'
  let completionColor = done === false ? 'green' : 'red';
  let mark = done === false ? "\u2713" : "x";
  for (let i in items) {
    if (items[i].completed === done) {
      lis.push(<div className="todoItem" key={i}>
          <span>{items[i].item}</span>
          <span class="status" style={{backgroundColor: completionColor}} onClick={() => action(i)}>{mark}</span>
        </div>);
    }
  }
  return <div className="todoItems"> 
  <h4>{completionStatus}</h4>
  {lis} 
  </div>;
};
export default TodoList;

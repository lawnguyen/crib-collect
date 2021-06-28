import './App.css';
import React from 'react';
import HomeCard from './components/HomeCard.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <DragDropContext>
          <Droppable droppableId="homes">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {this.props.homes.map((home, index) => {
                  return (
                    <Draggable key={home.link} draggableId={home.link} index={index}>
                      {(provided) => (
                        <li 
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          className="column is-one-quarter-fullhd is-half-tablet is-one-third-desktop">
                          <HomeCard homeDetails={home}></HomeCard>
                        </li>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default App;

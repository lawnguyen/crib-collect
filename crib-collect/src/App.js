import './App.css';
import React, { useState } from 'react';
import HomeCard from './components/HomeCard.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

function App(props) {
  const [homes, updateHomes] = useState(props.homes);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    
    const items = Array.from(homes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateHomes(items);
  }

  return (
    <div className="app">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="homes" direction="horizontal">
          {(provided) => (
            <ul className="homes" {...provided.droppableProps} ref={provided.innerRef}>
              {homes.map((home, index) => {
                return (
                  <Draggable key={home.link} draggableId={home.link} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        className="home column is-one-quarter-fullhd is-half-tablet is-one-third-desktop">
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

export default App;

import "./App.css";
import React, { useState } from "react";
import HomeCard from "./components/HomeCard/HomeCard.js";
import AddButton from "./components/AddButton/AddButton.js";
import Modal from "./components/Modal/Modal";
import HomeForm from "./components/HomeForm/HomeForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

function App(props) {
  const [homes, updateHomes] = useState(props.homes);
  const [modalState, updateModalState] = useState(false);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(homes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateHomes(items);
  }

  function onOpenModal() {
    updateModalState(true);
  }

  function onCloseModal() {
    updateModalState(false);
  }

  function addNewHome(newHome) {
    if (homes.some((home) => home.link === newHome.link)) {
      // TODO: user error message
      console.log("already in homes list");
    } else {
      updateHomes([...homes, newHome]);
      onCloseModal();
    }
  }

  return (
    <div className="app">
      {modalState ? (
        <Modal onCloseModal={onCloseModal} title="Enter the home's details">
          <HomeForm addNewHome={addNewHome}></HomeForm>
        </Modal>
      ) : null}
      <AddButton addNew={onOpenModal}></AddButton>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="homes" direction="horizontal">
          {(provided) => (
            <ul
              className="homes"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {homes.map((home, index) => {
                return (
                  <Draggable
                    key={home.id}
                    draggableId={home.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="home column is-full-mobile is-one-quarter-fullhd is-half-tablet is-one-third-desktop"
                      >
                        <HomeCard homeDetails={home}></HomeCard>
                      </li>
                    )}
                  </Draggable>
                );
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

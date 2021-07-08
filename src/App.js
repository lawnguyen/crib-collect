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

  function addNewHome(home) {
    const newHome = {
      link: "https://www.facebook.com/markace/itm/49080401546837/",
      title: "8 Beds · 3 Baths · Townhouse",
      price: 3450,
      dateAdded: 1519211809769,
      attributes: {
        bedrooms: 4,
        bathrooms: 3,
        sqft: 1800,
        laundry: "in-unit",
        neighborhood: "East Vancouver",
        parking: "1 included",
        utilities: [],
        airConditioning: true,
        buildingType: "Townhouse",
        notes: "suspiciously cheap",
      },
    };
    if (homes.some((home) => home.link === newHome.link)) {
      console.log("already in homes list");
    } else {
      updateHomes([...homes, newHome]);
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
                    key={home.link}
                    draggableId={home.link}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="home column is-one-quarter-fullhd is-half-tablet is-one-third-desktop"
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

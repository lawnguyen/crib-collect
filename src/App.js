import "./App.css";
import React, { useState, useEffect } from "react";
import HomeCard from "./components/HomeCard/HomeCard.js";
import AddButton from "./components/AddButton/AddButton.js";
import Modal from "./components/Modal/Modal";
import HomeForm from "./components/HomeForm/HomeForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import update from "immutability-helper";
import ConfirmationButtons from "./components/ConfirmationButtons/ConfirmationButtons";
import { firestore } from "./firebase";
import { auth } from "./firebase";

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

function App() {
  const [homes, updateHomes] = useState([]);
  const [newHomeModalState, updateNewHomeModalState] = useState(false);
  const [confirmDeleteModalState, updateConfirmDeleteModalState] =
    useState(false);
  const [homeExistsWarningModalState, updatehomeExistsWarningModalState] =
    useState(false);
  const [editHomeId, updateEditHomeId] = useState(null);
  const [deleteHomeId, updateDeleteHomeId] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getHomes, []);

  function getHomes() {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((user) => {
        if (user.exists) {
          const userGroups = user.data().userGroups;
          userGroups.forEach((group) => {
            firestore
              .collection("homes")
              .where("groupId", "==", group)
              .get()
              .then((querySnapshot) => {
                let homeData = [];
                querySnapshot.forEach((doc) => {
                  homeData.push(doc.data());
                });
                updateHomes([...homes, ...homeData]);
              });
          });
        } else {
          firestore
            .collection("userGroups")
            .add({ name: `${auth.currentUser.displayName}'s homes` })
            .then((docRef) => {
              firestore
                .collection("users")
                .doc(auth.currentUser.uid)
                .set({
                  displayName: auth.currentUser.displayName,
                  photoUrl: auth.currentUser.photoURL,
                  userGroups: [docRef.id],
                });
            });
        }
      })
      .catch((error) => {
        console.log("Error getting user document:", error);
      });
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(homes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateHomes(items);
  }

  function onOpenNewHomeModal() {
    updateNewHomeModalState(true);
  }

  function onCloseNewHomeModal() {
    updateNewHomeModalState(false);
    updateEditHomeId(null);
  }

  function onOpenConfirmDeleteModal() {
    updateConfirmDeleteModalState(true);
  }

  function onCloseConfirmDeleteModal() {
    updateConfirmDeleteModalState(false);
    updateDeleteHomeId(null);
  }

  function onEditHome(homeId) {
    onOpenNewHomeModal();
    updateEditHomeId(homeId);
  }

  function onDeleteHome(homeId) {
    onOpenConfirmDeleteModal();
    updateDeleteHomeId(homeId);
  }

  function editHome(updatedHome) {
    const homeIndex = homes.findIndex((x) => x.id === updatedHome.id);
    updateHomes(update(homes, { [homeIndex]: { $set: updatedHome } }));
    onCloseNewHomeModal();
  }

  function deleteHome() {
    updateHomes(homes.filter((home) => home.id !== deleteHomeId));
    firestore
      .collection("homes")
      .doc(deleteHomeId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    onCloseConfirmDeleteModal();
  }

  function addNewHome(newHome) {
    if (homes.some((home) => home.link === newHome.link)) {
      updatehomeExistsWarningModalState(true);
    } else {
      updateHomes([...homes, newHome]);
      onCloseNewHomeModal();
    }
  }

  return (
    <div className="app">
      {newHomeModalState ? (
        <Modal
          editHome={homes.find((home) => {
            return home.id === editHomeId;
          })}
          onCloseModal={onCloseNewHomeModal}
          title="Enter the home's details"
        >
          <HomeForm
            onSubmitEdit={editHome}
            editHome={homes.find((home) => {
              return home.id === editHomeId;
            })}
            homes={homes}
            duplicateHomeWarning={() => updatehomeExistsWarningModalState(true)}
            addNewHome={addNewHome}
          ></HomeForm>
        </Modal>
      ) : null}

      {homeExistsWarningModalState ? (
        <Modal
          onCloseModal={() => updatehomeExistsWarningModalState(false)}
          title="Duplicate Warning"
        >
          The link for this home already exists in your current homes.
        </Modal>
      ) : null}

      {confirmDeleteModalState ? (
        <Modal
          onCloseModal={onCloseConfirmDeleteModal}
          title="Are you sure you want to delete this home?"
        >
          <ConfirmationButtons
            onCancel={onCloseConfirmDeleteModal}
            onConfirm={deleteHome}
          ></ConfirmationButtons>
        </Modal>
      ) : null}
      <AddButton addNew={onOpenNewHomeModal}></AddButton>
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
                  <Draggable key={home.id} draggableId={home.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="home column is-full-mobile is-one-quarter-fullhd is-half-tablet is-one-third-desktop"
                      >
                        <HomeCard
                          editHome={onEditHome}
                          deleteHome={onDeleteHome}
                          homeDetails={home}
                        ></HomeCard>
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

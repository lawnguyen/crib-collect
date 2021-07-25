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
import Dropdown from "./components/Dropdown/Dropdown";
import { useHistory } from "react-router-dom";

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

function App({ match }) {
  const [homes, updateHomes] = useState([]);
  const [selectedGroup, updateSelectedGroup] = useState({});
  const [groups, updateGroups] = useState([]);
  const [validGroupState, updateValidGroupState] = useState(true);
  const [sharedGroupModalState, updateSharedGroupModalState] = useState(false);
  const [dropdownState, updateDropdownState] = useState(false);
  const [newHomeModalState, updateNewHomeModalState] = useState(false);
  const [confirmDeleteModalState, updateConfirmDeleteModalState] =
    useState(false);
  const [homeExistsWarningModalState, updatehomeExistsWarningModalState] =
    useState(false);
  const [editHomeId, updateEditHomeId] = useState(null);
  const [deleteHomeId, updateDeleteHomeId] = useState(null);
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getHomes, []);

  function getHomes() {
    const userDocRef = firestore.collection("users").doc(auth.currentUser.uid);

    userDocRef
      .get()
      .then((user) => {
        if (user.exists) {
          let firstGroup;
          let homeData = [];
          let userGroups = user.data().userGroups;

          // If there is a group id in the url params from a group being shared
          const sharedGroup = match.params.id;
          if (sharedGroup) {
            userGroups = [...userGroups, sharedGroup];
            firstGroup = sharedGroup;
            updateSharedGroupModalState(true);
            setSharedGroup(userDocRef, sharedGroup, userGroups);
          }

          userGroups.forEach((group) => {
            getHomesForGroup(homeData, firstGroup, group);
          });
        } else {
          // If user does not exist then create the user and the required documents
          createNewUser();
        }
      })
      .catch((error) => {
        console.log("Error getting user document:", error);
      });
  }

  function setSharedGroup(userDocRef, sharedGroup, userGroups) {
    firestore
      .collection("userGroups")
      .doc(sharedGroup)
      .get()
      .then((sharedGroupDoc) => {
        if (sharedGroupDoc.exists) {
          userDocRef
            .update({
              userGroups: userGroups,
            })
            .then(() => {
              console.log(
                `Group ${sharedGroup} successfully added to user's group`
              );
            });
        } else {
          updateValidGroupState(false);
        }
      });
  }

  function getHomesForGroup(homeData, firstGroup, group) {
    firestore
      .collection("homes")
      .where("groupId", "==", group)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          homeData.push(doc.data());
        });
        updateHomes([...homes, ...homeData]);
        setGroupData(firstGroup, group);
      });
  }

  function setGroupData(firstGroup, group) {
    firestore
      .collection("userGroups")
      .doc(group)
      .get()
      .then((userGroupDoc) => {
        if (!userGroupDoc.data()) {
          updateValidGroupState(false);
        } else {
          if (!firstGroup || firstGroup === group) {
            firstGroup = group;
            updateSelectedGroup({
              id: firstGroup,
              name: userGroupDoc.data().name,
            });
          }
          updateGroups((groups) => [
            ...groups,
            { id: group, name: userGroupDoc.data().name },
          ]);
        }
      });
  }

  function createNewUser() {
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
        updateSelectedGroup({
          id: docRef.id,
          name: `${auth.currentUser.displayName}'s homes`,
        });
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
      {sharedGroupModalState && validGroupState ? (
        <Modal
          onCloseModal={() => updateSharedGroupModalState(false)}
          title="Welcome"
        >
          You have been invited to this home group
        </Modal>
      ) : null}

      {!validGroupState ? (
        <Modal
          onCloseModal={() => {
            updateValidGroupState(true);
            updateSharedGroupModalState(false);
            if (groups.length) {
              updateSelectedGroup(groups[1]);
            }
            history.push("/");
          }}
          title="Error"
        >
          No group with id {match.params.id} exists
        </Modal>
      ) : null}

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
            groupId={selectedGroup.id}
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

      <Dropdown
        groups={groups}
        selectedGroup={selectedGroup}
        updateSelectedGroup={updateSelectedGroup}
        dropdownState={dropdownState}
        updateDropdownState={updateDropdownState}
      ></Dropdown>

      <AddButton addNew={onOpenNewHomeModal}></AddButton>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="homes" direction="horizontal">
          {(provided) => (
            <ul
              className="homes"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {homes
                .filter((h) => selectedGroup.id === h.groupId)
                .map((home, index) => {
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

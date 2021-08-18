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
import NavBar from "./components/Navbar/NavBar";
import ShareButton from "./components/ShareButton/ShareButton";
import CopyToClipboard from "./components/CopyToClipboard/CopyToClipboard";
import Rating from "react-rating";
import starIcon from "./icons/star.svg";
import starBorderIcon from "./icons/starBorder.svg";

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

function App({ match }) {
  const [homes, updateHomes] = useState([]);
  const [selectedGroup, updateSelectedGroup] = useState({});
  const [selectedSort, updateSelectedSort] = useState({
    id: "default",
    name: "Default",
  });
  const [groups, updateGroups] = useState([]);
  const [sharedGroupName, updateSharedGroupName] = useState(null);
  const [validGroupState, updateValidGroupState] = useState(true);
  const [sharedGroupModalState, updateSharedGroupModalState] = useState(false);
  const [shareModalState, updateShareModalState] = useState(false);
  const [groupDropdownState, updateGroupDropdownState] = useState(false);
  const [sortDropdownState, updateSortDropdownState] = useState(false);
  const [newHomeModalState, updateNewHomeModalState] = useState(false);
  const [ratingModalState, updateRatingModalState] = useState(false);
  const [ratingState, updateRatingState] = useState(null);
  const [confirmDeleteModalState, updateConfirmDeleteModalState] =
    useState(false);
  const [homeExistsWarningModalState, updatehomeExistsWarningModalState] =
    useState(false);
  const [editHomeId, updateEditHomeId] = useState(null);
  const [deleteHomeId, updateDeleteHomeId] = useState(null);
  const [rateHomeId, updateRateHomeId] = useState(null);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getHomes, []);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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
            firstGroup = sharedGroup;
            if (!userGroups.includes(sharedGroup)) {
              updateSharedGroupModalState(true);
              userGroups = [...userGroups, sharedGroup];
              setSharedGroup(userDocRef, sharedGroup, userGroups);
            }
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
          updateSharedGroupName(sharedGroupDoc.data().name);
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
        let getRatingPromises = [];
        querySnapshot.forEach((doc) => {
          getRatingPromises.push(getRatingsForHome(homeData, doc.data()));
        });

        Promise.all(getRatingPromises).then(() => {
          updateHomes([...homes, ...homeData]);
          setGroupData(firstGroup, group);
        });
      });
  }

  function getRatingsForHome(homeData, data) {
    return new Promise((resolve, reject) => {
      firestore
        .collection("ratings")
        .where("homeId", "==", data.id)
        .get()
        .then((ratingDocs) => {
          let sum = 0;
          data.userRating = 0;

          ratingDocs.forEach((ratingDoc) => {
            const rating = ratingDoc.data().rating;
            sum += rating;

            if (ratingDoc.data().userId === auth.currentUser.uid) {
              data.userRating = rating;
            }
          });
          const numRatings = ratingDocs.size;
          if (sum) {
            data.attributes.rating = `${sum / ratingDocs.size}/5`;
          } else {
            data.attributes.rating = "-/5";
          }
          data.attributes.numRatings = numRatings;
          data.attributes.sumRatings = sum;

          if (data.isDeleted) {
            homeData.push(data);
          } else {
            homeData.unshift(data);
          }
          resolve();
        });
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
        // Refresh the page so we load the any shared groups for new users
        if (match.params.id) {
          window.location.reload();
        }
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

  function onCloseRatingModal() {
    updateRatingModalState(false);
    updateRatingState(null);
  }

  function onEditHome(homeId) {
    onOpenNewHomeModal();
    updateEditHomeId(homeId);
  }

  function onDeleteHome(homeId) {
    onOpenConfirmDeleteModal();
    updateDeleteHomeId(homeId);
  }

  function onRateHome(homeId) {
    firestore
      .collection("ratings")
      .doc(`${homeId}_${auth.currentUser.uid}`)
      .get()
      .then((ratingDoc) => {
        const homeRating = ratingDoc.data();
        if (homeRating) {
          updateRatingState(homeRating.rating);
        }
        updateRatingModalState(true);
        updateRateHomeId(homeId);
      });
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
      updateHomes([newHome, ...homes]);
      onCloseNewHomeModal();
    }
  }

  function rateHome() {
    firestore
      .collection("ratings")
      .doc(`${rateHomeId}_${auth.currentUser.uid}`)
      .set({
        rating: ratingState,
        homeId: rateHomeId,
        userId: auth.currentUser.uid,
      })
      .then(() => {
        // recalculate rating average
        let homesCopy = [...homes];
        const homeIndex = homes.findIndex((home) => home.id === rateHomeId);
        let currentHome = { ...homes[homeIndex] };

        currentHome.userRating = ratingState;
        currentHome.attributes.numRatings++;
        currentHome.attributes.sumRatings += ratingState;
        currentHome.attributes.rating = `${roundToTwo(
          currentHome.attributes.sumRatings / currentHome.attributes.numRatings
        )}/5`;

        homesCopy[homeIndex] = currentHome;
        updateHomes(homesCopy);
      });
  }

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  function getShareUrl() {
    let url =
      window.location.protocol +
      "//" +
      window.location.host +
      "/group/" +
      selectedGroup.id;

    return url;
  }

  function sortByPrice(filteredHomes) {
    return [...filteredHomes].sort((a, b) => {
      if (parseInt(a.price) < parseInt(b.price)) {
        return -1;
      }
      if (parseInt(a.price) > parseInt(b.price)) {
        return 1;
      }
      return 0;
    });
  }

  function sortByRecentlyAdded(filteredHomes) {
    return [...filteredHomes].sort((a, b) => {
      if (a.dateAdded > b.dateAdded) {
        return -1;
      }
      if (a.dateAdded < b.dateAdded) {
        return 1;
      }
      return 0;
    });
  }

  function sortBySize(filteredHomes) {
    return [...filteredHomes].sort((a, b) => {
      a = isNaN(parseInt(a.attributes.sqft)) ? 0 : parseInt(a.attributes.sqft);
      b = isNaN(parseInt(b.attributes.sqft)) ? 0 : parseInt(b.attributes.sqft);
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });
  }

  function sortByRating(filteredHomes) {
    return [...filteredHomes].sort((a, b) => {
      const aRating = a.attributes.rating.split("/")[0] ?? "-";
      const bRating = b.attributes.rating.split("/")[0] ?? "-";
      a = parseFloat(aRating !== "-" ? aRating : 0);
      b = parseFloat(bRating !== "-" ? bRating : 0);
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });
  }

  function filterAndSortHomes(sortBy) {
    const filteredHomes = homes.filter((h) => selectedGroup.id === h.groupId);
    let sortedHomes;

    switch (sortBy) {
      case "price":
        sortedHomes = sortByPrice(filteredHomes);
        break;
      case "recentlyAdded":
        sortedHomes = sortByRecentlyAdded(filteredHomes);
        break;
      case "size":
        sortedHomes = sortBySize(filteredHomes);
        break;
      case "rating":
        sortedHomes = sortByRating(filteredHomes);
        break;
      case "default":
        sortedHomes = filteredHomes;
        break;
      default:
        sortedHomes = filteredHomes;
    }
    return sortedHomes;
  }

  return (
    <div>
      <NavBar
        username={auth.currentUser.displayName}
        buttonText="Sign out"
        onClick={() => {
          history.push("/");
          auth.signOut();
        }}
        userPhotoUrl={auth.currentUser.photoURL}
        isSignedIn={true}
      ></NavBar>
      <div className="app">
        {sharedGroupModalState && validGroupState ? (
          <Modal
            onCloseModal={() => updateSharedGroupModalState(false)}
            title="Welcome"
          >
            You have been invited to <b>{sharedGroupName}</b> group
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
              duplicateHomeWarning={() =>
                updatehomeExistsWarningModalState(true)
              }
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

        {ratingModalState ? (
          <Modal
            onCloseModal={() => onCloseRatingModal()}
            title="Give this home a personal rating"
          >
            <Rating
              emptySymbol={<img src={starBorderIcon} alt="empty rating icon" />}
              fullSymbol={<img src={starIcon} alt="rating icon" />}
              onClick={(value) => updateRatingState(value)}
              initialRating={ratingState}
            />
            <ConfirmationButtons
              onCancel={() => onCloseRatingModal()}
              onConfirm={() => {
                rateHome();
                onCloseRatingModal();
              }}
            ></ConfirmationButtons>
          </Modal>
        ) : null}

        {shareModalState ? (
          <Modal
            onCloseModal={() => updateShareModalState(false)}
            title={`Copy link to this group to share ${selectedGroup.name} with others`}
          >
            <CopyToClipboard textToCopy={getShareUrl()}></CopyToClipboard>
          </Modal>
        ) : null}

        <div className="sorting-and-sharing">
          <div>
            <Dropdown
              className="dropdown"
              items={groups}
              placeholderText="Group: "
              selectedItem={selectedGroup}
              updateSelectedItem={updateSelectedGroup}
              dropdownState={groupDropdownState}
              updateDropdownState={updateGroupDropdownState}
            ></Dropdown>
            <Dropdown
              className="dropdown"
              items={[
                { id: "default", name: "Default" },
                { id: "recentlyAdded", name: "Recently added" },
                { id: "price", name: "Price" },
                { id: "size", name: "Size" },
                { id: "rating", name: "Rating" },
              ]}
              placeholderText="Sort by: "
              selectedItem={selectedSort}
              updateSelectedItem={updateSelectedSort}
              dropdownState={sortDropdownState}
              updateDropdownState={updateSortDropdownState}
            ></Dropdown>
          </div>
          <ShareButton
            onClick={() => updateShareModalState(true)}
          ></ShareButton>
        </div>

        <AddButton addNew={onOpenNewHomeModal}></AddButton>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="homes" direction="horizontal">
            {(provided) => (
              <ul
                className="homes"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filterAndSortHomes(selectedSort.id).map((home, index) => {
                  return (
                    <Draggable
                      key={home.id}
                      draggableId={home.id}
                      index={index}
                      isDragDisabled={!isDesktop}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="home column is-full-mobile is-one-quarter-fullhd is-half-tablet is-one-third-widescreen"
                        >
                          <HomeCard
                            editHome={onEditHome}
                            deleteHome={onDeleteHome}
                            rateHome={(homeId) => onRateHome(homeId)}
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
    </div>
  );
}

export default App;

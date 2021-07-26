import React from "react";
import expandIcon from "../../icons/expandDropdown.svg";
import "./Dropdown.css";

function Dropdown({
  groups,
  selectedGroup,
  updateSelectedGroup,
  dropdownState,
  updateDropdownState,
}) {
  return (
    <div className={`dropdown ${dropdownState ? "is-active" : ""} `}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            updateDropdownState(!dropdownState);
          }}
        >
          <span>{selectedGroup.name}</span>
          <span>
            <img
              className="expand-icon"
              alt={"expand dropdown icon"}
              src={expandIcon}
            />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {groups.map((group) => {
            return (
              <button
                key={group.id}
                onClick={() => {
                  updateSelectedGroup({
                    id: group.id,
                    name: group.name,
                  });
                  updateDropdownState(false);
                }}
                className={`dropdown-item ${
                  selectedGroup.id === group.id ? "is-active" : ""
                }`}
              >
                {group.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;

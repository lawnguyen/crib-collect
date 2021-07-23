import React from "react";

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
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
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
                className="dropdown-item"
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

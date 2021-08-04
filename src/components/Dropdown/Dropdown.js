import React from "react";
import expandIcon from "../../icons/expandDropdown.svg";
import "./Dropdown.css";

function Dropdown({
  items,
  selectedItem,
  updateSelectedItem,
  dropdownState,
  updateDropdownState,
  placeholderText,
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
          <p>
            <strong>{placeholderText ?? ""}</strong>
          </p>
          <span>{selectedItem.name}</span>
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
          {items.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => {
                  updateSelectedItem({
                    id: item.id,
                    name: item.name,
                  });
                  updateDropdownState(false);
                }}
                className={`dropdown-item ${
                  selectedItem.id === item.id ? "is-active" : ""
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;

import React from "react";
import "./HomeForm.css";
import TextField from "./TextField/TextField";
import SelectField from "./SelectField/SelectField";
import CheckboxField from "./CheckboxField/CheckboxField";

function HomeForm() {
  return (
    <div>
      <TextField
        label="Title"
        placeholder="e.g. '2 Bed 1 Bath Condo in Mount Pleasant'"
      ></TextField>

      <TextField label="Price" placeholder="$"></TextField>

      <TextField label="URL" placeholder="https://"></TextField>

      <SelectField label="Number of bedrooms" options={[0,1,2,3,4,5,6,7,8]}></SelectField>

      <SelectField label="Number of bathrooms" options={[1,2,3,4,5,6]}></SelectField>

      <TextField label="Square footage (sqft)" placeholder="e.g. 1000"></TextField>

      <TextField label="Laundry (washer/dryer)" placeholder="e.g. 'in-unit'"></TextField>

      <TextField label="Area/Community" placeholder="e.g. 'Mount Pleasant'"></TextField>

      <TextField label="Parking" placeholder="e.g. '1 included, rent 1 for $100/month'"></TextField>

      <CheckboxField label="Utilities" options={['Water', 'Electricity', 'Gas', 'Internet', 'Cable']}></CheckboxField>
    </div>
  );
}

export default HomeForm;

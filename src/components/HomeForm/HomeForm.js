import React from "react";
import "./HomeForm.css";
import TextField from "./TextField/TextField";
import SelectField from "./SelectField/SelectField";
import CheckboxField from "./CheckboxField/CheckboxField";
import RadioField from "./RadioField/RadioField";
import TextareaField from "./TextareaField/TextareaField";
import FieldLabel from "./FieldLabel/FieldLabel";

function HomeForm() {
  return (
    <div>
      <FieldLabel label="Title" isRequired={true}></FieldLabel>
      <TextField placeholder="e.g. '2 Bed 1 Bath Condo in Mount Pleasant'"></TextField>

      <FieldLabel label="Price" isRequired={true}></FieldLabel>
      <TextField placeholder="$"></TextField>

      <FieldLabel label="URL" isRequired={true}></FieldLabel>
      <TextField placeholder="https://"></TextField>

      <FieldLabel label="Number of bedrooms"></FieldLabel>
      <SelectField options={[0, 1, 2, 3, 4, 5, 6, 7, 8]}></SelectField>

      <FieldLabel label="Number of bathrooms"></FieldLabel>
      <SelectField options={[1, 2, 3, 4, 5, 6]}></SelectField>

      <FieldLabel label="Square footage (sqft)"></FieldLabel>
      <TextField placeholder="e.g. 1000"></TextField>

      <FieldLabel label="Laundry (washer/dryer)"></FieldLabel>
      <TextField placeholder="e.g. 'in-unit'"></TextField>

      <FieldLabel label="Area/Community"></FieldLabel>
      <TextField placeholder="e.g. 'Mount Pleasant'"></TextField>

      <FieldLabel label="Parking"></FieldLabel>
      <TextField placeholder="e.g. '1 included, rent 1 for $100/month'"></TextField>

      <FieldLabel label="Utilities"></FieldLabel>
      <CheckboxField
        options={["Water", "Electricity", "Gas", "Internet", "Cable"]}
      ></CheckboxField>

      <FieldLabel label="Air conditioning"></FieldLabel>
      <RadioField options={["N/A", "Yes", "No"]} name="hasAirCon"></RadioField>

      <FieldLabel label="Home type"></FieldLabel>
      <SelectField
        options={[
          "N/A",
          "Condo/Apartment",
          "Townhouse",
          "Duplex",
          "House",
          "Private Room",
        ]}
      ></SelectField>

      <FieldLabel label="Notes"></FieldLabel>
      <TextareaField placeholder="Add further description"></TextareaField>
    </div>
  );
}

export default HomeForm;

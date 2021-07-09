import React from "react";
import "./HomeForm.css";
import TextField from "./TextField/TextField";
import SelectField from "./SelectField/SelectField";
import CheckboxField from "./CheckboxField/CheckboxField";
import RadioField from "./RadioField/RadioField";
import TextareaField from "./TextareaField/TextareaField";
import FieldLabel from "./FieldLabel/FieldLabel";
import SubmitButton from "./SubmitButton/SubmitButton";
import { firestore } from "../../firebase";
import firebase from "firebase/app";

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      title: "",
      price: null,
      dateAdded: null,
      bedrooms: null,
      bathrooms: null,
      sqft: null,
      laundry: "",
      neighborhood: "",
      parking: "",
      utilities: [],
      airConditioning: null,
      buildingType: "",
      notes: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = ["checkbox", "radio"].includes(target.type)
      ? target.parentElement.textContent.trim()
      : target.value;
    const name = target.name;

    if (target.type === "checkbox") {
      // Add value to state array if checked, remove otherwise
      this.setState({
        [name]: target.checked
          ? [...this.state[name], value]
          : this.state[name].filter((s) => s !== value),
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  onSubmit() {
    // TODO: check required fields are valid
    // TODO: display new HomeCard
    const homeModel = {
      link: this.state.link,
      title: this.state.title,
      price: this.state.price,
      attributes: {
        bedrooms: this.state.bedrooms,
        bathrooms: this.state.bathrooms,
        sqft: this.state.sqft,
        laundry: this.state.laundry,
        neighborhood: this.state.neighborhood,
        parking: this.state.parking,
        utilities: this.state.utilities,
        airConditioning: this.state.airConditioning,
        buildingType: this.state.buildingType,
        notes: this.state.notes,
      },
    };
    firestore
      .collection("homes")
      .add(homeModel)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        docRef.update({
          dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div>
        <FieldLabel label="Title" isRequired={true}></FieldLabel>
        <TextField
          name="title"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. '2 Bed 1 Bath Condo in Mount Pleasant'"
        ></TextField>

        <FieldLabel label="Price" isRequired={true}></FieldLabel>
        <TextField
          name="price"
          onChange={this.handleInputChange}
          type="number"
          step="100"
          placeholder="$"
        ></TextField>

        <FieldLabel label="URL" isRequired={true}></FieldLabel>
        <TextField
          name="link"
          onChange={this.handleInputChange}
          type="text"
          placeholder="https://"
        ></TextField>

        <FieldLabel label="Number of bedrooms" isRequired={true}></FieldLabel>
        <SelectField
          name="bedrooms"
          onChange={this.handleInputChange}
          options={["", "0", "1", "2", "3", "4", "5", "6", "7", "8"]}
        ></SelectField>

        <FieldLabel label="Number of bathrooms" isRequired={true}></FieldLabel>
        <SelectField
          name="bathrooms"
          onChange={this.handleInputChange}
          options={["", "1", "2", "3", "4", "5", "6"]}
        ></SelectField>

        <FieldLabel label="Square footage (sqft)"></FieldLabel>
        <TextField
          name="sqft"
          onChange={this.handleInputChange}
          type="number"
          step="100"
          placeholder="e.g. 1000"
        ></TextField>

        <FieldLabel label="Laundry (washer/dryer)"></FieldLabel>
        <TextField
          name="laundry"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. 'in-unit'"
        ></TextField>

        <FieldLabel label="Area/Community"></FieldLabel>
        <TextField
          name="neighborhood"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. 'Mount Pleasant'"
        ></TextField>

        <FieldLabel label="Parking"></FieldLabel>
        <TextField
          name="parking"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. '1 included, rent 1 for $100/month'"
        ></TextField>

        <FieldLabel label="Utilities"></FieldLabel>
        <CheckboxField
          onChange={this.handleInputChange}
          name="utilities"
          options={["Water", "Electricity", "Gas", "Internet", "Cable"]}
        ></CheckboxField>

        <FieldLabel label="Air conditioning"></FieldLabel>
        <RadioField
          onChange={this.handleInputChange}
          options={["N/A", "Yes", "No"]}
          name="airConditioning"
        ></RadioField>

        <FieldLabel label="Home type"></FieldLabel>
        <SelectField
          onChange={this.handleInputChange}
          name="buildingType"
          options={[
            "",
            "Condo/Apartment",
            "Townhouse",
            "Duplex",
            "House",
            "Private Room",
          ]}
        ></SelectField>

        <FieldLabel label="Notes"></FieldLabel>
        <TextareaField
          name="notes"
          onChange={this.handleInputChange}
          placeholder="Add further description"
        ></TextareaField>

        <SubmitButton
          onSubmit={this.onSubmit}
          buttonText="Submit"
        ></SubmitButton>
      </div>
    );
  }
}

export default HomeForm;

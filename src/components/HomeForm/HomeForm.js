import React from "react";
import "./HomeForm.css";
import TextField from "./TextField/TextField";
import SelectField from "./SelectField/SelectField";
import CheckboxField from "./CheckboxField/CheckboxField";
import RadioField from "./RadioField/RadioField";
import TextareaField from "./TextareaField/TextareaField";
import FieldLabel from "./FieldLabel/FieldLabel";
import SubmitButton from "./SubmitButton/SubmitButton";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { firestore } from "../../firebase";

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      title: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      laundry: "",
      neighborhood: "",
      parking: "",
      utilities: [],
      airConditioning: "N/A",
      buildingType: "",
      notes: "",
      errorMessage: "",
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
    // TODO: don't add duplicates to the database
    if (!this.isValid()) {
      return;
    }
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

        const dateAdded = Date.now();
        docRef.update({
          dateAdded: dateAdded,
        });

        homeModel.dateAdded = dateAdded;
        this.props.addNewHome(homeModel);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  isValid() {
    if (!this.state.link) {
      this.setState({ errorMessage: "Please enter a valid URL" });
      return false;
    }
    if (!this.state.title) {
      this.setState({ errorMessage: "Please enter a title" });
      return false;
    }
    if (!this.state.price) {
      this.setState({ errorMessage: "Please enter a price" });
      return false;
    }
    if (!this.state.bedrooms) {
      this.setState({ errorMessage: "Please enter the amount of bedrooms" });
      return false;
    }
    if (!this.state.bathrooms) {
      this.setState({ errorMessage: "Please enter the amount of bathrooms" });
      return false;
    }
    this.setState({ errorMessage: "" });
    return true;
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
          value={this.state.title}
        ></TextField>

        <FieldLabel label="Price" isRequired={true}></FieldLabel>
        <TextField
          name="price"
          onChange={this.handleInputChange}
          type="number"
          step="100"
          placeholder="$"
          value={this.state.price}
        ></TextField>

        <FieldLabel label="URL" isRequired={true}></FieldLabel>
        <TextField
          name="link"
          onChange={this.handleInputChange}
          type="text"
          placeholder="https://"
          value={this.state.link}
        ></TextField>

        <FieldLabel label="Number of bedrooms" isRequired={true}></FieldLabel>
        <SelectField
          name="bedrooms"
          onChange={this.handleInputChange}
          options={["", "0", "1", "2", "3", "4", "5", "6", "7", "8"]}
          selected={this.state.bedrooms}
        ></SelectField>

        <FieldLabel label="Number of bathrooms" isRequired={true}></FieldLabel>
        <SelectField
          name="bathrooms"
          onChange={this.handleInputChange}
          options={["", "1", "2", "3", "4", "5", "6"]}
          selected={this.state.bathrooms}
        ></SelectField>

        <FieldLabel label="Square footage (sqft)"></FieldLabel>
        <TextField
          name="sqft"
          onChange={this.handleInputChange}
          type="number"
          step="100"
          placeholder="e.g. 1000"
          value={this.state.sqft}
        ></TextField>

        <FieldLabel label="Laundry (washer/dryer)"></FieldLabel>
        <TextField
          name="laundry"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. 'in-unit'"
          value={this.state.laundry}
        ></TextField>

        <FieldLabel label="Area/Community"></FieldLabel>
        <TextField
          name="neighborhood"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. 'Mount Pleasant'"
          value={this.state.neighborhood}
        ></TextField>

        <FieldLabel label="Parking"></FieldLabel>
        <TextField
          name="parking"
          onChange={this.handleInputChange}
          type="text"
          placeholder="e.g. '1 included, rent 1 for $100/month'"
          value={this.state.parking}
        ></TextField>

        <FieldLabel label="Utilities"></FieldLabel>
        <CheckboxField
          onChange={this.handleInputChange}
          name="utilities"
          options={["Water", "Electricity", "Gas", "Internet", "Cable"]}
          selectedList={this.state.utilities}
        ></CheckboxField>

        <FieldLabel label="Air conditioning"></FieldLabel>
        <RadioField
          onChange={this.handleInputChange}
          options={["N/A", "Yes", "No"]}
          name="airConditioning"
          selected={this.state.airConditioning}
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
          selected={this.state.buildingType}
        ></SelectField>

        <FieldLabel label="Notes"></FieldLabel>
        <TextareaField
          name="notes"
          onChange={this.handleInputChange}
          placeholder="Add further description"
          value={this.state.notes}
        ></TextareaField>

        <div className="form-submit">
          <ErrorMessage message={this.state.errorMessage}></ErrorMessage>
          <SubmitButton
            onSubmit={this.onSubmit}
            buttonText="Submit"
          ></SubmitButton>
        </div>
      </div>
    );
  }
}

export default HomeForm;

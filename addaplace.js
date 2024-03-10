import React, { Component } from 'react';
import './addaplace.css'; 

class AddAPlace extends Component {
  constructor() {
    super();
    this.state = {
      newCity: '',
      savedLocations: [], // Array to store saved locations
    };
  }

  handleCityChange = (event) => {
    this.setState({ newCity: event.target.value });
  };

  handleAddPlace = () => {
    const { newCity, savedLocations } = this.state;

    if (newCity.trim() === '') {
      alert('Please enter a city name.'); // Add your own validation as needed
      return;
    }

    // Add the new city to the saved locations array
    this.setState((prevState) => ({
      savedLocations: [...prevState.savedLocations, newCity],
      newCity: '', // Clear the input after adding
    }));
  };

  renderSavedLocations() {
    const { savedLocations } = this.state;

    return (
      <div className="saved-locations-container">
        <h1 className="saved-locations-header">Saved Locations</h1>
        <div className="saved-locations-content">
          <label>Enter City: </label>
          <input type="text" value={this.state.newCity} onChange={this.handleCityChange} />
          <button onClick={this.handleAddPlace}>Add Place</button>

          <ul>
            {savedLocations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="add-a-place-wrapper">
        {this.renderSavedLocations()}
      </div>
    );
  }
}

export default AddAPlace;

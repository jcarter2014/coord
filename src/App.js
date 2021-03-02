import { render } from '@testing-library/react';
import './App.css';
import React, { useState } from 'react';


function App() {

  // spots that the API call will populate
  const [spots, setSpots] = useState([]);

  const [latitude, setLatitude] = useState(40.747799);

  const [longitude, setLongitude] = useState(-73.985158);

  // walk distance
  const [meters, setMeters] = useState('');
  // // car size
  const [size, setSize] = useState('');
  // //  passengers or cargo
  const [cargo, setCargo] = useState('');
  // vehicle type
  const [vehicle, setVehicle] = useState('');

  function getSpots() {
    const newUrl = `https://api.coord.co/v1/search/curbs/bylocation/time_rules?latitude=${latitude}&longitude=${longitude}&radius_km=${meters}&primary_use=park&access_key=_4q3U98ZlESpBMzlXiKCOrIsOb8aQPTDXwcQTwyNpcc`

    fetch(newUrl)
    .then(response => response.json())
    .then(data => {
      setSpots([data.features]);
    });
  }

  return (
    <div>
      <div className="App">

        <p>What's your latitude?
            <label>
                <input type="text" id="latitude" value="40.747799" onChange={(e) => setLatitude(e.target.value)}/>
            </label>
        </p>

        <p>What's your longitude?
            <label>
                <input type="text" id="longitude" value="-73.985158" onChange={(e) => setLongitude(e.target.value)}/>
            </label>
        </p>

        <p>How far in kilometers do you want to walk?
            <label>
                <input type="number" min="0" max="1000" id="distance" onChange={(e) => setMeters(e.target.value)}/>
            </label>
        </p>
        <p>How big is your car in feet?
            <label>
                <input type="number" id="carsize" onChange={(e) => setSize(e.target.value)}/>
            </label>
        </p>

        <p>What type of vehicle do you have?
            <select onChange={(e) => setVehicle(e.target.value)}>
                <option value="commercial">Commercial</option>
                <option value="official">Official</option>
                <option value="other">Other</option>
            </select>
        </p>

        <p>Are you going to load passengers/cargo or park?
            <select onChange={(e) => setCargo(e.target.value)}>
                <option value="park">Park</option>
                <option value="cargo">Load Passengers/Cargo</option>
            </select>
        </p>
        <button type="button" onClick={() => getSpots()}>Get Spots!</button>
        <div>
          {
            spots.length > 0 &&
            spots[0].map((spot) => (
              <p>There is a spot at {spot.properties.metadata.end_street_name} and {spot.properties.metadata.start_street_name} about {spot.properties.distance_from_center_meters} meters away.</p>
            )) 
          }
        </div>
      </div>
    </div>
  );
}

export default App;

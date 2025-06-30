import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: 33.88863,
  lng: 35.49548
};

const LOCATIONIQ_TOKEN = 'd083c2bfeb1564d1f877e7bc3d93cf2c'; // ⬅ Replace with your LocationIQ token

export default function LocationPicker() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAhYcftcBcRbJnpSO0wcWryScwNqEXrdtc' // This is only to load the map, not for localization
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [venueName, setVenueName] = useState('');

  // ✅ Using LocationIQ for Reverse Geocoding
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.d083c2bfeb1564d1f877e7bc3d93cf2c&lat=${lat}&lon=${lng}&format=json`
      );

      const data = await response.json();
      console.log('LocationIQ data:', data);
      return data.display_name || '';
    } catch (err) {
      console.error('Error fetching address from LocationIQ:', err);
      return '';
    }
  };

  // When clicking on the map
  const onMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedPosition({ lat, lng });

    const address = await getAddressFromCoords(lat, lng);
    setVenueName(address); // Auto-fill venue name
  };

  // Save location
  const saveLocation = () => {
    if (!venueName || !selectedPosition) {
      alert('Please enter the venue name and select a location on the map');
      return;
    }
    const locationData = {
      venueName,
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
    };

    fetch('http://localhost:8081/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationData),
    })
      .then(async res => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg || 'Failed to save');
        }
        return res.json();
      })
      .then(() => {
        alert('Location saved successfully!');
        setVenueName('');
        setSelectedPosition(null);
      })
      .catch(err => {
        console.error(err);
        alert('Error: ' + err.message);
      });
  };

  if (loadError) return <div>Error loading the map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Venue name"
        value={venueName}
        onChange={e => setVenueName(e.target.value)}
        style={{ marginBottom: 10, padding: 8, width: 300 }}
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
      <button onClick={saveLocation} style={{ marginTop: 10, padding: '8px 16px' }}>
        Save location
      </button>
    </div>
  );
}

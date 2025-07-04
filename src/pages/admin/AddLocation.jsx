import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '20px',
  overflow: 'hidden'
};

const center = {
  lat: 33.88863,
  lng: 35.49548
};

const LOCATIONIQ_TOKEN = 'd083c2bfeb1564d1f877e7bc3d93cf2c';

// Custom map styles for dark theme
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#1d2c4d"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#8ec3b9"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#1a3646"}]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#4b6878"}]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#64779e"}]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#4b6878"}]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#334e87"}]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{"color": "#023e58"}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#283d6a"}]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#6f9ba4"}]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#1d2c4d"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#023e58"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#3C7680"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#304a7d"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#98a5be"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#1d2c4d"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{"color": "#2c6675"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#255763"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#b0d5ce"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#023e58"}]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#98a5be"}]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#1d2c4d"}]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#283d6a"}]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{"color": "#3a4762"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#0e1626"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#4e6d70"}]
  }
];

export default function LocationPicker() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAhYcftcBcRbJnpSO0wcWryScwNqEXrdtc'
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [venueName, setVenueName] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Search for locations using LocationIQ
  const searchLocations = async (query) => {
    if (!query || query.length < 3) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://us1.locationiq.com/v1/search?key=pk.${LOCATIONIQ_TOKEN}&q=${encodeURIComponent(query)}&format=json&limit=5`
      );
      
      const data = await response.json();
      const suggestions = data.map(item => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
      }));
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Error searching locations:', err);
      setIsLoading(false);
    }
  };

  // Handle input change with dual functionality
  const handleInputChange = (e) => {
    const value = e.target.value;
    setVenueName(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set search mode if user is typing
    if (value.length > 0) {
      setIsSearchMode(true);
      
      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        searchLocations(value);
      }, 300);
    } else {
      setIsSearchMode(false);
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setVenueName(suggestion.display_name);
    setSelectedPosition({ lat: suggestion.lat, lng: suggestion.lng });
    setShowSuggestions(false);
    setIsSearchMode(false);
  };

  // Using LocationIQ for Reverse Geocoding
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.${LOCATIONIQ_TOKEN}&lat=${lat}&lon=${lng}&format=json`
      );

      const data = await response.json();
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
    setVenueName(address);
    setIsSearchMode(false);
    setShowSuggestions(false);
  };

  // Save location
  const saveLocation = () => {
    if (!venueName || !selectedPosition) {
      alert('Please enter the venue name and select a location on the map');
      return;
    }
    
    setIsSaving(true);
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
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setVenueName('');
        setSelectedPosition(null);
        setShowSuggestions(false);
        setIsSearchMode(false);
      })
      .catch(err => {
        console.error(err);
        setIsSaving(false);
        alert('Error: ' + err.message);
      });
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (loadError) return <div>Error loading the map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1d2c4d', // هنا غيرت اللون ليكون مثل لون الخريطة الداكن
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    particles: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
      `,
      animation: 'float 6s ease-in-out infinite'
    },
    header: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      padding: '40px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px',
      textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.2rem',
      fontWeight: '300'
    },
    mainContent: {
      position: 'relative',
      zIndex: 10,
      padding: '40px 20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    leftPanel: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    rightPanel: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease'
    },
    sectionTitle: {
      color: '#ffffff',
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '30px'
    },
    inputLabel: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '12px',
      display: 'block'
    },
    input: {
      width: '100%',
      padding: '16px 20px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      color: '#ffffff',
      fontSize: '1.1rem',
      fontWeight: '500',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
    },
    inputFocused: {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-2px)'
    },
    suggestionsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginTop: '8px',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    suggestion: {
      padding: '16px 20px',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    suggestionHover: {
      background: 'rgba(139, 92, 246, 0.3)',
      transform: 'translateX(4px)'
    },
    modeIndicator: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: isSearchMode ? '#06b6d4' : '#8b5cf6',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease'
    },
    saveButton: {
      width: '100%',
      padding: '18px',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
      border: 'none',
      borderRadius: '16px',
      color: '#ffffff',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 16px rgba(139, 92, 246, 0.4)',
      position: 'relative',
      overflow: 'hidden'
    },
    saveButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    successMessage: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      color: '#ffffff',
      padding: '16px 24px',
      borderRadius: '16px',
      boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4)',
      zIndex: 10000,
      animation: 'slideIn 0.3s ease',
      backdropFilter: 'blur(20px)'
    },
    mapContainer: {
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      border: '2px solid rgba(255, 255, 255, 0.1)'
    }
  };

  return (
    <div style={styles.container} onClick={() => setShowSuggestions(false)}>
      <div style={styles.particles} />
      
      <header style={styles.header}>
        <h1 style={styles.title}>Location Picker</h1>
        <p style={styles.subtitle}>Find and save your favorite places with ease.</p>
      </header>
      
      <main style={styles.mainContent}>
        <section style={styles.leftPanel} onClick={e => e.stopPropagation()}>
          <h2 style={styles.sectionTitle}>Venue Location</h2>
          <div style={styles.inputContainer}>
            <label htmlFor="venueName" style={styles.inputLabel}>Venue Name</label>
            <input
              id="venueName"
              type="text"
              value={venueName}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(isSearchMode ? styles.inputFocused : {})
              }}
              placeholder="Type venue name or address..."
              autoComplete="off"
              onClick={e => e.stopPropagation()}
            />
            {showSuggestions && (
              <div style={styles.suggestionsContainer} onClick={e => e.stopPropagation()}>
                {isLoading ? (
                  <p style={{ padding: '16px', color: '#fff' }}>Loading...</p>
                ) : (
                  searchSuggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      style={styles.suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {suggestion.display_name}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <button
            style={{
              ...styles.saveButton,
              ...(isSaving || !venueName || !selectedPosition ? styles.saveButtonDisabled : {})
            }}
            onClick={saveLocation}
            disabled={isSaving || !venueName || !selectedPosition}
          >
            {isSaving ? 'Saving...' : 'Save Location'}
          </button>
        </section>

        <section style={styles.rightPanel}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{
              styles: mapStyles,
              disableDefaultUI: true,
              zoomControl: true
            }}
            onClick={onMapClick}
          >
            {selectedPosition && <Marker position={selectedPosition} />}
          </GoogleMap>
        </section>
      </main>

      {showSuccess && <div style={styles.successMessage}>Location saved successfully!</div>}

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(50%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}

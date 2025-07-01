import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "20px",
  overflow: "hidden",
};

const defaultCenter = {
  lat: 33.88863,
  lng: 35.49548,
};

const LOCATIONIQ_TOKEN = "d083c2bfeb1564d1f877e7bc3d93cf2c";

// Custom map styles for cosmic theme
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#1a1f3a"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#06b6d4"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#1a1f3a"}]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#8b5cf6"}]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#10b981"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#2d1b69"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#2d1b69"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#06b6d4"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{"color": "#8b5cf6"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#0a0e27"}]
  }
];

export default function ManageLocations() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAhYcftcBcRbJnpSO0wcWryScwNqEXrdtc",
  });

  // Stored locations
  const [locations, setLocations] = useState([]);

  // Currently selected location (for creating or editing)
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Location name (for create or edit)
  const [venueName, setVenueName] = useState("");

  // For loading data
  const [loading, setLoading] = useState(false);

  // To track if editing (show update button instead of save new)
  const [editingId, setEditingId] = useState(null);

  // Success status
  const [showSuccess, setShowSuccess] = useState(false);

  // Reverse Geocoding: Get address from coordinates
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_TOKEN}&lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      return data.display_name || "";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "";
    }
  };

  // Fetch locations from API
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/api/locations");
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      alert("Error loading locations: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // On map click to select new location or edit
  const onMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedPosition({ lat, lng });

    const address = await getAddressFromCoords(lat, lng);
    setVenueName(address);
  };

  // Save new location or update existing
  const saveLocation = async () => {
    if (!venueName || !selectedPosition) {
      alert("Please enter the venue name and select a location on the map");
      return;
    }

    const payload = {
      venueName,
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
    };

    try {
      let res;
      if (editingId) {
        // Update location
        res = await fetch(`http://localhost:8081/api/locations/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new location
        res = await fetch("http://localhost:8081/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Save failed");
      }

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setVenueName("");
      setSelectedPosition(null);
      setEditingId(null);
      fetchLocations();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Delete location
  const deleteLocation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/locations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      fetchLocations();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // On clicking edit button in list
  const onEdit = (location) => {
    setVenueName(location.venueName);
    setSelectedPosition({
      lat: location.latitude,
      lng: location.longitude,
    });
    setEditingId(location.id);
  };

  // Reset form
  const resetForm = () => {
    setVenueName("");
    setSelectedPosition(null);
    setEditingId(null);
  };

  if (loadError) return (
    <div style={styles.errorContainer}>
      <div style={styles.errorMessage}>
        🚨 Error loading the map
      </div>
    </div>
  );
  
  if (!isLoaded) return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}></div>
      <div style={styles.loadingText}>Loading map...</div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Cosmic Background */}
      <div style={styles.cosmicBackground}>
        <div style={styles.particles}></div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div style={styles.successMessage}>
          ✨ Location saved successfully!
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🌟 Location Command Center</h1>
        <p style={styles.subtitle}>Manage your locations with cosmic precision</p>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Panel - Controls */}
        <div style={styles.leftPanel}>
          <h2 style={styles.sectionTitle}>
            📍 Location Details
          </h2>
          
          {/* Input Field */}
          <div style={styles.inputContainer}>
            <label style={styles.inputLabel}>
              Venue Name
            </label>
            <input
              type="text"
              placeholder="Enter venue name..."
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Selected Location Info */}
          {selectedPosition && (
            <div style={styles.locationInfo}>
              <h3 style={styles.locationInfoTitle}>✅ Selected Location</h3>
              <p style={styles.locationCoords}>
                Latitude: {selectedPosition.lat.toFixed(6)}<br/>
                Longitude: {selectedPosition.lng.toFixed(6)}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <button
              onClick={saveLocation}
              style={{
                ...styles.saveButton,
                ...((!venueName || !selectedPosition) ? styles.saveButtonDisabled : {})
              }}
              disabled={!venueName || !selectedPosition}
            >
              {editingId ? "🔄 Update Location" : "💾 Save Location"}
            </button>
            
            {editingId && (
              <button
                onClick={resetForm}
                style={styles.cancelButton}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div style={styles.rightPanel}>
          <h2 style={styles.sectionTitle}>
            🗺️ Interactive Map
          </h2>
          <div style={styles.mapContainer}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedPosition || defaultCenter}
              zoom={selectedPosition ? 14 : 10}
              onClick={onMapClick}
              options={{
                styles: mapStyles,
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
              }}
            >
              {selectedPosition && (
                <Marker 
                  position={selectedPosition}
                  animation={window.google?.maps?.Animation?.DROP}
                />
              )}
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{
                    lat: location.latitude,
                    lng: location.longitude,
                  }}
                  title={location.venueName}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="12" fill="#8b5cf6" stroke="#06b6d4" stroke-width="2"/>
                        <circle cx="15" cy="15" r="6" fill="#ffffff"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div style={styles.tableSection}>
        <h2 style={styles.sectionTitle}>
          📊 Locations Database
        </h2>
        
        {loading ? (
          <div style={styles.loadingTableContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingTableText}>Loading locations...</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            {locations.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🌌</div>
                <h3 style={styles.emptyTitle}>No saved locations</h3>
                <p style={styles.emptyText}>Click on the map to add a new location</p>
              </div>
            ) : (
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableHeaderCell}>Name</div>
                  <div style={styles.tableHeaderCell}>Latitude</div>
                  <div style={styles.tableHeaderCell}>Longitude</div>
                  <div style={styles.tableHeaderCell}>Actions</div>
                </div>
                {locations.map((loc) => (
                  <div 
                    key={loc.id} 
                    style={{
                      ...styles.tableRow,
                      ...(editingId === loc.id ? styles.tableRowEditing : {})
                    }}
                  >
                    <div style={styles.tableCell}>{loc.venueName}</div>
                    <div style={styles.tableCell}>{loc.latitude.toFixed(6)}</div>
                    <div style={styles.tableCell}>{loc.longitude.toFixed(6)}</div>
                    <div style={styles.tableCell}>
                      <button 
                        onClick={() => onEdit(loc)}
                        style={styles.editButton}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => deleteLocation(loc.id)}
                        style={styles.deleteButton}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles object with cosmic theme
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    direction: 'rtl',
  },
  
  cosmicBackground: {
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
    animation: 'float 6s ease-in-out infinite',
  },
  
  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(6, 182, 212, 0.8), transparent),
      radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(16, 185, 129, 0.8), transparent)
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 100px',
    animation: 'sparkle 3s linear infinite',
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
    backdropFilter: 'blur(20px)',
    fontWeight: '600',
  },
  
  header: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '40px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
    margin: 0,
  },
  
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
    fontWeight: '300',
    margin: 0,
  },
  
  mainContent: {
    position: 'relative',
    zIndex: 10,
    padding: '40px 20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  
  leftPanel: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  },
  
  rightPanel: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  },
  
  sectionTitle: {
    color: '#8b5cf6',
    fontWeight: '700',
    marginBottom: '20px',
    fontSize: '1.6rem',
  },
  
  inputContainer: {
    marginBottom: '24px',
  },
  
  inputLabel: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#06b6d4',
  },
  
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    boxShadow: 'inset 0 0 12px rgba(139, 92, 246, 0.5)',
    transition: 'background-color 0.3s ease',
  },
  
  locationInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.5)',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
    color: '#ffffff',
    marginBottom: '24px',
  },
  
  locationInfoTitle: {
    margin: '0 0 12px 0',
    fontWeight: '700',
  },
  
  locationCoords: {
    margin: 0,
    fontWeight: '500',
  },
  
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  
  saveButton: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.5)',
    transition: 'transform 0.2s ease',
  },
  
  saveButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  
  cancelButton: {
    backgroundColor: '#f87171',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(248, 113, 113, 0.5)',
    transition: 'transform 0.2s ease',
  },
  
  mapContainer: {
    width: "100%",
    height: "500px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  
  tableSection: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1400px',
    margin: '40px auto 80px',
    padding: '0 20px',
  },
  
  tableContainer: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    overflowX: 'auto',
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#fff',
  },
  
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    padding: '16px 24px',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  
  tableHeaderCell: {
    padding: '8px 16px',
    textAlign: 'left',
  },
  
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
    padding: '16px 24px',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: '1rem',
  },
  
  tableRowEditing: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  
  tableCell: {
    padding: '8px 16px',
  },
  
  editButton: {
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    padding: '8px 16px',
    cursor: 'pointer',
    marginRight: '8px',
    transition: 'background-color 0.3s ease',
  },
  
  deleteButton: {
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  
  emptyIcon: {
    fontSize: '6rem',
    marginBottom: '24px',
  },
  
  emptyTitle: {
    fontSize: '2rem',
    marginBottom: '12px',
  },
  
  emptyText: {
    fontSize: '1.2rem',
  },
  
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#8b5cf6',
    fontWeight: '700',
    fontSize: '1.5rem',
  },
  
  loadingSpinner: {
    border: '8px solid #2d1b69',
    borderTop: '8px solid #8b5cf6',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    animation: 'spin 1.5s linear infinite',
    marginBottom: '20px',
  },
  
  loadingText: {
    fontWeight: '700',
    fontSize: '1.2rem',
  },
  
  loadingTableContainer: {
    padding: '40px',
    textAlign: 'center',
  },
  
  loadingTableText: {
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#8b5cf6',
  },
  
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1a1f3a',
  },
  
  errorMessage: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: '2rem',
  },

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  '@keyframes slideIn': {
    '0%': { opacity: 0, transform: 'translateY(-20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },

  '@keyframes sparkle': {
    '0%, 100%': { backgroundPosition: '0 0' },
    '50%': { backgroundPosition: '200px 100px' },
  },

  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-15px)' },
  },
};

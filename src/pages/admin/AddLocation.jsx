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

const LOCATIONIQ_TOKEN = 'YOUR_LOCATIONIQ_TOKEN'; // ⬅ استبدلها بمفتاحك من LocationIQ

export default function LocationPicker() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAhYcftcBcRbJnpSO0wcWryScwNqEXrdtc' // هذا فقط لتحميل الخريطة، مو للتعريب
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [venueName, setVenueName] = useState('');

  // ✅ استخدام LocationIQ للـ Reverse Geocoding
  const getAddressFromCoords = async (lat, lng) => {
    try {
    const response = await fetch(
  `https://us1.locationiq.com/v1/reverse?key=pk.d083c2bfeb1564d1f877e7bc3d93cf2c&lat=${lat}&lon=${lng}&format=json`
);

      const data = await response.json();
      console.log('LocationIQ data:', data);
      return data.display_name || '';
    } catch (err) {
      console.error('خطأ في جلب العنوان من LocationIQ:', err);
      return '';
    }
  };

  // عند الضغط على الخريطة
  const onMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedPosition({ lat, lng });

    const address = await getAddressFromCoords(lat, lng);
    setVenueName(address); // إدخال تلقائي للاسم
  };

  // الحفظ
  const saveLocation = () => {
    if (!venueName || !selectedPosition) {
      alert('يرجى إدخال اسم المكان واختيار الموقع على الخريطة');
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
          throw new Error(errorMsg || 'فشل الحفظ');
        }
        return res.json();
      })
      .then(() => {
        alert('تم حفظ الموقع بنجاح!');
        setVenueName('');
        setSelectedPosition(null);
      })
      .catch(err => {
        console.error(err);
        alert('خطأ: ' + err.message);
      });
  };

  if (loadError) return <div>حدث خطأ أثناء تحميل الخريطة</div>;
  if (!isLoaded) return <div>جاري تحميل الخريطة...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="اسم المكان"
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
        حفظ الموقع
      </button>
    </div>
  );
}
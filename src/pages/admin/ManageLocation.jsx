import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "400px",
};

const defaultCenter = {
  lat: 33.88863,
  lng: 35.49548,
};

const LOCATIONIQ_TOKEN = "d083c2bfeb1564d1f877e7bc3d93cf2c";

export default function ManageLocations() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAhYcftcBcRbJnpSO0wcWryScwNqEXrdtc",
  });

  // المواقع المخزنة
  const [locations, setLocations] = useState([]);

  // الموقع المختار حالياً (لإنشاء جديد أو تعديل)
  const [selectedPosition, setSelectedPosition] = useState(null);

  // عنوان الموقع (لإنشاء أو تعديل)
  const [venueName, setVenueName] = useState("");

  // لتحميل البيانات
  const [loading, setLoading] = useState(false);

  // لتحميل العنوان من الإحداثيات (Reverse Geocoding)
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

  // جلب المواقع من الـ API
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

  // عند النقر على الخريطة لاختيار موقع جديد أو لتعديل
  const onMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedPosition({ lat, lng });

    const address = await getAddressFromCoords(lat, lng);
    setVenueName(address);
  };

  // حفظ موقع جديد أو تحديث موقع موجود
  const saveLocation = async () => {
    if (!venueName || !selectedPosition) {
      alert("يرجى إدخال اسم المكان وتحديد الموقع على الخريطة");
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
        // تحديث موقع
        res = await fetch(`http://localhost:8081/api/locations/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // إنشاء موقع جديد
        res = await fetch("http://localhost:8081/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "فشل الحفظ");
      }

      alert(editingId ? "تم تحديث الموقع" : "تم حفظ الموقع بنجاح");
      setVenueName("");
      setSelectedPosition(null);
      setEditingId(null);
      fetchLocations();
    } catch (error) {
      alert("خطأ: " + error.message);
    }
  };

  // حذف موقع
  const deleteLocation = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الموقع؟")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/locations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");
      alert("تم حذف الموقع");
      fetchLocations();
    } catch (error) {
      alert("خطأ: " + error.message);
    }
  };

  // لتتبع هل نقوم بالتعديل (وإظهار زر تحديث بدلاً من حفظ جديد)
  const [editingId, setEditingId] = useState(null);

  // عند الضغط على زر تعديل في القائمة
  const onEdit = (location) => {
    setVenueName(location.venueName);
    setSelectedPosition({
      lat: location.latitude,
      lng: location.longitude,
    });
    setEditingId(location.id);
  };

  if (loadError) return <div>خطأ في تحميل الخريطة</div>;
  if (!isLoaded) return <div>جاري تحميل الخريطة...</div>;

  return (
    <div>
      <h2>إدارة المواقع</h2>

      <input
        type="text"
        placeholder="اسم المكان"
        value={venueName}
        onChange={(e) => setVenueName(e.target.value)}
        style={{ marginBottom: 10, padding: 8, width: 300 }}
      />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedPosition || defaultCenter}
        zoom={selectedPosition ? 14 : 10}
        onClick={onMapClick}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>

      <button
        onClick={saveLocation}
        style={{ marginTop: 10, padding: "8px 16px" }}
        disabled={!venueName || !selectedPosition}
      >
        {editingId ? "تحديث الموقع" : "حفظ الموقع"}
      </button>

      <h3 style={{ marginTop: 30 }}>قائمة المواقع</h3>
      {loading ? (
        <p>جاري تحميل المواقع...</p>
      ) : (
        <table border={1} cellPadding={8} style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>العرض</th>
              <th>الطول</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {locations.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  لا توجد مواقع محفوظة
                </td>
              </tr>
            )}
            {locations.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.venueName}</td>
                <td>{loc.latitude.toFixed(6)}</td>
                <td>{loc.longitude.toFixed(6)}</td>
                <td>
                  <button onClick={() => onEdit(loc)}>تعديل</button>{" "}
                  <button onClick={() => deleteLocation(loc.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

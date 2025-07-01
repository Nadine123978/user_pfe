import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";

export default function AdminEventImagesManager() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [images, setImages] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);

  // جلب الأحداث من backend مرة وحدة عند تحميل الصفحة
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
        alert("خطأ في تحميل الأحداث");
      }
    };
    fetchEvents();
  }, []);

  // تحميل الصور من backend حسب الـ eventId
  const loadImagesForEvent = async (eventId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/events/${eventId}/images`
      );
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      alert("خطأ في تحميل الصور");
    }
  };

  // لما تختار حدث
  const handleManageImages = (event) => {
    setSelectedEvent(event);
    loadImagesForEvent(event.id);
  };

  const handleCloseManage = () => {
    setSelectedEvent(null);
    setImages([]);
  };

  // حذف صورة عبر الـ backend
  const handleDeleteImage = async (imageId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/events/images/${imageId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      // بعد الحذف، اعادة تحميل الصور
      await loadImagesForEvent(selectedEvent.id);
    } catch (error) {
      console.error(error);
      alert("فشل حذف الصورة");
    }
  };

  // فتح نافذة رفع الصور
  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  // إغلاق نافذة رفع الصور
  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setUploadFiles([]);
  };

  // اختيار ملفات للرفع
  const handleFileChange = (e) => {
    setUploadFiles(Array.from(e.target.files));
  };

  // رفع الصور إلى backend
  const handleUploadImages = async () => {
    if (!uploadFiles.length) return;

    try {
      for (const file of uploadFiles) {
        const singleFormData = new FormData();
        singleFormData.append("file", file);

        const res = await fetch(
          `http://localhost:8081/api/events/${selectedEvent.id}/images`,
          {
            method: "POST",
            body: singleFormData,
          }
        );
        if (!res.ok) throw new Error("Upload failed");
      }

      // بعد الرفع، إعادة تحميل الصور
      await loadImagesForEvent(selectedEvent.id);
      handleCloseUploadDialog();
    } catch (error) {
      console.error(error);
      alert("فشل رفع الصور");
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .galactic-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0D0E2B 0%, #1A1B3A 50%, #2D1B69 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        
        .galactic-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
          animation: nebula 20s ease-in-out infinite alternate;
          z-index: 1;
        }
        
        @keyframes nebula {
          0% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.7;
          }
          100% { 
            transform: scale(1.1) rotate(2deg);
            opacity: 1;
          }
        }
        
        .floating-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #FFD700;
          border-radius: 50%;
          animation: float 15s infinite linear;
          box-shadow: 0 0 6px #FFD700;
        }
        
        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 8s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 10s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 12s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 14s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 16s; }
        
        @keyframes float {
          0% { 
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(10vh) scale(1);
          }
          100% { 
            transform: translateY(-10vh) scale(0);
            opacity: 0;
          }
        }
        
        .galactic-content {
          position: relative;
          z-index: 10;
          padding: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .galactic-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 3.5rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 50px;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          position: relative;
        }
        
        .galactic-title::after {
          content: '✨';
          position: absolute;
          top: -10px;
          right: -30px;
          font-size: 2rem;
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .galactic-title::before {
          content: '✨';
          position: absolute;
          top: -10px;
          left: -30px;
          font-size: 2rem;
          animation: sparkle 2s ease-in-out infinite reverse;
        }
        
        @keyframes sparkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
        }
        
        .event-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 25px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        
        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .event-card:hover::before {
          left: 100%;
        }
        
        .event-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(255, 215, 0, 0.6);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(255, 215, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .event-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-size: 1.8rem;
          color: #F0F0F0;
          margin-bottom: 15px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .event-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .galactic-button {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
          border: none;
          border-radius: 25px;
          padding: 12px 30px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #0D0E2B;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
        }
        
        .galactic-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }
        
        .galactic-button:hover::before {
          left: 100%;
        }
        
        .galactic-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(255, 215, 0, 0.4);
        }
        
        .galactic-button-secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 215, 0, 0.5);
          color: #FFD700;
        }
        
        .galactic-button-secondary:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: #FFD700;
        }
        
        .add-event-card {
          background: rgba(255, 215, 0, 0.05);
          border: 2px dashed rgba(255, 215, 0, 0.3);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .add-event-card:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.02);
        }
        
        .add-event-text {
          font-size: 1.2rem;
          color: #FFD700;
          font-weight: 600;
        }
        
        .gallery-container {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 40px;
          border: 1px solid rgba(255, 215, 0, 0.2);
          position: relative;
        }
        
        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 2.5rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .folder-path {
          color: rgba(240, 240, 240, 0.7);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 215, 0, 0.2);
        }
        
        .upload-button {
          background: linear-gradient(135deg, #FF00FF 0%, #8A2BE2 100%);
          border: none;
          border-radius: 25px;
          padding: 15px 30px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(255, 0, 255, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .upload-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(255, 0, 255, 0.4);
        }
        
        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        
        .image-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          aspect-ratio: 1;
        }
        
        .image-card:hover {
          transform: translateY(-10px) scale(1.05);
          border-color: rgba(255, 215, 0, 0.6);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(255, 215, 0, 0.3);
        }
        
        .image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }
        
        .image-card:hover img {
          transform: scale(1.1);
        }
        
        .delete-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 0, 0, 0.8);
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0);
        }
        
        .image-card:hover .delete-button {
          opacity: 1;
          transform: scale(1);
        }
        
        .delete-button:hover {
          background: rgba(255, 0, 0, 1);
          transform: scale(1.1);
        }
        
        .add-image-card {
          background: rgba(255, 215, 0, 0.05);
          border: 2px dashed rgba(255, 215, 0, 0.3);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          aspect-ratio: 1;
        }
        
        .add-image-card:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.05);
        }
        
        .add-image-text {
          font-size: 3rem;
          color: #FFD700;
          font-weight: 300;
        }
        
        .galactic-modal {
          background: rgba(13, 14, 43, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 215, 0, 0.3) !important;
          border-radius: 20px !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
        }
        
        .modal-title {
          font-family: 'Playfair Display', serif !important;
          font-weight: 700 !important;
          font-size: 1.8rem !important;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          text-align: center !important;
        }
        
        .modal-content {
          color: #F0F0F0 !important;
          padding: 20px !important;
        }
        
        .file-input {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 10px;
          padding: 15px;
          color: #F0F0F0;
          width: 100%;
          margin-top: 10px;
        }
        
        .file-input:focus {
          border-color: #FFD700;
          outline: none;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          .galactic-title {
            font-size: 2.5rem;
          }
          
          .galactic-content {
            padding: 20px;
          }
          
          .event-card {
            padding: 20px;
          }
          
          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .images-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
          }
        }
      `}</style>

      <div className="galactic-container">
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="galactic-content">
          {!selectedEvent ? (
            <>
              <h1 className="galactic-title">Galactic Event Console</h1>
              <div>
                {events.map((ev) => (
                  <div key={ev.id} className="event-card">
                    <h2 className="event-title">{ev.title}</h2>
                    <div className="event-actions">
                      <button
                        className="galactic-button"
                        onClick={() => handleManageImages(ev)}
                      >
                        🎨 Manage Gallery
                      </button>
                    </div>
                  </div>
                ))}
                <div className="add-event-card">
                  <div className="add-event-text">✨ Add New Event</div>
                </div>
              </div>
            </>
          ) : (
            <div className="gallery-container">
              <div className="gallery-header">
                <h2 className="gallery-title">
                  Curating "{selectedEvent.title}"
                </h2>
                <button
                  className="galactic-button galactic-button-secondary"
                  onClick={handleCloseManage}
                >
                  ← Back to Console
                </button>
              </div>

              <div className="folder-path">
                📁 Folder Path: /events/{selectedEvent.id}/
              </div>

              <button
                className="upload-button"
                onClick={handleOpenUploadDialog}
              >
                <UploadIcon />
                Upload Cosmic Images
              </button>

              <div className="images-grid">
                {images.map((img) => (
                  <div key={img.id} className="image-card">
                    <img
                      src={`http://localhost:8081${img.imageUrl}`}
                      alt={`Event Image ${img.id}`}
                      onClick={() => window.open(img.imageUrl, "_blank")}
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      <DeleteIcon style={{ color: 'white', fontSize: '18px' }} />
                    </button>
                  </div>
                ))}

                <div className="add-image-card" onClick={handleOpenUploadDialog}>
                  <div className="add-image-text">+</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Dialog */}
        <Dialog 
          open={uploadDialogOpen} 
          onClose={handleCloseUploadDialog}
          PaperProps={{
            className: "galactic-modal"
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="modal-title">
            Upload Cosmic Images
          </DialogTitle>
          <DialogContent className="modal-content">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </DialogContent>
          <DialogActions style={{ padding: '20px', gap: '15px' }}>
            <button 
              className="galactic-button galactic-button-secondary"
              onClick={handleCloseUploadDialog}
            >
              Cancel
            </button>
            <button
              className="galactic-button"
              onClick={handleUploadImages}
              disabled={uploadFiles.length === 0}
            >
              🚀 Upload to Galaxy
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}


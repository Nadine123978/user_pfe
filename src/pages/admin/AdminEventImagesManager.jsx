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
  // باقي الحالات...

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

  const [images, setImages] = useState([]); // Array of objects {id, imageUrl}
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);

  // تحميل الصور من backend حسب الـ eventId
  const loadImagesForEvent = async (eventId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/events/${eventId}/images`
      );
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      // البيانات المفروض تجي بشكل: [{id, imageUrl}, ...]
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
      const formData = new FormData();
      uploadFiles.forEach((file) => formData.append("file", file));

      // ملاحظة: ال backend عندك يستقبل ملف واحد بالـ MultipartFile. 
      // إذا تريد رفع أكثر من ملف، يجب تعديل backend أو رفع ملف واحد في كل طلب.
      // هنا سأرفع الصور واحدة واحدة

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
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {!selectedEvent ? (
        <>
          <Typography variant="h5" gutterBottom>
            Events List
          </Typography>
          <Stack spacing={2}>
            {events.map((ev) => (
              <Box
                key={ev.id}
                sx={{
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{ev.title}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleManageImages(ev)}
                >
                  Manage Images
                </Button>
              </Box>
            ))}
            <Button variant="outlined" color="primary">
              + Add New Event
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              Manage Images for {selectedEvent.title}
            </Typography>
            <Button variant="outlined" onClick={handleCloseManage}>
              Back to Events
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Folder Path: /events/{selectedEvent.id}/
          </Typography>

          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={handleOpenUploadDialog}
            sx={{ mb: 3 }}
          >
            Upload Images
          </Button>

          <Grid container spacing={2}>
            {images.map((img) => (
              <Grid item key={img.id}>
                <Card sx={{ width: 150, position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="100"
                  image={`http://localhost:8081${img.imageUrl}`}

                    alt={`Event Image ${img.id}`}
                    sx={{ cursor: "pointer", objectFit: "cover" }}
                    onClick={() => window.open(img.imageUrl, "_blank")}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      bgcolor: "rgba(255,255,255,0.7)",
                    }}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}

            <Grid item>
              <Card
                sx={{
                  width: 150,
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "2px dashed gray",
                }}
                onClick={handleOpenUploadDialog}
              >
                <Typography variant="h4" color="gray">
                  +
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Upload Dialog */}
          <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog}>
            <DialogTitle>Upload Images</DialogTitle>
            <DialogContent>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginTop: 8 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUploadDialog}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleUploadImages}
                disabled={uploadFiles.length === 0}
              >
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

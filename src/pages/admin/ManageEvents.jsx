import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import axios from "axios";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState("draft");

  const tabs = ["draft", "active", "upcoming", "past"];

  const fetchEvents = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/events/by-status?status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // فرز الأحداث حسب تاريخ البداية تصاعدي
      setEvents(
        response.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        )
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(selectedTab);
  }, [selectedTab]);

  const handlePublish = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8081/api/events/${eventId}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event published successfully!");

      // إعادة تحميل الأحداث بعد التحديث
      fetchEvents(selectedTab);
    } catch (error) {
      console.error("Error publishing event:", error);
      alert("Failed to publish event.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Events - {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
      </Typography>

      {/* التابات للتبديل بين الحالات */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "contained" : "outlined"}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </Box>

      {/* عرض الأحداث */}
      <Grid container spacing={3}>
        {events.length === 0 ? (
          <Typography variant="h6" sx={{ m: 2 }}>
            No events found.
          </Typography>
        ) : (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:8081/uploads/${event.image}`}
                  alt={event.title || event.eventName}
                  onError={(e) => {
                    e.target.src = "/placeholder.png"; // صورة افتراضية لو الصورة مفقودة
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{event.title || event.eventName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    From: {new Date(event.startDate).toLocaleString()} <br />
                    To: {new Date(event.endDate).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Status: {event.status.toUpperCase()}
                  </Typography>

                  {/* زر النشر فقط للأحداث في المسودة */}
                  {event.status === "draft" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 1 }}
                      onClick={() => handlePublish(event.id)}
                    >
                      Publish
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ManageEvents;

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
  const [selectedTab, setSelectedTab] = useState("active");

  const tabs = ["active", "upcoming", "draft", "past"];

  // ✅ Function منفصلة لجلب الأحداث حسب الـ tab
  const fetchEvents = async (status) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/events/by-status?status=${status}`
      );
      setEvents(
        response.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        )
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // ✅ بتم الاستدعاء لما تتغير الـ tab
  useEffect(() => {
    fetchEvents(selectedTab);
  }, [selectedTab]);

  // ✅ النشر وتحديث الواجهة
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

      // إعادة جلب الأحداث حسب الـ tab الحالي
      fetchEvents(selectedTab);

      alert("Event published successfully!");
    } catch (error) {
      console.error("Error publishing event:", error);
      alert("Failed to publish event.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Events - {selectedTab.toUpperCase()}
      </Typography>

      {/* Tabs */}
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

      {/* Cards */}
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
                  alt={event.eventName}
                  onError={(e) => {
                    e.target.src = "/placeholder.png"; // صورة افتراضية بحال ما اشتغلت
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{event.eventName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    From: {new Date(event.startDate).toLocaleDateString()} - To:{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Status: {event.status.toUpperCase()}
                  </Typography>

                  {/* زر النشر يظهر فقط إذا لم يكن Active */}
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

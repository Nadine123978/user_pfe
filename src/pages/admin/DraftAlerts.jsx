import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DraftAlerts from "./DraftAlerts";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState("draft");
  const navigate = useNavigate();

  const tabs = ["draft", "active", "upcoming", "past"];

  // جلب الأحداث حسب الحالة المختارة
  const fetchEvents = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/events/by-status?status=${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // ترتيب حسب تاريخ البداية
      setEvents(
        response.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        )
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // جلب الأحداث كل مرة تتغير التبويبة
  useEffect(() => {
    fetchEvents(selectedTab);
  }, [selectedTab]);

  // دالة نشر الحدث (تغيير الحالة من draft إلى active)
  const handlePublish = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8081/api/events/${eventId}/publish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Event published successfully!");
      fetchEvents(selectedTab); // تحديث الأحداث بعد النشر
    } catch (error) {
      console.error("Error publishing event:", error);
      const errMsg = error.response?.data || "Failed to publish event.";
      alert(errMsg);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* عرض التنبيه للمسودات القديمة */}
      <DraftAlerts />

      <Typography variant="h4" gutterBottom>
        Events - {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
      </Typography>

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
                  image={event.imageUrl || "/placeholder.png"}
                  alt={event.title}
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    From: {new Date(event.startDate).toLocaleString()} <br />
                    To: {new Date(event.endDate).toLocaleString()}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      color:
                        event.status === "draft"
                          ? "gray"
                          : event.status === "active"
                          ? "green"
                          : event.status === "upcoming"
                          ? "blue"
                          : "red",
                    }}
                  >
                    Status: {event.status.toUpperCase()}
                  </Typography>

                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    {event.status === "draft" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePublish(event.id)}
                      >
                        Publish
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/edit-event/${event.id}`)}
                    >
                      Edit
                    </Button>
                  </Box>
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

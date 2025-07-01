import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ManageEvents = () => {
    console.log("ManageEvents loaded");
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState("draft");
  const [searchQuery, setSearchQuery] = useState("");

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
    console.log("Events fetched:", response.data);  // <— هاي طبعاً للتصحيح والتأكد
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
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    toast.success("Event published successfully");
    fetchEvents(selectedTab);
  } catch (error) {
    console.error("Error publishing event:", error.response?.data || error.message);
    toast.error("Failed to publish event");
  }
};


  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event deleted successfully!");
      fetchEvents(selectedTab);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Events - {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "contained" : "outlined"}
            onClick={() => {
              setSearchQuery("");
              setSelectedTab(tab);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </Box>


      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search by title"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredEvents.length === 0 ? (
          <Typography variant="h6" sx={{ m: 2 }}>
            No events found.
          </Typography>
        ) : (
          filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  backgroundColor:
                    event.status === "draft"
                      ? "#f5f5f5"
                      : event.status === "active"
                      ? "#e8f5e9"
                      : event.status === "upcoming"
                      ? "#e3f2fd"
                      : "#ffebee",
                }}
              >
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

                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`/admin/edit-event/${event.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => alert("Preview not implemented yet.")}
                    >
                      Preview
                    </Button>
                    {event.status === "draft" && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlePublish(event.id)}
                        >
                          Publish
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
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

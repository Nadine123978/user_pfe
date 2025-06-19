import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const EventCount = ({ selectedTab, onTabChange , onCountUpdate }) => {
  const [eventCounts, setEventCounts] = useState({
    active: 0,
    draft: 0,
    past: 0,
  });

  // جلب الأعداد من السيرفر
  useEffect(() => {
    const fetchEventCounts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/events/count");
        setEventCounts(response.data);
      } catch (error) {
        console.error("Error fetching event counts", error);
      }
    };
  
    fetchEventCounts();
  
    // ✅ إذا في دالة تحديث خارجية، خليها تنادي هذا
    if (typeof onCountUpdate === "function") {
      onCountUpdate(fetchEventCounts);
    }
  
  }, []);
  // استعلام مرة واحدة عند تحميل المكون

  return (
    <>
      {["active", "draft", "past"].map((tab) => (
        <Button
          key={tab}
          variant={selectedTab === tab ? "contained" : "outlined"}
          color="secondary"
          onClick={() => onTabChange(tab)} // تغيير الـ tab عند النقر
          sx={{
            borderRadius: "20px",
            padding: "10px 20px",
            backgroundColor: selectedTab === tab ? "#F36BF9" : "",
            color: selectedTab === tab ? "#fff" : "",
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)} ({eventCounts[tab]})
        </Button>
      ))}
    </>
  );
};

export default EventCount;

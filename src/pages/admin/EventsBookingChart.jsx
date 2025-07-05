import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

// Register FusionCharts modules
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function EventsBookingChart({ onClose }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/events/events-bookings")
      .then(res => {
              console.log("API data:", res.data);  // تفقد البيانات هنا
        // نفترض response عبارة عن مصفوفة من الأحداث مع عدد الحجوزات
        const chartData = res.data.map(event => ({
          label: event.eventName,
          value: event.bookingCount
        }));
        setData(chartData);
      })
      .catch(err => {
        console.error("Error fetching events bookings:", err);
      });
  }, []);

  const chartConfigs = {
    type: "pie2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Bookings per Event",
        theme: "fusion",
        showPercentValues: 1,
        decimals: 0,
        pieRadius: "45%"
      },
      data: data
    }
  };

  return (
    <div style={{ background: "#0f172a", padding: 20, borderRadius: 12, color: "white" }}>
      <h2>Event Bookings Chart</h2>
      <ReactFC {...chartConfigs} />
      <button onClick={onClose} style={{ marginTop: 20, padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>
        Close
      </button>
    </div>
  );
}

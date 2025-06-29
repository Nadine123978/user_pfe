import React, { useState } from "react";
import { Box } from "@mui/material";
import EmailList from "../../components/admin/EmailList";
import Sidebar from "./SidebarInbox";
import EmailContent from "../../components/admin/EmailContent";

const event = {
  title: "Rhythm & Beats Music Festival",
};

export default function EmailInterface() {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: "250px",
      
        display: "flex",
        flexDirection: "column",
      }}
    >
    

      <Box display="flex" gap={4} mt={2} alignItems="flex-start">
        <Sidebar />

        {/* خصص flex لكل جزء */}
        <EmailList
          onSelectMessage={setSelectedMessage}
          selectedMessage={selectedMessage}
        />

        <EmailContent message={selectedMessage} />
      </Box>
    </Box>
  );
}
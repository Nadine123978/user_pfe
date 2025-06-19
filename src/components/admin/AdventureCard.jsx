import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const AdventureCard = ({ event, onDelete, onUpdate }) => {
  if (!event) return null;

  const {
    id,
    title,
    description,
    date,
    category,
    location,
    totalTickets,
    soldTickets,
    status,
    imageUrl,
  } = event;

  const progress = totalTickets > 0 ? (soldTickets / totalTickets) * 100 : 0;
  const navigate = useNavigate();

  const handleBlur = (field, value) => {
    if (onUpdate && value !== event[field]) {
      onUpdate(id, field, value);
    }
  };

  return (
    <Card
      key={id}
      onClick={() => navigate(`/event/${id}`)} // ✅ fixed route string
      sx={{
        cursor: "pointer",
        borderRadius: 5,
        width: 270,
        bgcolor: "#fefcff",
        overflow: "hidden",
        boxShadow: 4,
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={
          imageUrl?.startsWith("http")
            ? imageUrl
            : `http://localhost:8081${imageUrl}` // ✅ fixed string template
        }
        alt={title || "Event Image"}
      />
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={`Category: ${category?.name || "?"}`} // ✅ fixed template string
            size="small"
            sx={{
              bgcolor: "#e3e2fb",
              color: "#4a4bc4",
              fontWeight: "bold",
              borderRadius: 2,
            }}
          />
          <Chip
            label={status?.charAt(0).toUpperCase() + status?.slice(1)}
            size="small"
            sx={{
              bgcolor: "#fce4fd",
              color: "#d600c0",
              fontWeight: "bold",
              borderRadius: 2,
            }}
          />
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {new Date(date).toLocaleString()}
        </Typography>

        {/* Editable Title */}
        <Typography
          variant="h6"
          sx={{ mt: 0.5, fontWeight: "bold" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur("title", e.target.innerText)}
        >
          {title}
        </Typography>

        {/* Editable Description */}
        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "text.secondary" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur("description", e.target.innerText)}
        >
          {description}
        </Typography>

        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
        >
          📍 {location?.venueName || "Unknown"}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 5,
              bgcolor: "#eee",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#b057fc",
              },
            }}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {Math.round(progress)}%
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              sx={{ fontWeight: "bold" }}
            >
              {soldTickets}/{totalTickets}
            </Typography>
          </Stack>
        </Box>

        {/* Delete Button */}
        <IconButton
          color="error"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default AdventureCard;

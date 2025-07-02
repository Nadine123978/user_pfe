import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// ثيم بنفسجي-أزرق مخصص (cosmic design)
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',  // بنفسجي أزرق
    },
    secondary: {
      main: '#06b6d4',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #6366f1',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), 0 8px 32px rgba(99, 102, 241, 0.2)',
              transform: 'translateY(-2px)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
          '&.MuiButton-outlined': {
            border: '1px solid rgba(99, 102, 241, 0.5)',
            color: '#6366f1',
            '&:hover': {
              border: '1px solid #6366f1',
              background: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            transform: 'translateY(-2px)',
          },
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            color: '#ffffff',
            border: '1px solid #6366f1',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#6366f1',
          fontWeight: 700,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#6366f1',
            '& + .MuiSwitch-track': {
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
            },
          },
        },
      },
    },
  },
});


const GlassmorphismPaper = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '1200px',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `
      0 16px 64px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
});

const SelectionModeContainer = styled(Box)({
  background: 'rgba(99, 102, 241, 0.1)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '32px',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
});

const SeatGridContainer = styled(Box)({
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '16px',
  padding: '32px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'inline-block',
  margin: '0 auto',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
});

const SeatButton = styled(Box)(({ selected, vip, reserved, rowSelected, colSelected }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 600,
  fontSize: '0.85rem',
  transition: 'all 0.3s ease',
  position: 'relative',
  border: '2px solid transparent',
  background: vip 
    ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
    : reserved 
    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    : 'rgba(255, 255, 255, 0.1)',
  color: vip || reserved ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
  boxShadow: vip 
    ? '0 4px 20px rgba(251, 191, 36, 0.3)'
    : reserved 
    ? '0 4px 20px rgba(239, 68, 68, 0.3)'
    : '0 4px 16px rgba(0, 0, 0, 0.2)',
  ...(selected && {
    border: '2px solid #6366f1',
    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.3), 0 8px 32px rgba(99, 102, 241, 0.4)',
    animation: 'selectedPulse 2s ease-in-out infinite',
  }),
  ...(rowSelected && {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
    border: '2px solid rgba(99, 102, 241, 0.5)',
  }),
  ...(colSelected && {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
    border: '2px solid rgba(99, 102, 241, 0.5)',
  }),
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: vip 
      ? '0 8px 32px rgba(251, 191, 36, 0.4)'
      : reserved 
      ? '0 8px 32px rgba(239, 68, 68, 0.4)'
      : '0 8px 32px rgba(99, 102, 241, 0.3)',
  },
  '@keyframes selectedPulse': {
    '0%, 100%': { 
      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.3), 0 8px 32px rgba(99, 102, 241, 0.4)',
    },
    '50%': { 
      boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.4), 0 12px 40px rgba(99, 102, 241, 0.5)',
    },
  },
}));

// Styled components للستايل الجميل
const CosmicContainer = styled('div')({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
});

const FloatingParticles = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: 'sparkle 3s linear infinite',
  },
  '&::before': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '60%',
    right: '15%',
    animationDelay: '1.5s',
    background: '#06b6d4',
  },
  '@keyframes sparkle': {
    '0%, 100%': { opacity: 0, transform: 'scale(0)' },
    '50%': { opacity: 1, transform: 'scale(1)' },
  },
});

const FormTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '2rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '32px',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
    borderRadius: '2px',
  },
});

const FormGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  marginBottom: '32px',
});

const ColorInputContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const ColorInputLabel = styled('label')({
  fontFamily: '"Inter", sans-serif',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.95rem',
});

const CosmicColorInput = styled('input')({
  width: '100%',
  height: '56px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    border: '1px solid rgba(99, 102, 241, 0.3)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
  },
  '&:focus': {
    outline: 'none',
    border: '1px solid #6366f1',
    boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const SectionListContainer = styled('div')({
  background: 'rgba(99, 102, 241, 0.05)',
  borderRadius: '16px',
  padding: '24px',
  marginTop: '32px',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
});

const SectionListTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '20px',
  textAlign: 'center',
});

const SectionItem = styled('div')({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px) scale(1.01)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    background: 'rgba(99, 102, 241, 0.1)',
  },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
  },
});

const SectionInfo = styled('div')({
  flex: 1,
});

const SectionName = styled('div')({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: '#ffffff',
  marginBottom: '4px',
});

const SectionDetails = styled('div')({
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const SectionActions = styled('div')({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

const ActionButton = styled(Button)(({ variant }) => ({
  fontSize: '0.85rem',
  padding: '8px 16px',
  minWidth: 'auto',
  ...(variant === 'view' && {
    background: 'rgba(6, 182, 212, 0.2)',
    color: '#06b6d4',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    '&:hover': {
      background: 'rgba(6, 182, 212, 0.3)',
      transform: 'translateY(-1px)',
    },
  }),
  ...(variant === 'edit' && {
    background: 'rgba(245, 158, 11, 0.2)',
    color: '#f59e0b',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    '&:hover': {
      background: 'rgba(245, 158, 11, 0.3)',
      transform: 'translateY(-1px)',
    },
  }),
  ...(variant === 'delete' && {
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    '&:hover': {
      background: 'rgba(239, 68, 68, 0.3)',
      transform: 'translateY(-1px)',
    },
  }),
}));

const ColorSwatch = styled('span')(({ color }) => ({
  display: 'inline-block',
  width: '16px',
  height: '16px',
  backgroundColor: color,
  borderRadius: '4px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
}));


const RowLabel = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontWeight: 600,
  width: '32px',
  textAlign: 'center',
  fontSize: '1rem',
});

const LegendContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '32px',
  marginTop: '24px',
  flexWrap: 'wrap',
});

const LegendItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'rgba(255, 255, 255, 0.8)',
  fontWeight: 500,
  fontSize: '0.9rem',
});

const LegendSeat = styled(Box)(({ vip, reserved }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '6px',
  background: vip 
    ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
    : reserved 
    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    : 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
}));

const ErrorText = styled(Typography)({
  color: '#ef4444',
  fontWeight: 500,
  marginTop: '8px',
  textAlign: 'center',
});

const SeatGrid = ({ section }) => {
  if (!section) return <Typography color="error">Section not loaded</Typography>;

  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectionMode, setSelectionMode] = useState("single");
  const [selectedRowOrCol, setSelectedRowOrCol] = useState(null);
  const [tempPrice, setTempPrice] = useState("");
  const [tempVIP, setTempVIP] = useState(false);
  const [tempColor, setTempColor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (section?.id) {
      axios
        .get(`http://localhost:8081/api/seats/section/${section.id}`)
        .then((res) => {
          const seatsWithColor = res.data.map((seat) => ({
            ...seat,
            color: seat.color || section.color || "#6c757d",
          }));
          setSeats(seatsWithColor);
        })
        .catch((err) => console.error("Error fetching seats:", err));
    }
  }, [section]);

  useEffect(() => {
    if (selectionMode === "single" && selectedSeat) {
      setTempPrice(selectedSeat.price.toString());
      setTempVIP(selectedSeat.vip || false);
      setTempColor(selectedSeat.color || section.color || "#6c757d");
      setError("");
      setSelectedRowOrCol(null);
    } else if (selectionMode === "row" && selectedRowOrCol != null) {
      const seatsInRow = seats.filter((s) => s.row === selectedRowOrCol);
      if (seatsInRow.length > 0) {
        setTempPrice(seatsInRow[0].price.toString());
        setTempVIP(seatsInRow[0].vip || false);
        setTempColor(seatsInRow[0].color || section.color || "#6c757d");
        setError("");
      }
      setSelectedSeat(null);
    } else if (selectionMode === "col" && selectedRowOrCol != null) {
      const seatsInCol = seats.filter((s) => s.number === selectedRowOrCol);
      if (seatsInCol.length > 0) {
        setTempPrice(seatsInCol[0].price.toString());
        setTempVIP(seatsInCol[0].vip || false);
        setTempColor(seatsInCol[0].color || section.color || "#6c757d");
        setError("");
      }
      setSelectedSeat(null);
    } else {
      setTempPrice("");
      setTempVIP(false);
      setTempColor(section.color || "#6c757d");
      setError("");
      setSelectedSeat(null);
      setSelectedRowOrCol(null);
    }
  }, [selectionMode, selectedSeat, selectedRowOrCol, seats, section.color]);

  const maxRow = Math.max(...seats.map((s) => s.row), 0);
  const maxCol = Math.max(...seats.map((s) => s.number), 0);
  const grid = [];

  for (let r = 1; r <= maxRow; r++) {
    const rowSeats = [];
    for (let c = 1; c <= maxCol; c++) {
      const seat = seats.find((s) => s.row === r && s.number === c);
      rowSeats.push(seat || null);
    }
    grid.push(rowSeats);
  }

  const handleSeatClick = (seat) => {
    if (selectionMode === "single") {
      setSelectedSeat(seat);
      setSelectedRowOrCol(null);
    } else if (selectionMode === "row") {
      setSelectedRowOrCol(seat.row);
      setSelectedSeat(null);
    } else if (selectionMode === "col") {
      setSelectedRowOrCol(seat.number);
      setSelectedSeat(null);
    }
  };

  const handleSave = async () => {
    const priceNum = parseFloat(tempPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Please enter a valid price");
      return;
    }
    if (priceNum > section.price) {
      setError(`Price cannot exceed section price of $${section.price.toFixed(2)}`);
      return;
    }

    let seatsToUpdate = [];

    if (selectionMode === "single" && selectedSeat) {
      seatsToUpdate = [selectedSeat];
    } else if (selectionMode === "row" && selectedRowOrCol != null) {
      seatsToUpdate = seats.filter((s) => s.row === selectedRowOrCol);
    } else if (selectionMode === "col" && selectedRowOrCol != null) {
      seatsToUpdate = seats.filter((s) => s.number === selectedRowOrCol);
    } else {
      setError("No seat or row/column selected");
      return;
    }

    try {
      await Promise.all(
        seatsToUpdate.map((seat) =>
          axios.put(`http://localhost:8081/api/seats/${seat.id}`, {
            ...seat,
            price: priceNum,
            vip: tempVIP,
            color: tempColor,
          })
        )
      );

      setSeats((prev) =>
        prev.map((s) =>
          seatsToUpdate.find((upd) => upd.id === s.id)
            ? { ...s, price: priceNum, vip: tempVIP, color: tempColor }
            : s
        )
      );

      setSelectedSeat(null);
      setSelectedRowOrCol(null);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Failed to update seat(s)");
    }
  };

  const handleClose = () => {
    setSelectedSeat(null);
    setSelectedRowOrCol(null);
    setError("");
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <GlassmorphismPaper>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: '3rem', mb: 2 }}>
              Cosmic Seat Manager 
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
              Configure your galactic seating arrangements with stellar precision
            </Typography>
          </Box>

          <SelectionModeContainer>
            <Typography sx={{ 
              fontWeight: 600, 
              color: 'rgba(255, 255, 255, 0.9)', 
              mb: 2, 
              fontSize: '1.1rem',
              textAlign: 'center'
            }}>
              Selection Mode
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ToggleButtonGroup
                value={selectionMode}
                exclusive
                onChange={(e, newMode) => newMode && setSelectionMode(newMode)}
                sx={{ gap: 1 }}
              >
                <ToggleButton value="single">Single Seat</ToggleButton>
                <ToggleButton value="row">Entire Row</ToggleButton>
                <ToggleButton value="col">Entire Column</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </SelectionModeContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <SeatGridContainer>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                {grid.map((row, rowIndex) => (
                  <Box key={rowIndex} sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <RowLabel>{rowIndex + 1}</RowLabel>
                    {row.map((seat, colIndex) => (
                      <SeatButton
                        key={colIndex}
                        selected={selectedSeat?.id === seat?.id}
                        vip={seat?.vip}
                        reserved={seat?.reserved}
                        rowSelected={selectionMode === "row" && selectedRowOrCol === seat?.row}
                        colSelected={selectionMode === "col" && selectedRowOrCol === seat?.number}
                        onClick={() => seat && handleSeatClick(seat)}
                        sx={{ 
                          opacity: seat ? 1 : 0.3,
                          cursor: seat ? 'pointer' : 'default'
                        }}
                      >
                        {seat ? seat.number : ''}
                      </SeatButton>
                    ))}
                  </Box>
                ))}
              </Box>

              <LegendContainer>
                <LegendItem>
                  <LegendSeat />
                  <span>Available</span>
                </LegendItem>
                <LegendItem>
                  <LegendSeat vip />
                  <span>VIP</span>
                </LegendItem>
                <LegendItem>
                  <LegendSeat reserved />
                  <span>Reserved</span>
                </LegendItem>
              </LegendContainer>
            </SeatGridContainer>
          </Box>

          {error && <ErrorText>{error}</ErrorText>}
        </GlassmorphismPaper>

        <Dialog 
          open={selectedSeat || selectedRowOrCol !== null} 
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            🎫 Configure Seat Properties
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Price ($)"
              type="number"
              fullWidth
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
              sx={{ mb: 2, mt: 1 }}
            />
            <TextField
              label="Color"
              type="color"
              fullWidth
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              sx={{ mb: 2 }}
            />
          
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </CosmicContainer>
    </ThemeProvider>
  );
};




const AddSectionForm = ({ eventId }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionColor, setSectionColor] = useState("#6366f1");
  const [sectionPrice, setSectionPrice] = useState("");
  const [numberOfRows, setNumberOfRows] = useState("");
  const [numberOfColumns, setNumberOfColumns] = useState("");
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetchSections();
    }
  }, [eventId]);

  const fetchSections = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/sections/event/${eventId}`);
      setSections(res.data);
    } catch (error) {
      console.error("Failed to fetch sections", error);
    }
  };

  const resetForm = () => {
    setSectionName("");
    setSectionColor("#6366f1");
    setSectionPrice("");
    setNumberOfRows("");
    setNumberOfColumns("");
    setEditingSection(null);
  };

  const handleAddSection = async () => {
    try {
      if (!sectionName.trim() || !sectionColor || !sectionPrice || !numberOfRows || !numberOfColumns) {
        alert("Please fill all required fields");
        return;
      }

      const isDuplicate = sections.some(
        (sec) => sec.name.toLowerCase() === sectionName.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert("A section with this name already exists.");
        return;
      }

      const rows = parseInt(numberOfRows, 10);
      const cols = parseInt(numberOfColumns, 10);
      const price = parseFloat(sectionPrice);

      if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert("Please enter valid rows and columns");
        return;
      }
      if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price");
        return;
      }

      const totalSeats = rows * cols;

      const sectionRes = await axios.post(
        `http://localhost:8081/api/sections/create?eventId=${eventId}`,
        { name: sectionName, color: sectionColor, totalSeats, price }
      );

      const sectionId = sectionRes.data.id;

      const seats = [];
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          seats.push({
            code: `${sectionName}${row}-${col}`,
            reserved: false,
            available: true,
            price,
            row,
            number: col,
            color: sectionColor,
          });
        }
      }

      await axios.post(`http://localhost:8081/api/seats/section/${sectionId}/generate`, seats);

      alert("Section and seats added successfully!");
      resetForm();
      await fetchSections();

      setSelectedSection({ ...sectionRes.data, rows, cols });
      setSelectedSectionId(sectionId);
    } catch (error) {
      console.error("Error adding section/seats:", error);
      alert("Error adding data");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    try {
      await axios.delete(`http://localhost:8081/api/sections/${sectionId}`);
      alert("Section deleted successfully");
      await fetchSections();
      if (selectedSectionId === sectionId) {
        setSelectedSection(null);
        setSelectedSectionId(null);
      }
    } catch (error) {
      console.error("Failed to delete section:", error);
      alert("Error deleting section");
    }
  };

  const handleEditClick = (section) => {
    setEditingSection(section);
    setSectionName(section.name);
    setSectionColor(section.color);
    setSectionPrice(section.price.toString());
  };

  const handleUpdateSection = async () => {
    try {
      if (!editingSection) return;

      if (!sectionName.trim() || !sectionColor || !sectionPrice) {
        alert("Please fill all required fields");
        return;
      }

      const price = parseFloat(sectionPrice);
      if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price");
        return;
      }

      await axios.put(`http://localhost:8081/api/sections/${editingSection.id}`, {
        name: sectionName,
        color: sectionColor,
        totalSeats: editingSection.totalSeats,
        price,
        eventId,
      });

      alert("Section updated successfully!");
      resetForm();
      await fetchSections();
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Error updating data");
    }
  };

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        
        <GlassmorphismPaper>
          <FormTitle>
            {editingSection ? "Edit Cosmic Section " : " Add New Cosmic Section "}
          </FormTitle>
          
          <FormGrid>
            <TextField
              label="Section Name"
              fullWidth
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              variant="outlined"
            />
            
            <ColorInputContainer>
              <ColorInputLabel>Section Color</ColorInputLabel>
              <CosmicColorInput
                type="color"
                value={sectionColor}
                onChange={(e) => setSectionColor(e.target.value)}
              />
            </ColorInputContainer>
            
            <TextField
              label="Price ($)"
              type="number"
              fullWidth
              value={sectionPrice}
              onChange={(e) => setSectionPrice(e.target.value)}
              variant="outlined"
            />
            
            {!editingSection && (
              <>
                <TextField
                  label="Number of Rows"
                  type="number"
                  fullWidth
                  value={numberOfRows}
                  onChange={(e) => setNumberOfRows(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  label="Number of Columns"
                  type="number"
                  fullWidth
                  value={numberOfColumns}
                  onChange={(e) => setNumberOfColumns(e.target.value)}
                  variant="outlined"
                />
              </>
            )}
          </FormGrid>
          
          <ButtonContainer>
            <Button 
              onClick={editingSection ? handleUpdateSection : handleAddSection}
              variant="contained"
              size="large"
            >
              {editingSection ? "🔄 Update Section" : "🚀 Add Section + Seats"}
            </Button>
            {editingSection && (
              <Button 
                onClick={resetForm} 
                variant="outlined"
                size="large"
              >
                ❌ Cancel
              </Button>
            )}
          </ButtonContainer>

          <SectionListContainer>
            <SectionListTitle>
               Existing Cosmic Sections
            </SectionListTitle>
            
            {sections.map((sec) => (
              <SectionItem key={sec.id}>
                <SectionInfo>
                  <SectionName>{sec.name}</SectionName>
                  <SectionDetails>
                    <span>🪑 {sec.totalSeats} seats</span>
                    <span>💰 ${sec.price}</span>
                    <ColorSwatch color={sec.color} />
                  </SectionDetails>
                </SectionInfo>
                <SectionActions>
                  <ActionButton
                    variant="view"
                    onClick={() => {
                      setSelectedSection(sec);
                      setSelectedSectionId(sec.id);
                    }}
                  >
                    👁️ View
                  </ActionButton>
                  <ActionButton
                    variant="edit"
                    onClick={() => handleEditClick(sec)}
                  >
                    ✏️ Edit
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleDeleteSection(sec.id)}
                  >
                    🗑️ Delete
                  </ActionButton>
                </SectionActions>
              </SectionItem>
            ))}
          </SectionListContainer>
        </GlassmorphismPaper>

        {selectedSection && (
          <div style={{ marginTop: '24px' }}>
            <SeatGrid section={selectedSection} />
          </div>
        )}
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default AddSectionForm;


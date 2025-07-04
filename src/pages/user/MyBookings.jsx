import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// 1. تعديل تصميم الزر ليتطابق تمامًا مع الصورة (بدون تدرج)
const StyledButton = styled(Button)(({ theme }) => ({
  background: '#E91E63', // لون وردي ثابت
  border: 0,
  borderRadius: '8px', // حواف أقل دائرية لتطابق الصورة
  color: 'white',
  height: 48,
  padding: '0 30px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  boxShadow: '0 4px 12px rgba(233, 30, 99, 0.4)', // ظل وردي خفيف
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#C2185B', // لون أغمق عند التحويم
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(233, 30, 99, 0.5)',
  },
}));

// 2. تصميم قائمة الفلترة لتطابق الصورة تمامًا
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: 250, // عرض مطابق للصورة
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.9rem',
    transform: 'translate(14px, -9px) scale(0.75)', // ليبقى العنوان في الأعلى دائمًا
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    borderRadius: '8px', // حواف مطابقة للصورة
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.4)',
      top: 0, // إزالة المسافة العلوية للـ fieldset
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E91E63',
    },
    '& .MuiSelect-select': {
      padding: '12px 14px', // تعديل الـ padding الداخلي
    },
    '& .MuiSvgIcon-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
}));

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  // 3. إعادة كود جلب البيانات الأصلي من الخادم الخاص بك
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }
        const response = await fetch("http://localhost:8081/api/bookings/mybookings", {
          headers: { Authorization: `Bearer ${token}` },
        } );
        if (!response.ok) {
          throw new Error(await response.text() || "Failed to fetch bookings");
        }
        setBookings(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status?.toLowerCase() === filterStatus.toLowerCase());

  // 4. تصميم الـ Chip ليتطابق مع الصورة
  const getStatusChipStyle = (status) => {
    const baseStyle = {
      height: '24px',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '0.75rem',
    };
    switch (status?.toLowerCase()) {
      case 'confirmed': return { ...baseStyle, backgroundColor: '#E8F5E9', color: '#388E3C' }; // أخضر فاتح مع نص غامق
      case 'cancelled': return { ...baseStyle, backgroundColor: '#FFEBEE', color: '#D32F2F' }; // أحمر فاتح مع نص غامق
      case 'unpaid': return { ...baseStyle, backgroundColor: '#FFF3E0', color: '#F57C00' }; // برتقالي فاتح مع نص غامق
      default: return { ...baseStyle, backgroundColor: '#F5F5F5', color: '#616161' }; // رمادي فاتح مع نص غامق
    }
  };

  return (
    // 5. تعديل لون الخلفية الرئيسي ليتطابق مع الصورة
    <Box sx={{ backgroundColor: '#300F5B', minHeight: '100vh', color: 'white' }}>
      <Container sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
            My <Typography component="span" sx={{ color: '#E91E63' }}>Bookings</Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
            Review and manage all your event reservations here.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <StyledFormControl variant="outlined">
            <InputLabel shrink id="filter-status-label">Filter by Status</InputLabel>
            <Select
              labelId="filter-status-label"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              notched // لضمان ظهور الـ label بشكل صحيح
              label="Filter by Status" // ضروري للـ accessibility
              MenuProps={{ PaperProps: { sx: { backgroundColor: '#3A1D6A', color: 'white' } } }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
          </StyledFormControl>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}><CircularProgress sx={{ color: '#E91E63' }} /></Box>
        ) : error ? (
          <Typography color="error" mt={3} textAlign="center">{error}</Typography>
        ) : filteredBookings.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: 'rgba(255, 255, 255, 0.7)' }}>
            <Typography variant="h5" sx={{ mb: 1, color: 'white' }}>No bookings found</Typography>
            <Typography>There are no bookings with the status "{filterStatus}".</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredBookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <Card sx={{
                  backgroundColor: '#FFFFFF', color: 'black', borderRadius: '12px',
                  boxShadow: 'none', // إزالة الظل الافتراضي
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                  overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%'
                }}>
                  <CardMedia
                    component="img" height="180" image={booking.event?.imageUrl || "/images/default.jpg"}
                    alt={booking.event?.title || "Event Image"} sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Typography variant="h6" fontWeight="600" sx={{ color: '#1a1a1a' }}>
                        {booking.event?.title || "Untitled Event"}
                      </Typography>
                      <Chip label={booking.status} size="small" sx={getStatusChipStyle(booking.status)} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">
                        {booking.event?.startDate ? new Date(booking.event.startDate).toLocaleDateString() : "N/A"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <LocationOnIcon sx={{ fontSize: 16, mr: 1 }} />
                      <Typography variant="body2" noWrap>
                        {booking.event?.location || "Location not specified"}
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {(booking.status?.toLowerCase() === "unpaid" || booking.status?.toLowerCase() === "pending") && (
                      <StyledButton fullWidth sx={{ mt: 2.5 }} onClick={() => navigate("/checkout", { state: { bookingId: booking.id } })}>
                        Continue Booking
                      </StyledButton>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MyBookings;

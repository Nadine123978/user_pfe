import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

const drawerWidth = 240;

export default function AdminLayout() {
  return (
   <Box sx={{ display: 'flex' }}>
  <CssBaseline />
  <Header />
  <Sidebar />
<Box
  component="main"
  sx={{
    flexGrow: 1,
    backgroundColor: '#f5f6fa',
    minHeight: '100vh',
    pt: 2,       // ✅ padding يمين ويسار أخف
    width: `calc(100% - ${drawerWidth}px)`,
  }}
>
  <Toolbar sx={{ minHeight: '48px', p: 0 }} /> {/* ✅ خفف المسافة فوق */}
  <Outlet />
</Box>

</Box>
  );
}

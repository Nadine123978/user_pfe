import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

const drawerWidth = 240;

export default function AdminLayout() {
  const AdminLayout = ({ role }) => {
  // فيك تستخدم role داخل الـ layout لتمييز التصرف إذا بدك لاحقاً
  return (
    <div className="admin-layout">
      <Sidebar role={role} />
      <Outlet />
    </div>
  );
};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header ثابت بأعلى كل صفحة */}
      <Header />

      {/* Sidebar ثابت على اليسار */}
      <Sidebar />

      {/* المحتوى الأساسي لكل صفحة */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#0f172a', // نفس لون الـ Cosmic Dashboard
          minHeight: '100vh',
          pt: 2,
          px: 4, // padding يسار ويمين
  width: `calc(100% - ${drawerWidth}px)`
        }}
      >
        {/* toolbar space under the header */}
        <Toolbar sx={{ minHeight: '48px', p: 0 }} />
        
        {/* هون بتنحط كل صفحة Admin داخل <Outlet /> */}
        <Outlet />
      </Box>
    </Box>
  );
}
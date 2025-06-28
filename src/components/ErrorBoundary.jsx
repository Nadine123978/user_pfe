import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Error as ErrorIcon,
  Refresh,
  BugReport,
  ExpandMore,
  ExpandLess,
  Home,
  Support
} from '@mui/icons-material';

// Enhanced styled components
const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  padding: theme.spacing(4),
  background: 'linear-gradient(145deg, rgba(244, 67, 54, 0.05), rgba(233, 30, 99, 0.05))',
  borderRadius: 24,
  border: '1px solid rgba(244, 67, 54, 0.2)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(244, 67, 54, 0.1) 0%, transparent 70%)',
    animation: 'pulse 4s ease-in-out infinite',
  },
  
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 0.5,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'scale(1.1)',
    },
  },
}));

const ErrorCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(44, 62, 80, 0.95), rgba(74, 20, 140, 0.95))',
  backdropFilter: 'blur(15px)',
  borderRadius: 24,
  padding: theme.spacing(4),
  color: 'white',
  textAlign: 'center',
  maxWidth: 600,
  width: '100%',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  zIndex: 1,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #F44336, #E91E63, #9C27B0)',
    borderRadius: '24px 24px 0 0',
  },
}));

const ErrorIcon_Styled = styled(ErrorIcon)(({ theme }) => ({
  fontSize: 80,
  color: '#F44336',
  marginBottom: theme.spacing(2),
  animation: 'shake 2s ease-in-out infinite',
  
  '@keyframes shake': {
    '0%, 100%': {
      transform: 'translateX(0)',
    },
    '10%, 30%, 50%, 70%, 90%': {
      transform: 'translateX(-2px)',
    },
    '20%, 40%, 60%, 80%': {
      transform: 'translateX(2px)',
    },
  },
}));

const ActionButton = styled(Button)(({ theme, variant: buttonVariant }) => ({
  background: buttonVariant === 'outlined' 
    ? 'transparent' 
    : 'linear-gradient(45deg, #F44336, #E91E63)',
  border: buttonVariant === 'outlined' 
    ? '2px solid #F44336' 
    : 'none',
  borderRadius: 25,
  color: 'white',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  margin: theme.spacing(1),
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: buttonVariant === 'outlined'
      ? 'rgba(244, 67, 54, 0.1)'
      : 'linear-gradient(45deg, #D32F2F, #C2185B)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(244, 67, 54, 0.4)',
  },
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'left',
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to monitoring service (if available)
    if (window.errorLogger) {
      window.errorLogger.log(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const errorReport = {
      error: this.state.error?.toString(),
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    // In a real app, you would send this to your error reporting service
    console.log('Error Report:', errorReport);
    
    // For demo purposes, copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => {
        alert('Error report copied to clipboard. Please send it to our support team.');
      })
      .catch(() => {
        alert('Please contact our support team with the error details shown below.');
      });
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      const isRepeatedError = this.state.retryCount > 2;
      
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon_Styled />
            
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #F44336, #E91E63)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Oops! Something went wrong
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              {isRepeatedError 
                ? "We're experiencing persistent issues. Our team has been notified and is working on a fix."
                : "Don't worry, this happens sometimes. Try refreshing the page or go back to the homepage."
              }
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
              {!isRepeatedError && (
                <ActionButton 
                  onClick={this.handleRetry}
                  startIcon={<Refresh />}
                >
                  Try Again
                </ActionButton>
              )}
              
              <ActionButton 
                variant="outlined"
                onClick={this.handleGoHome}
                startIcon={<Home />}
              >
                Go Home
              </ActionButton>
              
              <ActionButton 
                variant="outlined"
                onClick={this.handleReportBug}
                startIcon={<Support />}
              >
                Report Issue
              </ActionButton>
            </Box>

            {/* Error Details Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <IconButton 
                onClick={this.toggleDetails}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: '#F44336',
                    background: 'rgba(244, 67, 54, 0.1)',
                  }
                }}
              >
                <BugReport sx={{ mr: 1 }} />
                {this.state.showDetails ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer'
                }}
                onClick={this.toggleDetails}
              >
                {this.state.showDetails ? 'Hide' : 'Show'} Technical Details
              </Typography>
            </Box>

            {/* Error Details */}
            <Collapse in={this.state.showDetails}>
              <DetailsContainer>
                <Typography variant="subtitle2" sx={{ color: '#F44336', mb: 2, fontWeight: 'bold' }}>
                  Error Information:
                </Typography>
                
                {this.state.error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 2,
                      background: 'rgba(244, 67, 54, 0.1)',
                      color: 'white',
                      '& .MuiAlert-icon': {
                        color: '#F44336'
                      }
                    }}
                  >
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
                      {this.state.error.toString()}
                    </Typography>
                  </Alert>
                )}
                
                {this.state.errorInfo && this.state.errorInfo.componentStack && (
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, display: 'block' }}>
                      Component Stack:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      component="pre" 
                      sx={{ 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.7rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        padding: 1,
                        borderRadius: 1,
                        maxHeight: 200,
                        overflow: 'auto'
                      }}
                    >
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  </Box>
                )}
              </DetailsContainer>
            </Collapse>

            {/* Additional Help */}
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              background: 'rgba(233, 30, 99, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(233, 30, 99, 0.2)',
            }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                💡 <strong>Need help?</strong> Contact our support team at support@example.com 
                or try refreshing your browser. Error ID: {Date.now().toString(36)}
              </Typography>
            </Box>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


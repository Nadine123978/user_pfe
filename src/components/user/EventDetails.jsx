import React, { useState } from "react";
import { 
  Box, 
  Chip, 
  Typography, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Grid,
  Divider,
  IconButton,
  Collapse,
  Fade
} from "@mui/material";
import { styled } from '@mui/material/styles';
import {
  ExpandMore,
  Info,
  Schedule,
  LocationOn,
  People,
  Star,
  Language,
  AccessTime,
  EventNote,
  ExpandLess,
  ExpandMore as ExpandMoreIcon
} from "@mui/icons-material";

// Enhanced styled components
const EventCard = styled(Card)(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  color: 'white',
}));

const StyledChip = styled(Chip)(({ theme, variant }) => ({
  background: variant === 'primary' 
    ? 'linear-gradient(45deg, #E91E63, #9C27B0)'
    : 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  margin: theme.spacing(0.5),
  borderRadius: 16,
  fontWeight: 'bold',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: variant === 'primary'
      ? 'linear-gradient(45deg, #C2185B, #7B1FA2)'
      : 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 8px 25px rgba(233, 30, 99, 0.3)',
  },
  
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      color: 'white',
    },
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  borderRadius: '16px !important',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  marginBottom: theme.spacing(2),
  
  '&:before': {
    display: 'none',
  },
  
  '&.Mui-expanded': {
    background: 'rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: 16,
  minHeight: 64,
  
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#E91E63',
    transition: 'all 0.3s ease',
    
    '&.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: 12,
  background: 'rgba(255, 255, 255, 0.03)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.06)',
    transform: 'translateX(4px)',
  },
}));

const ExpandableText = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const EventDetails = ({ event }) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: false,
    schedule: false,
    location: false,
  });

  if (!event) {
    return (
      <EventCard>
        <InfoSection>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            <Info sx={{ color: '#E91E63' }} />
            <Typography variant="body1">
              Event details are not available at the moment.
            </Typography>
          </Box>
        </InfoSection>
      </EventCard>
    );
  }

  const { description, tags = [], capacity, duration, language, ageRestriction } = event;

  const handleAccordionChange = (section) => (event, isExpanded) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: isExpanded
    }));
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'Duration TBA';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <EventCard>
      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <Fade in={true} timeout={600}>
          <InfoSection>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#E91E63', 
                fontWeight: 'bold', 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Star sx={{ fontSize: 20 }} />
              Event Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tags.map((tag, index) => (
                <StyledChip 
                  key={index} 
                  label={tag} 
                  size="small"
                  variant={index === 0 ? 'primary' : 'default'}
                />
              ))}
            </Box>
          </InfoSection>
        </Fade>
      )}

      {/* Description Section */}
      {description && (
        <Fade in={true} timeout={800}>
          <InfoSection>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#E91E63', 
                fontWeight: 'bold', 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <EventNote sx={{ fontSize: 20 }} />
              About This Event
            </Typography>
            
            <ExpandableText>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  lineHeight: 1.7,
                  fontSize: '1rem',
                }}
              >
                {expandedDescription ? description : truncateText(description)}
              </Typography>
              
              {description.length > 200 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <IconButton
                    onClick={() => setExpandedDescription(!expandedDescription)}
                    sx={{ 
                      color: '#E91E63',
                      '&:hover': {
                        background: 'rgba(233, 30, 99, 0.1)',
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    {expandedDescription ? <ExpandLess /> : <ExpandMoreIcon />}
                  </IconButton>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      color: '#E91E63',
                      fontWeight: 'bold',
                      mt: 1,
                    }}
                  >
                    {expandedDescription ? 'Show Less' : 'Read More'}
                  </Typography>
                </Box>
              )}
            </ExpandableText>
          </InfoSection>
        </Fade>
      )}

      {/* Event Details Accordion */}
      <Fade in={true} timeout={1000}>
        <Box>
          <StyledAccordion 
            expanded={expandedSections.details} 
            onChange={handleAccordionChange('details')}
          >
            <StyledAccordionSummary expandIcon={<ExpandMore />}>
              <Info sx={{ color: '#E91E63', fontSize: 24 }} />
              <Typography variant="h6" fontWeight="bold">
                Event Information
              </Typography>
            </StyledAccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {capacity && (
                  <Grid item xs={12} sm={6}>
                    <InfoItem>
                      <People sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Capacity
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {capacity} people
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>
                )}
                
                {duration && (
                  <Grid item xs={12} sm={6}>
                    <InfoItem>
                      <AccessTime sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Duration
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {formatDuration(duration)}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>
                )}
                
                {language && (
                  <Grid item xs={12} sm={6}>
                    <InfoItem>
                      <Language sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Language
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {language}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>
                )}
                
                {ageRestriction && (
                  <Grid item xs={12} sm={6}>
                    <InfoItem>
                      <People sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Age Restriction
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {ageRestriction}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </StyledAccordion>

          {/* Schedule Information */}
          {event.startDate && (
            <StyledAccordion 
              expanded={expandedSections.schedule} 
              onChange={handleAccordionChange('schedule')}
            >
              <StyledAccordionSummary expandIcon={<ExpandMore />}>
                <Schedule sx={{ color: '#E91E63', fontSize: 24 }} />
                <Typography variant="h6" fontWeight="bold">
                  Schedule & Timing
                </Typography>
              </StyledAccordionSummary>
              <AccordionDetails>
                <InfoItem>
                  <AccessTime sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Event Date & Time
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(event.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Box>
                </InfoItem>
                
                {event.endDate && (
                  <InfoItem>
                    <Schedule sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Event Ends
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {new Date(event.endDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                  </InfoItem>
                )}
              </AccordionDetails>
            </StyledAccordion>
          )}

          {/* Location Information */}
          {event.location && (
            <StyledAccordion 
              expanded={expandedSections.location} 
              onChange={handleAccordionChange('location')}
            >
              <StyledAccordionSummary expandIcon={<ExpandMore />}>
                <LocationOn sx={{ color: '#E91E63', fontSize: 24 }} />
                <Typography variant="h6" fontWeight="bold">
                  Location Details
                </Typography>
              </StyledAccordionSummary>
              <AccordionDetails>
                <InfoItem>
                  <LocationOn sx={{ color: '#E91E63', fontSize: 20, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Venue
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {event.location.name}
                    </Typography>
                    {event.location.address && (
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 0.5 }}>
                        {event.location.address}
                      </Typography>
                    )}
                  </Box>
                </InfoItem>
              </AccordionDetails>
            </StyledAccordion>
          )}
        </Box>
      </Fade>

      {/* Additional Tips */}
      <Fade in={true} timeout={1200}>
        <Box sx={{ 
          mt: 3, 
          p: 3, 
          background: 'rgba(233, 30, 99, 0.05)',
          borderRadius: 2,
          border: '1px solid rgba(233, 30, 99, 0.2)',
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center' }}>
            💡 <strong>Pro Tip:</strong> Arrive 30 minutes early for the best experience. 
            Don't forget to bring a valid ID for entry verification.
          </Typography>
        </Box>
      </Fade>
    </EventCard>
  );
};

export default EventDetails;


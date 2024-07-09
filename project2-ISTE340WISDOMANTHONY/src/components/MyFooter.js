import React from 'react';
import { Container, Grid, Link } from '@mui/material';
import './MyFooter.css'; // Import the CSS file


/**
 * MyFooter is a React component that renders the footer section of a webpage.
 * It displays copyright information and a set of social media links.
 * This component utilizes Material UI's Container, Grid, and Link components to layout the content.
 */
class MyFooter extends React.Component {
  
  /**
   * Renders the footer content.
   * The footer includes copyright information and social media links, 
   * arranged in a responsive grid layout for better alignment and spacing.
   * 
   * Each social media link opens in a new tab and is secured with rel="noopener noreferrer" 
   * to mitigate potential security risks.
   * 
   * @returns {React.ReactNode} The footer component.
   */
  render() {
    return (
      <footer className="footer"> {/* Use className instead of style */}
        <Container maxWidth="lg" style={{ width: '100%' }}> {/* Set width to 100% for full width */}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <p>&copy; 2024 University Information</p>
            </Grid>
            <Grid item>
              <div className="social-icons"> {/* Use className instead of style */}
                <Link href="https://www.facebook.com/ritcroatia/" target="_blank" rel="noopener noreferrer">Facebook</Link>
                <Link href="https://twitter.com/ritcroatia?lang=en" target="_blank" rel="noopener noreferrer">Twitter</Link>
                <Link href="https://www.instagram.com/rit_croatia/" target="_blank" rel="noopener noreferrer">Instagram</Link>
                <Link href="https://www.linkedin.com/school/rit-croatia/?originalSubdomain=hr" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
              </div>
            </Grid>
          </Grid>
        </Container>
      </footer>
    );
  }
}

export default MyFooter;

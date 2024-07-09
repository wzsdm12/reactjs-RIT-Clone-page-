import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Mynav.css'; 

/**
 * Navigation component with a responsive drawer for the Rochester Institute of Technology website.
 * This component utilizes Material UI components to create an AppBar at the top of the page,
 * along with a Drawer that can be toggled open or closed. The Drawer contains navigation links
 * that smoothly scroll the page to the respective section.
 */
class Mynav extends React.Component {
  state = {
    drawerOpen: false, // Tracks the open/close state of the navigation drawer
  };

  /**
   * Toggles the drawer's open/close state.
   * @param {boolean} open Specifies whether the drawer should be open or closed.
   * @returns {Function} A function that updates the component's state to the desired open state.
   */
  toggleDrawer = (open) => () => {
    this.setState({ drawerOpen: open });
  };

  /**
   * Scrolls the page to the section corresponding to the clicked navigation link.
   * Also closes the drawer once the navigation is performed.
   * @param {string} sectionId The ID of the section to navigate to.
   */
  navigateToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.toggleDrawer(false)(); // Close the drawer after navigation
  };

  /**
   * Renders the navigation drawer with links to different sections of the website.
   * @returns {JSX.Element} A Drawer component filled with ListItems for navigation.
   */
  renderNavigationDrawer = () => (
    <Drawer
      anchor="left"
      open={this.state.drawerOpen}
      onClose={this.toggleDrawer(false)}
    >
      <List>
        {['About', 'Degrees', 'Employment', 'Faculty', 'News'].map((text) => (
          <ListItem button key={text} onClick={() => this.navigateToSection(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  render() {
    return (
      <>
        <AppBar position="sticky" className="nav-bar"> 
          <Toolbar className="nav-bar">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
             Rochester Institute of Technology 
            </Typography>
          </Toolbar>
        </AppBar>
        {this.renderNavigationDrawer()}
      </>
    );
  }
}

export default Mynav;

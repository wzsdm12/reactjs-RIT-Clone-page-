
/**
 * `Degree` is a React component that displays degree information fetched from a specified API.
 * It presents undergraduate and graduate degrees in separate tabs, with each degree displaying
 * title, description, concentrations (if any), and available certificates. Clicking on a
 * concentration brings up a modal with more details.
 *
 * This component uses Material-UI components to construct the UI, including Tabs for degree
 * categorization, Cards for concentrations, and a Modal for concentration details. A custom
 * Material-UI theme is applied for styling.
 *
 * State:
 * - `degrees`: Object storing arrays of undergraduate and graduate degrees.
 * - `error`: String capturing any error that occurs during data fetching.
 * - `loaded`: Boolean indicating if the data has been loaded.
 * - `tabValue`: Number indicating the currently selected tab.
 * - `selectedConcentration`: String or null indicating the selected concentration for detail display.
 * - `modalOpen`: Boolean indicating if the concentration details modal is open.
 *
 * Component Structure:
 * - ThemeProvider: Applies a custom Material-UI theme.
 * - Tabs: Switches between undergraduate and graduate degree views.
 * - TabPanel: Displays degree information for the selected tab.
 * - Modal: Shows detailed information about a selected concentration.
 *
 * Example Usage:
 * ```jsx
 * <Degree />
 * ```
 */

import React from 'react';
import axios from 'axios';
import './Degree.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500',
    },
  },
});


/**
 * `TabPanel` is a functional component used within the `Degree` component to
 * display the content associated with each tab.
 *
 * Props:
 * - `children`: The content to be displayed within the panel.
 * - `value`: The current active tab index.
 * - `index`: The index of the current panel.
 *
 * The component returns a div that either contains the children content or is hidden,
 * depending on whether its index matches the active tab index (`value`).
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default class Degree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degrees: {
        undergraduate: [],
        graduate: [],
      },
      error: null,
      loaded: false,
      tabValue: 0,
      selectedConcentration: null,
      modalOpen: false,
    };
  }

    /**
   * Fetches degree information from the API on component mount and updates the state.
   */
  componentDidMount() {
    const url = `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/`;
    axios.get(url)
      .then((response) => {
        this.setState({ degrees: response.data, loaded: true });
      })
      .catch((error) => {
        this.setState({ error: error.message, loaded: true });
      });
  }

   /**
   * Handles changes to the selected tab.
   * @param {Object} event The event object.
   * @param {number} newValue The new tab index value.
   */
  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

   /**
   * Handles clicks on a concentration, opening the modal and setting the selected concentration.
   * @param {string} concentration The clicked concentration.
   */
  handleConcentrationClick = (concentration) => {
    this.setState({ selectedConcentration: concentration, modalOpen: true });
  };


    /**
   * Closes the concentration details modal.
   */
  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };


    /**
   * Renders the degrees based on the selected degree type (undergraduate or graduate).
   * @param {string} degreeType The type of degree to render ("undergraduate" or "graduate").
   * @returns A list of JSX elements representing the degree information.
   */
  renderDegrees = (degreeType) => {
    return this.state.degrees[degreeType].map((degree, index) => (
      <div key={index} className="degree-container">
        <h3>{degree.title}</h3>
        <p>{degree.description}</p>
        {degree.concentrations && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {degree.concentrations.map((concentration, idx) => (
              <Card key={idx} sx={{ minWidth: 200, margin: '0 10px 10px 0', cursor: 'pointer' }} onClick={() => this.handleConcentrationClick(concentration)}>
                <CardContent>
                  <Typography variant="h6">{concentration}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        {degree.availableCertificates && (
          <>
            <h4>Available Certificates</h4>
            <ul>
              {degree.availableCertificates.map((certificate, idx) => (
                <li key={idx}>{certificate}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    ));
  };


    /**
   * Renders the details of the selected concentration in a modal.
   * @returns A JSX element representing the modal with concentration details or null if no concentration is selected.
   */
  renderConcentrationDetails = () => {
    const { selectedConcentration } = this.state;
  
    if (!selectedConcentration) return null;
  
    const { degrees } = this.state;
    const additionalDetails = degrees.undergraduate.find(degree => degree.concentrations.includes(selectedConcentration));
  
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleCloseModal}
        aria-labelledby="concentration-modal-title"
        aria-describedby="concentration-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, width: 400 }}>
          <Typography id="concentration-modal-title" variant="h6" component="h2">Concentration Details</Typography>
          <Typography id="concentration-modal-description" sx={{ mt: 2 }}>
            <ul className="degree-box">
              <li>{selectedConcentration}</li>
              {additionalDetails && (
                <li>
                  {additionalDetails.concentrations && (
                    <ul className="degree-concentrations">
                      {additionalDetails.concentrations.map((concentration, idx) => (
                        <li key={idx}>{concentration}</li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </Typography>
        </Box>
      </Modal>
    )
  };
  
  
     /**
   * The main render function of the component. Displays loading, error, or the main content
   * based on the component state.
   * @returns {Degree} The rendered component.
   */
  render() {
   
    // Main render method implementation...
    const { error, loaded, tabValue } = this.state;

    if (!loaded) {
      return <div className="container">Loading...</div>;
    }

    if (error) {
      return <div className="container">Error: {error}</div>;
    }

    return (
      <ThemeProvider theme={theme}>
        <div className="container">
          <h2>Degree Information</h2>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={this.handleTabChange} aria-label="degree tabs">
                <Tab label="Undergraduate Degrees" />
                <Tab label="Graduate Degrees" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              {this.renderDegrees('undergraduate')}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {this.renderDegrees('graduate')}
            </TabPanel>
          </Box>
          {this.renderConcentrationDetails()}
        </div>
      </ThemeProvider>
    );
  }
}

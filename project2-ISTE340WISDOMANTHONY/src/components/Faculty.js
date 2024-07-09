import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Faculty.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * Faculty class component that displays information about faculty members.
 * It fetches faculty data from a provided API and allows filtering by the first letter of their name.
 * Each faculty member's detailed information can be viewed in a modal by clicking on their card.
 */
export default class Faculty extends React.Component {
  
  /**
   * Initializes the Faculty component with predefined state.
   * @param {Object} props The props passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      facultyMembers: [],
      filteredMembers: [],
      error: null,
      loaded: false,
      filter: 'All',
      open: false, // Modal open state
      selectedMember: null, // Selected member for modal
    };
  }

   /**
   * Called immediately after the component is mounted.
   * Fetches the faculty data from the specified URL and updates the component state.
   */
  componentDidMount() {
    const url = `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/people/faculty/`;
    axios.get(url)
      .then((response) => {
        this.setState({ facultyMembers: response.data.faculty || [], filteredMembers: response.data.faculty || [], loaded: true });
      })
      .catch((error) => {
        this.setState({ error: error.message, loaded: true });
      });
  }

   /**
   * Opens the modal to display detailed information about a selected faculty member.
   * @param {Object} member The selected faculty member whose information will be displayed.
   */
  handleOpen = (member) => {
    this.setState({ open: true, selectedMember: member });
  };

   /**
   * Closes the modal and resets the selected member state.
   */
  handleClose = () => {
    this.setState({ open: false, selectedMember: null });
  };

  /**
   * Sets the current filter for faculty members and applies it.
   * @param {string} filter The filter value to apply (e.g., 'All' or a letter).
   */
  setFilter = (filter) => {
    this.setState({ filter }, this.applyFilter);
  };

  /**
   * Applies the current filter to the faculty members, updating the filteredMembers state.
   * Filters members based on the first letter of their name or shows all if the filter is 'All'.
   */
  applyFilter() {
    const { facultyMembers, filter } = this.state;
    if (filter === 'All') {
      this.setState({ filteredMembers: facultyMembers });
    } else {
      this.setState({
        filteredMembers: facultyMembers.filter(member => member.name.startsWith(filter))
      });
    }
  }

  /**
   * Renders filter options for faculty members based on the alphabet and an 'All' option.
   * Allows users to filter faculty members by the first letter of their name.
   * @returns A div element containing filter option buttons.
   */
  renderFilterOptions() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const { filter } = this.state;
  
    return (
      <div className="filter-options">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => this.setFilter('All')}>All</button>
        {alphabet.map(letter => (
          <button key={letter} className={filter === letter ? 'active' : ''} onClick={() => this.setFilter(letter)}>{letter}</button>
        ))}
      </div>
    );
  }

  /**
   * Renders a modal with detailed information about the selected faculty member.
   * @returns A Modal component or null if no member is selected.
   */
  renderFacultyModal() {
    const { open, selectedMember } = this.state;
    if (!selectedMember) return null;

    return (
      <Modal
        open={open}
        onClose={this.handleClose}
        aria-labelledby="faculty-modal-title"
        aria-describedby="faculty-modal-description"
      >
        <Box sx={style}>
          <Typography id="faculty-modal-title" variant="h6" component="h2">{selectedMember.name}</Typography>
          <Typography id="faculty-modal-description" sx={{ mt: 2 }}>
            <p>{selectedMember.title}</p>
            <p>Office: {selectedMember.office}</p>
            {selectedMember.email && <p>Email: {selectedMember.email}</p>}
            {selectedMember.phone && <p>Phone: {selectedMember.phone}</p>}
            {selectedMember.website && <p>Website: <a href={selectedMember.website} target="_blank" rel="noopener noreferrer">Visit</a></p>}
          </Typography>
        </Box>
      </Modal>
    );
  }

  /**
   * Renders the Faculty component including the filter options, faculty cards, and the modal for detailed information.
   * Displays a loading message, an error message, or the faculty information based on the component state.
   * @returns A div element containing the rendered component.
   */
  render() {
    const { filteredMembers, error, loaded } = this.state;

    if (!loaded) {
      return <div className="container">Loading...</div>;
    }

    if (error) {
      return <div className="container">Error: {error}</div>;
    }

    return (
      <div className="container">
        <h2>Faculty Information</h2>
        {this.renderFilterOptions()}
        <div className="faculty-container">
          {filteredMembers.map((member) => (
            <Card key={member.name} sx={{ maxWidth: 345 }} onClick={() => this.handleOpen(member)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={member.imagePath}
                  alt={member.name}
                  className="faculty-image" // Apply the circle style
                  sx={{ 
                    height: 140, 
                    width: 140, 
                    borderRadius: '50%', 
                    margin: '10px auto' // Custom styling for the CardMedia component
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {member.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        {this.renderFacultyModal()}
      </div>
    );
  }
}

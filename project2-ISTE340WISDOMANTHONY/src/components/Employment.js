import React from 'react';
import axios from 'axios'; // Import Axios
import './Employment.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * The Employment component fetches and displays employment and co-op data
 * from an API. It supports pagination and adapts to screen size changes.
 */
class Employment extends React.Component {
  /**
   * Initializes the component state and binds event handlers.
   * @param {Object} props The props passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      employmentData: [],
      coopData: [],
      employmentCurrentPageNum: 1,
      employmentTotalPages: 0,
      coopCurrentPageNum: 1,
      coopTotalPages: 0,
      loadingEmployment: true,
      loadingCoop: true,
      isMobile: window.innerWidth <= 768,
    };
    this.entriesPerPage = 5; // Set the number of entries to display per page
  }

  /**
   * Fetches employment and co-op data when the component mounts.
   * Also, adds an event listener for screen size changes.
   */
  componentDidMount() {
    this.fetchEmploymentData();
    this.fetchCoopData();
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  /**
   * Cleans up event listeners when the component unmounts.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  /**
   * Updates the component state when the screen size changes.
   */
  handleWindowSizeChange = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  };

  /**
   * Fetches new data when the current page number changes.
   * @param {Object} prevProps Previous props.
   * @param {Object} prevState Previous state.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.employmentCurrentPageNum !== this.state.employmentCurrentPageNum) {
      this.fetchEmploymentData();
    }
    if (prevState.coopCurrentPageNum !== this.state.coopCurrentPageNum) {
      this.fetchCoopData();
    }
  }


   /**
   * Fetches employment data from the API and updates the component state.
   */
  fetchEmploymentData = async () => {
    try {
      const response = await axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/employmentTable");
      const data = response.data;

      if (data && data.employmentTable && data.employmentTable.professionalEmploymentInformation) {
        const employmentTableData = data.employmentTable.professionalEmploymentInformation;
        this.setState({ employmentData: employmentTableData, loadingEmployment: false });

        // Calculate total pages based on the length of the data array
        const total = Math.ceil(employmentTableData.length / this.entriesPerPage);
        this.setState({ employmentTotalPages: total });
      } else {
        console.error("Invalid API response structure for Employment Table. Check the API response format.");
      }
    } catch (error) {
      console.error("Error fetching employment data:", error);
      this.setState({ loadingEmployment: false });
    }
  };

  
  /**
   * Fetches co-op data from the API and updates the component state.
   */
  fetchCoopData = async () => {
    try {
      const response = await axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/coopTable/coopInformation");
      const data = response.data;

      if (data && data.coopInformation) {
        this.setState({ coopData: data.coopInformation, loadingCoop: false });

        // Calculate total pages based on the length of the data array
        const total = Math.ceil(data.coopInformation.length / this.entriesPerPage);
        this.setState({ coopTotalPages: total });
      } else {
        throw new Error("Invalid API response format for Co-op Table. Check the API response format.");
      }
    } catch (error) {
      console.error("Error fetching co-op data:", error);
      this.setState({ loadingCoop: false });
    }
  };


/**
   * Handles pagination for employment data.
   * @param {number} newPage The new page number.
   */
  handleEmploymentPageChange = newPage => {
    this.setState({ employmentCurrentPageNum: newPage });
  };


 /**
   * Handles pagination for co-op data.
   * @param {number} newPage The new page number.
   */
  handleCoopPageChange = newPage => {
    this.setState({ coopCurrentPageNum: newPage });
  };



/**
   * Renders the table heading based on the data provided.
   * @param {Array} data The data array to generate headings from.
   * @returns {JSX.Element|null} The table head element or null if no data.
   */
  renderTableHeading = (data) => {
    if (data.length === 0) return null;

    return (
      <TableHead className="table-head">
        <TableRow>
          {Object.keys(data[0]).map(key => (
            <TableCell key={key}>{key.toUpperCase()}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

   /**
   * Renders table rows based on the data and current page number.
   * @param {Array} data The data array to generate rows from.
   * @param {number} currentPageNum The current page number for pagination.
   * @returns {JSX.Element} The table body element containing rows.
   */
  renderTableRows = (data, currentPageNum) => {
    const startIndex = (currentPageNum - 1) * this.entriesPerPage;
    const endIndex = Math.min(startIndex + this.entriesPerPage, data.length);

    return (
      <TableBody>
        {data.slice(startIndex, endIndex).map((entry, index) => (
          <TableRow key={`${entry.employer}_${index}`}> {/* Fixed Template String Syntax Here */}
            {Object.values(entry).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
              </TableBody>
    );
  };


   /**
   * Renders the component UI.
   * @returns {Employment} The rendered UI of the component.
   */
  render() {
    const {
      employmentData,
      coopData,
      employmentCurrentPageNum,
      employmentTotalPages,
      coopCurrentPageNum,
      coopTotalPages,
      loadingEmployment,
      loadingCoop,
      isMobile
    } = this.state;

    return (
      <div>
        <div className={`employment-table-container${isMobile ? ' mobile' : ''}`}>
          <h2 className='header'>Professional Employment Information</h2>
          {loadingEmployment ? (
            <div>Loading employment data...</div>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                {this.renderTableHeading(employmentData)}
                {this.renderTableRows(employmentData, employmentCurrentPageNum)}
              </Table>
            </TableContainer>
          )}

          <div className="pagination">
            <button disabled={employmentCurrentPageNum === 1} onClick={() => this.handleEmploymentPageChange(employmentCurrentPageNum - 1)}>
              Prev
            </button>
            <span className='page-info'>Page {employmentCurrentPageNum} of {employmentTotalPages}</span>
            <button disabled={employmentCurrentPageNum === employmentTotalPages} onClick={() => this.handleEmploymentPageChange(employmentCurrentPageNum + 1)}>
              Next
            </button>
          </div>
        </div>

        <div className={`coop-table-container${isMobile ? ' mobile' : ''}`}>
          <h2 className='header'>Co-op Table</h2>
          {loadingCoop ? (
            <div>Loading co-op data...</div>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                {this.renderTableHeading(coopData)}
                {this.renderTableRows(coopData, coopCurrentPageNum)}
              </Table>
            </TableContainer>
          )}

          <div className="pagination">
            <button disabled={coopCurrentPageNum === 1} onClick={() => this.handleCoopPageChange(coopCurrentPageNum - 1)}>
              Prev
            </button>
            <span className='page-info'>Page {coopCurrentPageNum} of {coopTotalPages}</span>
            <button disabled={coopCurrentPageNum === coopTotalPages} onClick={() => this.handleCoopPageChange(coopCurrentPageNum + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Employment;


/**
 * `AboutModal` is a React component that encapsulates a modal dialog functionality
 * for displaying a specific quote and its author. It leverages Material UI components
 * such as Modal, Box, Typography, and Button to create a user interface that allows
 * the modal to be opened with a button click, and closed with a backdrop click or
 * by pressing the escape key.
 * 
 * The component expects `quote` and `quoteAuthor` as props, which are used to display
 * the content inside the modal. The modal can be triggered to open through a styled
 * button that, on click, changes the internal state `open` to true, thereby revealing
 * the modal. Similarly, the modal can be closed, setting the state `open` to false.
 * 
 * Props:
 * - `quote` (string): The quote text to be displayed in the modal.
 * - `quoteAuthor` (string): The author of the quote to be displayed.
 * 
 * State:
 * - `open` (boolean): A boolean value that determines whether the modal is open or closed.
 * 
 * Usage of Material UI components:
 * - `Modal` for the modal dialog.
 * - `Box` for the container of modal content.
 * - `Typography` for text presentation within the modal.
 * - `Button` for triggering the modal to open.
 * 
 * Example usage:
 * ```jsx
 * <AboutModal quote="This is a quote." quoteAuthor="Author Name" />
 * ```
 */
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export default class AboutModal extends React.Component {
    /**
     * Constructs the AboutModal component with initial state.
     * @param {Object} props The props passed to the component, including `quote` and `quoteAuthor`.
     */
    constructor(props) {
        super(props)

        this.state = {
            open: false // Initial state of the modal, closed by default.
        };
    }

    /**
     * Handles the closing of the modal dialog.
     * Sets the `open` state to false, which results in the modal being hidden.
     */
    handleClose = () => {
        this.setState({ open: false });
    }

    /**
     * Handles the opening of the modal dialog.
     * Sets the `open` state to true, which results in the modal being shown.
     */
    handleOpen = () =>{
        this.setState({ open: true });
    }

    /**
     * Renders the AboutModal component.
     * 
     * Displays a button that, when clicked, opens a modal dialog containing
     * the provided quote and its author. The modal can be closed by the user
     * via a backdrop click or escape key press.
     * 
     * @returns {React.Component} The rendered AboutModal component.
     */
    render() {
        const { quote, quoteAuthor } = this.props;
        const { open } = this.state;

        return (
            <div>
                <Button 
                    variant='outlined' 
                    onClick={this.handleOpen}
                    sx={{ 
                        color: '#e37018', // Orange text color
                        border: '1px solid #ffffff', // White outline
                        '&:hover': {
                            borderColor: '#ffffff', // White border color on hover
                            color: '#ffffff' // White text color on hover
                        }
                    }}
                >
                    Show Quote
                </Button>
                <Modal
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx= {{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 4,
                        border: '2px solid #000'
                    }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            QUOTE
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {quote}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            -- {quoteAuthor}
                        </Typography>                        
                    </Box>
                </Modal>
            </div>
        );
    }
}

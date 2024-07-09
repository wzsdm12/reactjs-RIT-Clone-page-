/**
 * Represents the About page component for the iSchool @ RIT website.
 * 
 * This component fetches and displays information about the iSchool, including
 * a title, description, and a quote with its author. It shows a loading image
 * until the data is fetched successfully.
 * 
 * The React community encourages importing assets in JavaScript files instead
 * of using the public folder to enable benefits like minification and bundling,
 * error checking at compile time, and cache control through content hashes. For
 * more details, refer to:
 * - Adding a Stylesheet: https://create-react-app.dev/docs/adding-a-stylesheet
 * - Adding Images, Fonts, and Files: https://create-react-app.dev/docs/adding-images-fonts-and-files
 * 
 * Usage of external libraries:
 * - React for building the component.
 * - Axios for HTTP requests to fetch the about information.
 * - AboutModal component for displaying the quote in a modal dialog.
 * 
 * Asset imports:
 * - Loading GIF image for the loading state.
 * - About.css for styling the About component.
 */
import React from "react";
import axios from "axios";
import loading from './gears.gif';
import './About.css';
import AboutModal from './AboutModal';

export default class About extends React.Component {
    /**
     * Constructs the About component with initial state.
     * @param {Object} props The props passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            about: {}, // Object containing about information
            loaded: false // Indicates whether the about information has been loaded
        };
    }

    /**
     * Called after the component is mounted. It fetches the about information
     * from a specified URL and updates the state.
     */
    componentDidMount() {
        axios.get('https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about')
                .then((response) => {
                    this.setState({about: response.data, loaded: true});
                });
    }

    /**
     * Renders the About component.
     * 
     * Displays a loading image until the about information is loaded, after which
     * it displays the information along with a quote in the AboutModal component.
     * 
     * @returns {React.Component} The rendered component.
     */
    render() {
        const {about, loaded} = this.state;

        let content;
        if (!loaded) {
            content = <div><img src={loading} alt="loading" /></div>;
        } else {
            content = (
                    <div>
                        <h3>{about.title}</h3>
                        <p>{about.description}</p>
                        <AboutModal quote={about.quote} quoteAuthor={about.quoteAuthor} />
                    </div>
                    );
        }

        return (
                <div className="about">
                    <h1>iSchool @ RIT</h1>
                    {content}
                </div>
                );
    }
}

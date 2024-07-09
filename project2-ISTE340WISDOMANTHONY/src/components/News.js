/*
 * React comunity encourage you to import assets in JavaScript files instead of 
 * using the public folder. For example, see the sections on adding a stylesheet 
 * and adding images and fonts:
 * - https://create-react-app.dev/docs/adding-a-stylesheet
 * - https://create-react-app.dev/docs/adding-images-fonts-and-files
 * 
 * This mechanism provides a number of benefits:
 * - Scripts and stylesheets get minified and bundled together to avoid extra network requests.
 * - Missing files cause compilation errors instead of 404 errors for your users.
 * - Result filenames include content hashes so you don’t need to worry about browsers caching their old versions.
 */
import React from "react";
import axios from "axios";
import loading from './gears.gif';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './News.css'; // Import CSS file for styling

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {},
            loaded: false
        };
    }

    componentDidMount() {
        axios.get('https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/news')
            .then((response) => {
                this.setState({ news: response.data.older, loaded: true });
            });
    }

    render() {
        const { news, loaded } = this.state;

        let content;

        if (!loaded) {
            content = <div><img src={loading} alt="loading" /></div>;

        } else {
            content = (
                <div>
                    {news.map((newsItem) => 
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography align="left"><b>{newsItem.date}:</b> {newsItem.title} </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography align="left">{newsItem.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </div>
            )
        }

        return (
            <div className="news">
                <h1>NEWS @RIT</h1>
                {content}
            </div>
        );
    }

}
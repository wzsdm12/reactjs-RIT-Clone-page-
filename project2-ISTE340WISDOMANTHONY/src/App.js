import React from "react";
import './App.css';
import About from './components/About';
import Degree from './components/Degree';
import Faculty from './components/Faculty';
import Employment from './components/Employment';
import MyNav from './components/Mynav'; 
import News from './components/News';
import Contact from "./components/MyFooter";

/**
 * The App component serves as the root component for the React application.
 * It renders the main structure of the webpage, including navigation, and sections for about,
 * degrees, employment information, faculty, news, and contact information.
 * Each section is rendered using its respective component, facilitating modularity and
 * separation of concerns within the application.
 */
export default class App extends React.Component {
  /**
   * Renders the App component, including the navigation bar and sections for various parts of the application.
   * Each section is wrapped in a <section> tag with an appropriate ID for navigational purposes.
   *
   * @returns The App component as a React node.
   */
  render() {
    return (
      <div className='App'>
        <MyNav /> {/* Navigation bar component */}
        <section id='About'>
          <About /> {/* About section component */}
        </section>
        <section id='Degrees'>
          <h2>Degrees</h2>
          <Degree /> {/* Degrees section component */}
        </section>
        <section id='Employment'>
          <h2>Employment Information</h2>
          <Employment /> {/* Employment information section component */}
        </section>
        <section id='Faculty'>
          <Faculty /> {/* Faculty section component */}
        </section>
        <section id='News'>
          <News /> {/* News section component */}
        </section>
        <section>
          <Contact /> {/* Contact (footer) component */}
        </section> 
      </div>
    );
  }
}

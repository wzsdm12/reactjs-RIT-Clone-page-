import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS styles
import App from './App'; // Import the root App component

/**
 * The entry point for the React application.
 * Initializes the React app by selecting the root DOM element and rendering the App component within it.
 * This file sets up the React.StrictMode for additional checks and warnings in development mode.
 */

// Select the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');
// Ensure the root element is successfully found before proceeding.
if (rootElement) {
  // Create a root.
  const root = ReactDOM.createRoot(rootElement);
  // Render the App component within the root element in React strict mode.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element. Check if your HTML file contains an element with ID "root".');
}

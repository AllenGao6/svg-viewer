// ./src/components/Viewer.js

// Imports
import React from "react";

// Viewer segment container
export default function Viewer({ svgData }) {
    // Contains the SVG display structure for the application

    // Returns a JSX component for the SVG display
    return (
        <>
            <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`}
                alt="SVG currently being displayed"
                style={{
                    maxWidth: 420, // Stop the SVG from expanding to the moon
                }}
            />
        </>
    );
}
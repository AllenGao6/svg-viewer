// ./src/App.js

// Imports
import React, { useState } from "react";
import { Divider } from "antd";
import GUN from "gun";
// Components
import TitleSegment from "./components/TitleSegment";
import Viewer from "./components/Viewer";
import SVGUploadForm from "./components/SVGUploadForm";

export default function App() {
    // Contains all individual components as well as GUN instance and control

    // Initialize gun
    const gun = GUN();
    // States
    // Current SVG displayed
    const [svg, setSVG] = useState({
        // Default state
        title: "Ethereum Logo",
        // Default SVG: Ethereum Logo
        svg: `
            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 784.37 1277.39" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                    <g id="_1421394342400">
                        <g>
                            <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
                            <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
                            <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
                            <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
                            <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
                            <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
                        </g>
                    </g>
                </g>
            </svg>`,
    });
    // List of SVGs displayed
    const [svgNameList, setSVGNameList] = useState([
        // Default list of SVGs
        "Ethereum Logo",
    ]);

    // Callback function to update the SVG from the selector
    const changeCurrentSVG = (selectionTitle) => {
        // Ensure that the previously selected SVG is pushed to GUN
        gun.get(svg.title).put({
            title: svg.title,
            svg: svg.svg,
        });

        // Get the new SVG from GUN and update the state
        gun.get(selectionTitle).on((data, key) => {
            setSVG({
                title: data.title,
                svg: data.svg,
            });
        });
    };

    /// Callback function to update the SVG within a child component
    const updateSVG = (newSVG) => {
        // Update the GUN database with the new SVG
        gun.get(newSVG.title).put({
            title: newSVG.title,
            svg: newSVG.svg,
        });

        // Update the SVG name list
        setSVGNameList(svgNameList.concat(newSVG.title));
    };

    // Returns a JSX component for the overall application
    return (
        <div
            style={{
                textAlign: "center", // How in the hell does this work
            }}
        >
            <TitleSegment
                svgTitle={svg.title}
                svgNameList={svgNameList}
                changeCurrentSVG={changeCurrentSVG}
            />
            <Divider />
            <Viewer svgData={svg.svg} />
            <Divider />
            <SVGUploadForm updateSVG={updateSVG} />
        </div>
    );
}
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";


function App() {
    return (
        <div>
            <HomePage />
        </div>
    );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(
        <App />
);

export default App;
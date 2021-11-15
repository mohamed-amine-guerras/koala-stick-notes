import React from "react";
import ReactDOM from "react-dom";
import ReactStickyNotes from './components/react-sticky-notes';
import './app.scss';
function App() {
    return (
        <div className="app">
            <div className="app-header">
                <h2>Koala Sticky Notes</h2>
            </div>
            <div className="app-body">
                <ReactStickyNotes
                    backgroundColor="#1F1A24"
                    useCSS={true}
                    containerHeight={"95vmin"}
                    
                />
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

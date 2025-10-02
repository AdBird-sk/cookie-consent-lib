import React from "react";
import CookieConsent from "../src";
import {createRoot} from "react-dom/client";


function App() {
    return (
        <CookieConsent
            language="sk"
            requireAction
            onConsent={(consent) => {
                if (consent.choices.analytics) {
                    console.log("Analytics loaded 🚀")
                }
            }}
            // settingsButtonClass={}
            // storageKey={}
            // showSettingsButton={}
            // texts={}
            // categories={}
            // consentMaxAgeDays={}
        >
            <main>
                <h1>Hello Cookie Consent Demo</h1>
            </main>
        </CookieConsent>
    )
}

createRoot(document.getElementById("root")).render(<App/>)

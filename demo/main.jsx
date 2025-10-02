import React from "react"
import {createRoot} from "react-dom/client"
import {ConsentProvider, CookieBanner, CookieSettingsButton, LoadWhenConsented} from "@"


function App() {
    return (
        <ConsentProvider language="sk">
            <CookieBanner/>

            <footer>
                <CookieSettingsButton/>
            </footer>

            <LoadWhenConsented
                category="analytics"
                onLoad={() => {
                    console.log("Analytics loaded 🚀")
                }}
            />
        </ConsentProvider>
    )
}

createRoot(document.getElementById("root")).render(<App/>)

# cookie-consent-lib

Reusable EU-compliant cookie consent banner for React projects.

- sk, cz, en support
- Banner + Modal
- Configurable categories
- Persisted consent (localStorage)
- Context + hooks + helpers (gate components / load scripts after consent)

## Install (GitHub)

npm install github.com/AdBird-sk/cookie-consent-lib

## Basic usage

```jsx
import { ConsentProvider, CookieBanner, CookieSettingsButton, LoadWhenConsented } from "cookie-consent-lib"

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
            {children}
        </CookieConsent>
    )
}

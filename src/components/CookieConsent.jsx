import CookieBanner from "@/components/CookieBanner.jsx";
import CookieSettingsButton from "@/components/CookieSettingsButton.jsx";
import {ConsentProvider} from "@/context/ConsentContext.jsx";


export default function CookieConsent({children, language = "sk", categories, texts, storageKey, consentMaxAgeDays, requireAction = false, showSettingsButton = false, settingsButtonClass, onConsent}) {
    return (
        <ConsentProvider
            language={language}
            categories={categories}
            texts={texts}
            storageKey={storageKey}
            consentMaxAgeDays={consentMaxAgeDays}
            onChange={onConsent}
        >
            <CookieBanner requireAction={requireAction}/>

            {children}

            {showSettingsButton && <CookieSettingsButton className={settingsButtonClass}/>}
        </ConsentProvider>
    )
}

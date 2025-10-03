import CookieBanner from "@/components/CookieBanner";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import {ConsentProvider} from "@/context/ConsentContext";


export default function CookieConsent({children, language, categories, texts, storageKey, consentMaxAgeDays, requireAction = false, showSettingsButton = false, settingsButtonClass, onConsent, primaryColor}) {
    return (
        <ConsentProvider
            texts={texts}
            language={language}
            onChange={onConsent}
            categories={categories}
            storageKey={storageKey}
            primaryColor={primaryColor}
            consentMaxAgeDays={consentMaxAgeDays}
        >
            <CookieBanner requireAction={requireAction}/>

            {children}

            {showSettingsButton && <CookieSettingsButton className={settingsButtonClass}/>}
        </ConsentProvider>
    )
}

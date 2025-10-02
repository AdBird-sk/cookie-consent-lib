import en from "@/locales/en.json"
import sk from "@/locales/sk.json"
import cz from "@/locales/cz.json"


export function getDefaultTexts(language) {
    if (language === "en") return en
    if (language === "cz") return cz
    return sk
}

export function getDefaultCategories(texts) {
    return [
        {
            id: "necessary",
            label: texts.necessary,
            description: texts.necessaryDesc,
            required: true,
            defaultEnabled: true
        },
        {
            id: "analytics",
            label: texts.analytics,
            description: texts.analyticsDesc,
            required: false,
            defaultEnabled: false
        },
        {
            id: "marketing",
            label: texts.marketing,
            description: texts.marketingDesc,
            required: false,
            defaultEnabled: false
        },
        {
            id: "functional",
            label: texts.functional,
            description: texts.functionalDesc,
            required: false,
            defaultEnabled: false
        }
    ]
}

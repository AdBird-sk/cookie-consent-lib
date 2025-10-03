"use client"

import {useConsent} from "@/hooks/useConsent";
import {getDefaultTexts, getDefaultCategories} from "@/utils/defaults";
import {createContext, useContext, useMemo, useState} from "react";


const ConsentContext = createContext(null)

export function ConsentProvider({children, language = "sk", categories, storageKey = "cookie-consent-v1", consentMaxAgeDays = 365, texts: textsOverride, onChange}) {
    const textsBase = getDefaultTexts(language)
    const texts = {...textsBase, ...(textsOverride || {})}

    const defaultCategories = useMemo(() => {
        return categories && categories.length ? categories : getDefaultCategories(texts)
    }, [categories, texts])

    const {consent, setAll, setMany, isAllowed, save, reset, hasChoice, isExpired, setHasChoice} = useConsent({storageKey, categories: defaultCategories, onChange, consentMaxAgeDays})

    const [isModalOpen, setIsModalOpen] = useState(false)

    const value = {
        texts,
        categories: defaultCategories,
        consent,
        setAll,
        setMany,
        isAllowed,
        save,
        reset,
        hasChoice,
        isExpired,
        setHasChoice,
        isModalOpen,
        setIsModalOpen
    }

    return (
        <ConsentContext.Provider value={value}>
            {children}
        </ConsentContext.Provider>
    )
}

export function useConsentContext() {
    const ctx = useContext(ConsentContext)
    if (!ctx) throw new Error("useConsentContext must be used within <ConsentProvider>")
    return ctx
}

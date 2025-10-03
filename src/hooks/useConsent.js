import {useEffect, useMemo, useState} from "react"

function readLS(key) {
    if (typeof window === "undefined") return null
    try {
        const raw = window.localStorage.getItem(key)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

function writeLS(key, value) {
    if (typeof window === "undefined") return
    try {
        if (value === null) {
            window.localStorage.removeItem(key)
        } else {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    } catch {
    }
}

export function useConsent({storageKey, categories, onChange, consentMaxAgeDays}) {
    const msPerDay = 24 * 60 * 60 * 1000

    const initial = useMemo(() => {
        const stored = readLS(storageKey)
        if (stored && stored.choices && stored.expiresAt && stored.expiresAt > Date.now()) {
            return {consent: stored.choices, hasChoice: true, isExpired: false}
        }
        const defaults = {}
        categories.forEach(c => {
            defaults[c.id] = !!c.defaultEnabled || !!c.required
        })
        return {consent: defaults, hasChoice: false, isExpired: false}
    }, [storageKey, categories])

    const [consent, setConsent] = useState(initial.consent)
    const [hasChoice, setHasChoice] = useState(initial.hasChoice)
    const [isExpired, setIsExpired] = useState(initial.isExpired)

    useEffect(() => {
        const stored = readLS(storageKey)
        if (stored && stored.choices && stored.expiresAt && stored.expiresAt > Date.now()) {
            setConsent(stored.choices)
            setHasChoice(true)
            setIsExpired(false)
        }
    }, [storageKey])

    useEffect(() => {
        if (!hasChoice) return
        const expiresAt = Date.now() + consentMaxAgeDays * msPerDay
        const payload = {choices: consent, timestamp: Date.now(), version: 1, expiresAt}
        writeLS(storageKey, payload)
        if (onChange) onChange(payload)
    }, [consent, hasChoice, consentMaxAgeDays, storageKey, onChange])

    function setAll(enabled) {
        const next = {}
        categories.forEach(c => {
            next[c.id] = c.required ? true : !!enabled
        })
        setConsent(next)
        setHasChoice(true)
        setIsExpired(false)
    }

    function setMany(partial) {
        setConsent(prev => {
            const next = {...prev}
            Object.keys(partial).forEach(k => {
                const cfg = categories.find(c => c.id === k)
                if (!cfg) return
                next[k] = cfg.required ? true : !!partial[k]
            })
            return next
        })
    }

    function isAllowed(id) {
        const cfg = categories.find(c => c.id === id)
        if (!cfg) return false
        if (cfg.required) return true
        return !!consent[id]
    }

    function save() {
        setHasChoice(true)
        setIsExpired(false)
    }

    function reset() {
        const next = {}
        categories.forEach(c => {
            next[c.id] = !!c.defaultEnabled || !!c.required
        })
        setConsent(next)
        setHasChoice(false)
        setIsExpired(false)
        writeLS(storageKey, null)
    }

    return {consent, setAll, setMany, isAllowed, save, reset, hasChoice, isExpired, setHasChoice}
}

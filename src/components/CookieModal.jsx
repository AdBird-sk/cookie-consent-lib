"use client"

import classes from "@/styles/CookieModal.module.css";
import Toggle from "@/components/Toggle";
import {IS_BROWSER} from "@/helpers/isBrowser.js";
import {createPortal} from "react-dom";
import {useConsentContext} from "@/context/ConsentContext";
import {useEffect, useRef, useState} from "react";


export default function CookieModal({isOpen, texts, onClose, requireAction = false}) {
    const {categories, consent, setMany, save, setIsModalOpen, primaryColor} = useConsentContext()

    const [mounted, setMounted] = useState(false)
    const modalRef = useRef(null)

    useEffect(function mount() {
        if (!isOpen || !IS_BROWSER) return
        setMounted(true)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"

        function onKey(e) {
            if (e.key === "Escape" && !requireAction) handleClose()
        }

        window.addEventListener("keydown", onKey)

        return function cleanup() {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prev
            setMounted(false)
        }
    }, [isOpen, requireAction])

    if (!isOpen || !IS_BROWSER) return null

    function handleBackdrop(e) {
        if (requireAction) return
        if (e.target === e.currentTarget) handleClose()
    }

    function handleClose() {
        setIsModalOpen(false)
        onClose && onClose()
    }

    function handleSave() {
        save()
        handleClose()
    }

    return createPortal(
        <div className={`${classes.backdrop} ${mounted ? classes.show : ""}`} role="dialog" aria-modal="true" onMouseDown={handleBackdrop}>
            <div ref={modalRef} className={`${classes.modal} ${mounted ? classes.enter : ""}`}>
                <div className={classes.header}>
                    <div className={classes.title}>{texts.title}</div>
                    {!requireAction && <button className={classes.close} aria-label="Close" onClick={handleClose}>×</button>}
                </div>

                <div className={classes.body}>
                    {categories.map(cat => (
                        <Toggle
                            key={cat.id}
                            id={`cc-${cat.id}`}
                            label={cat.label}
                            description={cat.description}
                            checked={!!consent[cat.id]}
                            disabled={!!cat.required}
                            onChange={checked => setMany({[cat.id]: checked})}
                        />
                    ))}
                </div>

                <div className={classes.footer}>
                    <button className={classes.save} onClick={handleSave} style={{background: primaryColor}}>{texts.save}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

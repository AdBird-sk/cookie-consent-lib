"use client"

import classes from "@/styles/CookieSettingsButton.module.css"
import cookieIcon from "@/assets/cookie.png"
import {useConsentContext} from "@/context/ConsentContext"


export default function CookieSettingsButton({className}) {
    let ctx
    try {
        ctx = useConsentContext()
    } catch {
        ctx = null
    }

    if (!ctx) return null

    const {setIsModalOpen} = ctx

    function handleClick() {
        setIsModalOpen(true)
    }

    return (
        <button
            className={`${classes.button} ${className || ""}`}
            onClick={handleClick}
            aria-label="Cookie settings"
        >
            <img src={cookieIcon} alt="Cookie" className={classes.icon}/>
        </button>
    )
}

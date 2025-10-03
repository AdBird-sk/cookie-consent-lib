"use client"

import classes from "@/styles/CookieBanner.module.css";
import cookieIcon from "@/assets/cookie.png";
import CookieModal from "@/components/CookieModal";
import {useMemo} from "react";
import {useConsentContext} from "@/context/ConsentContext";


export default function CookieBanner({requireAction = false, className, style, texts: textsOverride}) {
    const {texts: baseTexts, hasChoice, isModalOpen, setIsModalOpen, setAll} = useConsentContext()

    const texts = {...baseTexts, ...(textsOverride || {})}
    const visible = useMemo(() => !hasChoice, [hasChoice])

    function handleAcceptAll() {
        setAll(true)
    }

    function handleRejectAll() {
        setAll(false)
    }

    function openCustomize() {
        setIsModalOpen(true)
    }

    return (
        <>
            {visible &&
                <div
                    className={`${classes.wrapper} ${classes.show} ${className || ""}`}
                    style={style}
                    role="dialog"
                    aria-live="polite"
                >
                    <div className={classes.content}>
                        <div className={classes.logoWrap}>
                            <img src={cookieIcon} alt="Cookie" width="32" height="32"/>
                        </div>

                        <div className={classes.textWrap}>
                            <div className={classes.title}>{texts.title}</div>
                            <div className={classes.description}>{texts.description}</div>
                        </div>

                        <div className={classes.actions}>
                            <button className={classes.reject} onClick={handleRejectAll}>
                                {texts.rejectAll}
                            </button>
                            <button className={classes.customize} onClick={openCustomize}>
                                {texts.customize}
                            </button>
                            <button className={classes.accept} onClick={handleAcceptAll}>
                                {texts.acceptAll}
                            </button>
                        </div>
                    </div>
                </div>
            }

            {isModalOpen &&
                <CookieModal
                    isOpen
                    texts={texts}
                    onClose={() => {
                    }}
                    requireAction={requireAction}
                />
            }
        </>
    )
}

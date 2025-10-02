import React, { useMemo } from "react";
import { useConsentContext } from "@/context/ConsentContext";
import CookieModal from "@/components/CookieModal";
import cookieIcon from "@/assets/cookie.png";
import classes from "@/styles/CookieBanner.module.css";

export default function CookieBanner({
                                         mode = "banner",           // "banner" | "modal"
                                         requireAction = false,     // if true, no close until a choice is saved
                                         className,
                                         style,
                                         texts: textsOverride
                                     }) {
    const {
        texts: baseTexts,
        hasChoice,
        isModalOpen,
        setIsModalOpen,
        setAll
    } = useConsentContext();

    const texts = { ...baseTexts, ...(textsOverride || {}) };

    // Visible when user hasn't chosen yet.
    const visible = useMemo(() => !hasChoice, [hasChoice]);

    function handleAcceptAll() {
        setAll(true)
    }

    function handleRejectAll() {
        setAll(false)
    }

    function openCustomize() {
        setIsModalOpen(true)
    }

    // Centered modal mode: show modal immediately if no choice
    if (mode === "modal" && visible) {
        return (
            <>
                <CookieModal
                    isOpen
                    texts={texts}
                    requireAction={requireAction}
                    onClose={() => {}}
                />
            </>
        )
    }

    // Bottom banner mode
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
                            <img src={cookieIcon} alt="Cookie" width="32" height="32" />
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
                    onClose={() => {}}
                    requireAction={requireAction}
                />
            }
        </>
    )
}

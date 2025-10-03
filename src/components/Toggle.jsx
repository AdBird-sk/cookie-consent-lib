"use client"

import classes from "@/styles/Toggle.module.css";
import {useConsentContext} from "@/context/ConsentContext";


export default function Toggle({checked, disabled, onChange, label, description, id}) {
    const {primaryColor} = useConsentContext()

    function handleChange(e) {
        if (disabled) return
        onChange && onChange(e.target.checked)
    }

    return (
        <div className={classes.toggleRow} aria-disabled={disabled}>
            <div className={classes.meta}>
                <div className={classes.label} id={id + "-label"}>{label}</div>
                {description && <div className={classes.description}>{description}</div>}
            </div>
            <label className={classes.switch}>
                <input
                    id={id}
                    type="checkbox"
                    checked={!!checked}
                    disabled={disabled}
                    onChange={handleChange}
                    aria-checked={!!checked}
                    aria-labelledby={id + "-label"}
                />
                <span className={classes.slider} style={{background: checked ? primaryColor : "#ccc", opacity: disabled && checked ? 0.6 : 1}}/>
            </label>
        </div>
    )
}

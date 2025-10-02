import classes from "@/styles/Toggle.module.css";


export default function Toggle({checked, disabled, onChange, label, description, id}) {
    function handleChange(e) {
        if (disabled) return
        onChange && onChange(e.target.checked)
    }

    return (
        <div className={classes.toggleRow} aria-disabled={disabled}>
            <div className={classes.meta}>
                <div className={classes.label}>{label}</div>
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
                <span className={classes.slider}/>
            </label>
        </div>
    )
}

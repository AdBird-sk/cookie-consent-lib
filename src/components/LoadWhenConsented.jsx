import {useEffect, useRef} from "react";
import {useConsentContext} from "@/context/ConsentContext";


export default function LoadWhenConsented({category, onLoad, deps = []}) {
    const {isAllowed} = useConsentContext()
    const loadedRef = useRef(false)

    useEffect(function maybeLoad() {
        if (!loadedRef.current && isAllowed(category)) {
            loadedRef.current = true
            onLoad && onLoad()
        }
    }, [category, isAllowed, ...deps])

    return null
}

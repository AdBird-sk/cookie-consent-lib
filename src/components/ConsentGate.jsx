import {useConsentContext} from "@/context/ConsentContext.jsx";


export default function ConsentGate({category, fallback, children}) {
    const {isAllowed} = useConsentContext()
    if (!isAllowed(category)) return fallback || null
    return children
}

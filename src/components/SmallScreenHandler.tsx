import { useEffect, useState } from "react"

function updateSmallScreen(setSmallScreen: CallableFunction) {
    useEffect(() => {
        function onScreenSizeChange() {
            setSmallScreen(window.innerWidth <= 750)
        }

        onScreenSizeChange()
        window.addEventListener("resize", onScreenSizeChange)

        return () => {
            window.removeEventListener("resize", onScreenSizeChange)
        }
    }, [])
}

interface SizeScreenProps {
    children: React.ReactNode
}

export function SmallScreen({ children, }: SizeScreenProps) {
    const [smallScreen, setSmallScreen] = useState(false)
    updateSmallScreen(setSmallScreen)

    return (<>{smallScreen && children}</>)
}

export function LargeScreen({ children, }: SizeScreenProps) {
    const [smallScreen, setSmallScreen] = useState(false)
    updateSmallScreen(setSmallScreen)

    return (<>{!smallScreen && children}</>)
}

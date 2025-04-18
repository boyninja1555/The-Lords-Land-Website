import React from "react"

interface ExternalLinkProps {
    children: React.ReactNode
    href: string
}

export default function ExternalLink({ children, href, }: ExternalLinkProps) {
    const url = new URL(href)

    const onExternalLinkOpen = React.useCallback(() => {
        const confirmed = confirm(`Are you sure you want to visit this website?\n\n${url.hostname}`)

        if (confirmed) {
            window.open(url.href, "_blank")
        }
    }, [url])

    return (
        <>
            <button onClick={onExternalLinkOpen} style={{ display: "inline-block", width: "max-content", cursor: "pointer", }}>
                {children}
            </button>
        </>
    )
}

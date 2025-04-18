import React from "react"

interface ExternalLinkProps {
    children: React.ReactNode
    href: string
}

export default function ExternalLink({ children, href, }: ExternalLinkProps) {
    const url = new URL(href)

    const onExternalLinkOpen = React.useCallback(() => {
        let confirmed: boolean | null

        if (url.protocol === "mailto:")
            confirmed = confirm(`Are you sure you want to email this person?\n\n${url.pathname || url}`)
        else
            confirmed = confirm(`Are you sure you want to visit this website?\n\n${url.hostname || url}`)

        if (confirmed) {
            window.open(url.href, "_blank")
        }
    }, [url])

    return (
        <>
            <button onClick={onExternalLinkOpen} style={{ display: "inline-block", width: "max-content", cursor: "pointer", }} className="anchor">
                {children}
            </button>
        </>
    )
}

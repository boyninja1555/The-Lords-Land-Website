import { useEffect, useState } from "react";
import { SmallScreen, LargeScreen } from "./SmallScreenHandler";
import MenuIcon from "../assets/icon/menu.svg";

export default function NavBarLinks() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <SmallScreen>
                <span onClick={() => setVisible(!visible)} className="text-[3rem] cursor-pointer">
                    <img src={MenuIcon.src} alt="#" className="h-[3rem]" />
                </span>
                <div className="p-[1rem] bg-background-2 w-[80%] h-screen top-0 left-0 fixed z-[70]" style={{
                    visibility: visible ? "visible" : "hidden",
                }}>
                    <ul className="flex flex-col gap-[1rem]">
                        <li><a href="/">Home</a></li>
                        <li><a href="/article/about-us">About Us</a></li>
                        <li><a href="/article/server-guide">Server Guide</a></li>
                        <li><a href="/updates">Updates</a></li>
                        <li>
                            <a href="/support-us">Support Us</a>
                        </li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq/Info/Intro">FAQs</a></li>
                    </ul>
                </div>
            </SmallScreen>
            <LargeScreen>
                <ul className="flex gap-[1rem]">
                    <li><a href="/">Home</a></li>
                    <li><a href="/article/about-us">About Us</a></li>
                    <li><a href="/article/server-guide">Server Guide</a></li>
                    <li><a href="/updates">Updates</a></li>
                    <li>
                        <a href="/support-us">Support Us</a>
                    </li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/faq/Info/Intro">FAQs</a></li>
                </ul>
            </LargeScreen>
        </>
    )
}

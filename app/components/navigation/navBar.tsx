import type INavLink from "utils/interfaces/INavLink"

import {House} from "lucide-react"

import "../../styles/fonts.css"
import { useEffect, useRef, useState } from "react"
import NavItem from "./navItem";
import classNames from "classnames";

const observerThreshold: number = 0.5;

const NavLinks: INavLink[] = [
    { id: "home", name: "Home", icon: <House/> },
    { id: "about", name: "About", icon: <House /> },
    { id: "experience", name: "Experience", icon: <House /> },
    { id: "projects", name: "Projects", icon: <House />  },
    { id: "skills", name: "Skills", icon: <House />  },
    { id: "education", name: "Education", icon: <House />  },
    { id: "contact", name: "Contact", icon: <House />  },
]

export default function NavBar({ observerRefs } : {observerRefs : React.RefObject<HTMLElement[]>})
{
    const [activeKey, setActiveKey] = useState(0);
    const observers = useRef<IntersectionObserver[]>([]);

    const onClick = (_: any, key: number) => {
        setActiveKey(key)
    }

    const observerCallback = async (e: IntersectionObserverEntry[], key: number) => {
        if (e.length && e[0].isIntersecting) {
            setActiveKey(key)
        }
    }

    useEffect(() => {
        if (observerRefs.current?.length && observers.current) {
            observerRefs.current.forEach((_r: HTMLElement, key: number) => {
                observers.current[key] = new IntersectionObserver((e) => {
                    observerCallback(e, key);
                }, {threshold: observerThreshold})
                if (observerRefs.current[key])
                {
                    observers.current[key].observe(observerRefs.current[key])
                }
            })
        }
        return () => 
            observers.current?.forEach((observer) => observer?.disconnect())
    },
    [observerRefs, observers])

    return (
        <nav id="navbar" className="sticky top-0 w-64 h-screen bg-dark pt-4">
            <ul id='nav-links'
                className="flex-col w-56 mx-4">
                    {NavLinks.map((link, key) => {
                        return (
                            <NavItem
                                key={key}
                                link={link}
                                isActive={activeKey == key}>
                            </NavItem>
                        )
                    })}
            </ul>
        </nav>
    )
}

import { NavLink } from "react-router";
import type INavLink from "utils/interfaces/INavLink";
import classNames from "classnames"

export default function NavItem({link, isActive} : {link: INavLink, isActive: boolean})
{
    return (
        <li key = {link.name}
            className="my-4">
            <NavLink to={`#${link.id}`}
                     className={
                        classNames(isActive ? 'bg-primary' : 'bg-dark',
                        "text-txt-light text-lg my-auto",
                        "size-full w-56 h-12 my-4 rounded-lg flex",
                        )}>
                <div className="size-6 mx-4 my-3">
                    {link.icon}
                </div>
                <div className="my-auto">
                    {link.name}
                </div>
            </NavLink>
        </li>
    )
}

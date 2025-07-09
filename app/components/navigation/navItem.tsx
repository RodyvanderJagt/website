import { NavLink } from 'react-router';
import type INavLink from 'utils/interfaces/INavLink';
import classNames from 'classnames';

export default function NavItem({
  link,
  isActive,
  isCollapsed
}: {
  link: INavLink;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  return (
    <li key={link.name} className="my-4">
      <NavLink
        to={`#${link.id}`}
        className={classNames(
          isActive ? 'bg-primary' : 'bg-dark',
          isCollapsed ? 'w-13' : 'w-56',
          'text-txt-light text-lg my-auto',
          'size-full h-12 rounded-lg flex'
        )}
      >
        <div
          className={classNames(
            isCollapsed ? 'm-auto' : 'my-auto mx-4',
            'size-6'
          )}
        >
          {link.icon}
        </div>
        <span className={classNames(isCollapsed ? 'sr-only' : '', 'my-auto')}>
          {link.name}
        </span>
      </NavLink>
    </li>
  );
}

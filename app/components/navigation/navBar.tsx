import type INavLink from 'utils/interfaces/INavLink';

import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  House,
  Menu,
  X
} from 'lucide-react';

import '../../styles/breakpoints.css';
import '../../styles/fonts.css';
import { useEffect, useRef, useState } from 'react';
import NavItem from './navItem';
import classNames from 'classnames';

const observerThreshold: number = 0.5;

const NavLinks: INavLink[] = [
  { id: 'home', name: 'Home', icon: <House /> },
  { id: 'about', name: 'About', icon: <House /> },
  { id: 'experience', name: 'Experience', icon: <House /> },
  { id: 'projects', name: 'Projects', icon: <House /> },
  { id: 'skills', name: 'Skills', icon: <House /> },
  { id: 'education', name: 'Education', icon: <House /> },
  { id: 'contact', name: 'Contact', icon: <House /> }
];

export default function NavBar({
  observerRefs
}: {
  observerRefs: React.RefObject<HTMLElement[]>;
}) {
  const [activeKey, setActiveKey] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const observers = useRef<IntersectionObserver[]>([]);

  const collapseButtonStyle = 'size-10 bg-primary rounded-full text-white flex';

  const observerCallback = async (
    e: IntersectionObserverEntry[],
    key: number
  ) => {
    if (e.length && e[0].isIntersecting) {
      setActiveKey(key);
    }
  };

  useEffect(() => {
    if (observerRefs.current?.length && observers.current) {
      observerRefs.current.forEach((_r: HTMLElement, key: number) => {
        observers.current[key] = new IntersectionObserver(
          (e) => {
            observerCallback(e, key);
          },
          { threshold: observerThreshold }
        );
        if (observerRefs.current[key]) {
          observers.current[key].observe(observerRefs.current[key]);
        }
      });
    }
    return () =>
      observers.current?.forEach((observer) => observer?.disconnect());
  }, [observerRefs, observers]);

  return (
    <div className="sticky top-0">
      <button
        className={classNames(
          collapseButtonStyle,
          'absolute top-4 left-4',
          isCollapsed ? 'hamburger:hidden' : 'hidden'
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="m-auto" />
      </button>
      <nav
        id="navbar"
        className={classNames(
          'sticky top-0 h-screen bg-dark p-4',
          isCollapsed ? 'w-21  max-hamburger:hidden' : 'w-64'
        )}
      >
        <div
          id="collapse-button"
          className={classNames(
            'max-hamburger:hidden w-full h-10 hamburger:flex',
            isCollapsed ? 'justify-center' : 'justify-end'
          )}
        >
          <button
            className={classNames(collapseButtonStyle)}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ArrowBigRightDash className="m-auto" />
            ) : (
              <ArrowBigLeftDash className="m-auto" />
            )}
          </button>
        </div>

        <div className="hamburger:hidden">
          <button
            className={classNames(collapseButtonStyle)}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <X className="m-auto" />
          </button>
        </div>

        <ul id="nav-links" className="flex-col">
          {NavLinks.map((link, key) => {
            return (
              <NavItem
                key={key}
                link={link}
                isActive={activeKey == key}
                isCollapsed={isCollapsed}
              ></NavItem>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

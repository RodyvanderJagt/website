import type { Route } from './+types/app';
import { About } from '../components/about';
import '../styles/colors.css'
import NavBar from 'components/navigation/navBar';
import { Home } from 'components/home';
import { useRef } from 'react';
import type ISection from 'utils/interfaces/ISection';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ];
}

const sections: ISection[] = [
    { id: "home", content: <Home />},
    { id: "about", content: <About />},
    { id: "experience", content: <About />},
    { id: "projects", content: <About />},
    { id: "skills", content: <About />},
    { id: "education", content: <About />},
    { id: "contact", content: <About />}
]

export default function App() {
  const sectionRefs = useRef<HTMLElement[]>([]);

  return (
    <div className="flex">
      <div className="flex-none">
        <NavBar observerRefs={sectionRefs}/>
      </div>
      <div className='flex-1'>
        <main>
          {
            sections.map((section, key) => {
              return (
                <section 
                    id={section.id}
                    key={section.id}
                    ref={(el) => { if (el) { sectionRefs.current[key] = el }}}>
                    {section.content}
                </section>
              )
            })
          }

          {/* <section id='home'
                  ref = {(el) => { if(el) { sectionRefs.current[0] = el}}}>
            <Home />
          </section>
          <section id='about'
                  ref = {(el) => { if(el) { sectionRefs.current[1] = el}}}>
            <About />
          </section> */}
        </main>
      </div>
    </div>
  )
}



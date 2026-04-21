import { useState } from 'react'
import { useEffect } from 'react';
import type { Project } from "./types";
import ProjectInput from "./components/ProjectInput";
import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import './App.css'

export default function App() {
  // Hoiab projektid massiivis ning hoiab meeles eelnevalt salvestatud projekte.
  // catch vältib crashi kui JSON päring ebaõnnestub (nt kui localStorage on rikutud).
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("projects");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  // Määrab kuidas projektid filtreeritakse ja sorteeritakse. Võimalikud väärtused: 'all', 'liked', 'newest', 'oldest'.
  const [filter, setFilter] = useState<'all' | 'liked' | 'newest' | 'oldest'>('all');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Salvestab projektide muudatusi ja teema eelistust localStorage'i, et need säiliksid lehe uuesti laadimisel.
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [projects, darkMode]);

  // Lisab projekti
  const addProject = (title: string, description: string) => {
    const newProject: Project = {
      id: Date.now(),
      title,
      description,
      liked: false,
      createdAt: Date.now(),
    };
    // lisab uue projekti olemasolevate projektide ette, et uus projekt oleks nimekirja tipus.
    setProjects(prev => [newProject, ...prev]);
  };

  // Kustutab projekti ID alusel
  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Vahetab projekti meeldimise olekut ID alusel
  const toggleLike = (id: number) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, liked: !project.liked } : project
    ));
  };

  // Muudab projekti pealkirja ID alusel
  const editProject = (id: number, title: string) => {
    setProjects(prev => prev.map(project =>
      project.id === id ? { ...project, title } : project
    ));
  };

  // Filtreerib ja sorteerib projektid vastavalt valitud filtrile.
  const filteredProjects = [...projects]
  .filter(project => {
    if (filter === 'liked') return project.liked;
    return true;
  })
  .sort((a, b) => {
    if (filter === 'newest') return b.createdAt - a.createdAt;
    if (filter === 'oldest') return a.createdAt - b.createdAt;
    return 0;
  });


  // Render
  return (
    //dark mode ja light mode vahel vahetamiseks kasutatakse CSS klasse 'dark' ja 'light'
    <div className={darkMode ? 'app dark' : 'app light'}>
      <div className="container">
        <header className="header">
          <h1>My Developer Portfolio</h1>
          <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
        </header>
        <div className="top-bar">
          {/* //Projekti sisestamise vorm ja filtrite tööriistariba */}
          <ProjectInput addProject={addProject} />
          <FilterBar setFilter={setFilter} current={filter} />
        </div>
        

        {/* // Kui projekte pole, näidatakse sõnumit. Vastasel juhul renderdatakse projektide nimekiri. */}
        {projects.length === 0 ? (
          <p className="empty">No projects yet.</p>
        ) : (
          // Projektide nimekiri, kus saab kustutada, meeldida ja redigeerida projekte.
          <ProjectList 
            projects={filteredProjects}
            deleteProject={deleteProject}
            toggleLike={toggleLike}
            editProject={editProject}
          />
        )}
      </div>
        <footer>
          @Risto Kivisitk 2026
        </footer>
    </div>
  )
}
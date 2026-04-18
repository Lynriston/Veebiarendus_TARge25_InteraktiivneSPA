import { useState } from 'react'
import type { Project } from "./types";
import ProjectInput from "./components/ProjectInput";
import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import './App.css'

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [darkMode, setDarkMode] = useState(false);

  const addProject = (title: string, description: string) => {
    const newProject: Project = {
      id: Date.now(),
      title,
      description,
      liked: false,
      createdAt: Date.now(),
    };
    setProjects([newProject, ...projects]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const toggleLike = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, liked: !project.liked } : project
    ));
  };

  const editProject = (id: number, title: string) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, title } : project
    ));
  };

  const safeProjects = Array.isArray(projects) ? projects : [];

  const filteredProjects = safeProjects.filter(project => filter === 'liked' ? project.liked : true);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="header">
        <h1>My Developer Portfolio</h1>
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme </button>
      </header>

      <ProjectInput addProject={addProject} />
      <FilterBar setFilter={setFilter} />

      {safeProjects.length === 0 ? (
        <p className="empty">Pole veel projekte</p>
      ) : (
        <ProjectList 
          projects={filteredProjects}
          deleteProject={deleteProject}
          toggleLike={toggleLike}
          editProject={editProject}
        />
      )}
    </div>
  )
}
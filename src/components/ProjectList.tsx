import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

//Saab App-ist projects, deleteProject, toggleLike ja editProject funktsioonid propsidena 
export default function ProjectList({ projects, deleteProject, toggleLike, editProject }: any) {
    // Kontrollib, kas projects on massiiv. Kui ei, siis ei renderdata midagi.
    if (!Array.isArray(projects)) return null;

    //Render.
    return (
        <div className="grid">
            //Käib läbi projekti massiivi ja kuvab iga projekti jaoks ProjectCard komponendi.
            {projects.map((project: Project) => (
                // Iga ProjectCard saab propsidena projekti andmed ja funktsioonid, 
                // mida kasutatakse projekti haldamiseks (kustutamine, meeldimine, pealkirja muutmine).
                <ProjectCard
                    key={project.id}
                    project={project}
                    deleteProject={deleteProject}
                    toggleLike={toggleLike}
                    editProject={editProject}
                />
            ))}
        </div>
    );
}
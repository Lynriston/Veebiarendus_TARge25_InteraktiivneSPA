import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, deleteProject, toggleLike, editProject }: any) {
    if (!Array.isArray(projects)) return null;

    return (
        <div className="grid">
            {projects.map((project: Project) => (
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
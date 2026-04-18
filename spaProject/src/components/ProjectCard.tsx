import { useState } from "react";

export default function ProjectCard({ project, deleteProject, toggleLike, editProject }: any) {
    if (!project) return null;
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setTitle] = useState(project?.title || "");

    return (
        <div className="card">
            {isEditing ? (
                <input
                    value={newTitle}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={() => {
                        if (!project) return;
                        editProject(project.id, newTitle);
                        setIsEditing(false);
                    }}
                />
            ) : (
                <h2 onClick={() => setIsEditing(true)}>{project.title}</h2>
            )}

            <p>{project.description}</p>

            <div className="actions">
                <button onClick={() => toggleLike(project.id)}>
                    {project.liked ? 'Unlike' : 'Like'}
                </button>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
            </div>
        </div>
    );
}
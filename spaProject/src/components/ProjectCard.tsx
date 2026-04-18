import { useState } from "react";

export default function ProjectCard(props: any) {
    const { project, deleteProject, toggleLike, editProject } = props;
    if (!project) return null;
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(project?.title || "");


    return (
        <div className="card">
            {isEditing ? (
                <input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
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
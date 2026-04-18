import { useState } from "react";

export default function ProjectInput({ addProject}: any) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        if (!title.trim()) return;
        addProject(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="input-row">
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Project Title"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button onClick={handleAdd}>Add Project</button>
        </div>
    );
}


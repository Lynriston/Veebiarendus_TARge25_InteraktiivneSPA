import { useState } from "react";

// Kuvab projekti kaardi, mis sisaldab projekti pealkirja, 
// kirjeldust ning nuppe meeldimiseks, 
// kustutamiseks ja pealkirja muutmiseks. 
// Pealkirja klikkides saab selle muuta.
export default function ProjectCard(props: any) {
    const { project, deleteProject, toggleLike, editProject } = props; //Võtab propsidest projekti andmed ja funktsioonid, mida kasutatakse projekti haldamiseks
    if (!project) return null; // Kui projekti pole, ei renderdata midagi
    const [isEditing, setIsEditing] = useState(false); //Kas pealkiri on muutmise režiimis
    const [newTitle, setNewTitle] = useState(project?.title || ""); //Hoiab inputi väärtust pealkirja muutmisel


    return (
        <div className="card">
            {isEditing ? (
                //kontrollib kas pealkiri on muutmise režiimis. Kui on, kuvab inputi, kus saab pealkirja muuta. Kui input kaotab fookuse (onBlur), salvestatakse uus pealkiri ja väljutakse muutmise režiimist.
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
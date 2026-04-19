import { useState } from "react";

// Kuvab projekti sisestamise vormi.
export default function ProjectInput({ addProject}: any) {
    // Hoiab pealkirja ja kirjelduse väärtusi.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //ei luba tühja pealkirja.
    const handleAdd = () => {
        if (!title.trim()) return;
        //Saadab andmed üles app-i.
        addProject(title, description);
        //resetib sisestusväljad pärast projekti lisamist.
        setTitle('');
        setDescription('');
    };

    //Render.
    return (
        <div className="input-row">
            //Controllib inputi.
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Project Title"
                // Võimaldab lisada projekti Enteri klahviga.
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            //lisab teise inputi projekti kirjelduse jaoks.
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
            />
            //Sama nupp, mis võimaldab lisada projekti klikkides.
            <button onClick={handleAdd}>Add Project</button>
        </div>
    );
}


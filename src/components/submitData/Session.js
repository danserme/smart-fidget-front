import React, { useState} from "react";
import AboutSession from "./AboutSession";
import Correlations from "./Correlations";

export default function Session({ session }) {
    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState({});
    
    return(
        <div>
            <div className="w-11/12 border mx-auto my-5 p-5">
                {!edit && <AboutSession onEdit={setEdit} session={session} key={session} notes={notes} onNotes={setNotes} />}
                {edit && <Correlations onEdit={setEdit} session={session} key={session} notes={notes} onNotes={setNotes} />}
            </div>
        </div>
    );
}
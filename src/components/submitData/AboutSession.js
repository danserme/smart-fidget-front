import React from "react";
import Heart from "../ui/icons/Heart";
import Edit from "../ui/icons/Edit";
import Tag from "../ui/Tag";

const placeholder = {
    startTime: "23:54:02",
    endTime: "23:59:27",
    min: 67,
    max: 109,
    avg: 98,
    id: 1
}

export default function AboutSession({ notes, session = placeholder , onEdit, onNotes, tot = 3 }) {
    return(
        <div>
            <header className="flex justify-between">
                <div className="flex justify-between gap-5">
                    <h1 className="text-xl flex font-bold">{session.id + "/" + tot}</h1>
                    <h3 className="text-lg font-semibold">{session.startTime} – {session.endTime}</h3>
                    <div className="flex gap-2"><Heart />{session.min} min BPM</div>
                    <div className="flex gap-2"><Heart />{session.max} max BPM</div>
                    <div className="flex gap-2"><Heart />{session.avg} avg BPM</div>
                </div>
                <div className="flex gap-2 cursor-pointer" onClick={() => {
                        onEdit(true);
                        onNotes({});
                    }}>
                    <Edit />
                    <button className="underline text-indigo-600">Edit</button>
                </div>
            </header>
            <main className="my-5">
                <div className="flex flex-wrap gap-2 py-3">
                    <div className="flex flex-wrap gap-2 py-3">
                        {notes.mood && notes.mood.map((el, i) => {
                            return(
                                <Tag tag={el} selectable={false} key={i} />
                            )
                        })}
                    </div>
                    <div className="flex flex-wrap gap-2 py-3">
                        {notes.activity && notes.activity.map((el, i) => {
                            return(
                                <Tag tag={el} selectable={false} key={i} />
                            )
                        })}
                    </div>
                </div>
                <div>
                    {notes.comment}
                </div>
            </main>
        </div>
    );
}
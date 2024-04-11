import React from "react";
import Heart from "../ui/icons/Heart";
import Edit from "../ui/icons/Edit";
import Tag from "../ui/Tag";

export default function AboutSession({ notes, session, onEdit, onNotes}) {
    return(
        <div>
            <header className="flex justify-between">
                <div className="flex justify-between gap-5">
                    <h1 className="text-xl font-bold">1/2</h1>
                    <h3 className="text-lg font-semibold">11.00 – 11.20</h3>
                    <div className="flex gap-2"><Heart />min BPM</div>
                    <div className="flex gap-2"><Heart />max BPM</div>
                    <div className="flex gap-2"><Heart />avg BPM</div>
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
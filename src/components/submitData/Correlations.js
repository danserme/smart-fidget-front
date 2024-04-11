import React from "react";
import Question from "./Question";
import data from '../../utils/data.json';
import CTAButton from "../ui/buttons/CTAButton";
import Heart from '../ui/icons/Heart'

export default function Correlations({ notes, session, onEdit, onNotes }) {
    const questions = data.questions;

    return(
        <div>
            <main>
                <div className="flex gap-5 content-center">
                    <h1 className="text-xl font-bold">1/2</h1>
                    <h3 className="text-lg font-semibold">11.00 - 11.20</h3>
                    <div className="flex gap-2"><Heart />min BPM</div>
                    <div className="flex gap-2"><Heart />max BPM</div>
                    <div className="flex gap-2"><Heart />avg BPM</div>
                </div>
                <div>
                    {questions.map((question)=>{
                        return(<Question question={question} key={question.id} onNotes={onNotes} notes={notes} />)
                    })}
                </div>
                <div className="text-center" onClick={() => onEdit(false)} >
                    <CTAButton text={"Save"} />
                </div>
            </main>
        </div>
    )
}
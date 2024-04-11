import React from "react";
import Heart from "../ui/icons/Heart";
import ArrowLeft from "../ui/icons/ArrowLeft";
import { Link } from "react-router-dom";
import CTAButton from "../ui/buttons/CTAButton";
import Session from "./Session";

export default function NewData({ data }) {
    const sessions = ["1", "2", "3"];
    let list;
    if (data) {
        list = data.slice(3);
        const parsedObjects = findJsonObjects(list);
        const combinedData = parsedObjects.flatMap(obj => obj.data);
        console.log(combinedData);
    }
    function findJsonObjects(inputString) {
        const jsonObjects = [];
        let depth = 0;
        let objStart = -1;
        for (let i = 0; i < inputString.length; i++) {
            const char = inputString[i];
            if (char === '{') {
                depth++;
                if (depth === 1) {
                    // Possible start of a JSON object
                    objStart = i;
                }
            } else if (char === '}') {
                depth--;
                if (depth === 0 && objStart !== -1) {
                    // End of a JSON object
                    try {
                        const objString = inputString.substring(objStart, i + 1);
                        const obj = JSON.parse(objString);
                        jsonObjects.push(obj);
                        objStart = -1; // Reset start index
                    } catch (e) {
                        console.error("Parsing error:", e);
                    }
                }
            }
        }
        return jsonObjects;
    }

    return(
        <div className="w-full border">
            <header className="mx-auto px-2 pt-5 border-b pb-10">
                <div>
                    <Link to="/myrecords">
                        <ArrowLeft />
                    </Link>
                    <h1 className="text-xl text-center font-bold mb-3">New Record</h1>
                </div>
                <div className="w-1/2 mx-auto">
                    <div className="w-full flex justify-between">
                        <p>You fidgeted 2 times</p>
                        <div className="flex gap-2"><Heart />min BPM</div>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>Total Duration of 16 min</p>
                        <div className="flex gap-2"><Heart />max BPM</div>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>You mostly used rotations</p>
                        <div className="flex gap-2"><Heart />avg BPM</div>
                    </div>
                </div>
                {data && <p>{data}</p>}
            </header>
            <div>
                {
                    sessions.map((session, index) => {
                        return(
                            <Session session={session} key={index} />
                        )
                    })
                }
            </div>
            <div className="border-t text-center p-5">
                <CTAButton text="Upload" />
            </div>
        </div>
    )
}
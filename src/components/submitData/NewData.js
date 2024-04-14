import React from "react";
import Heart from "../ui/icons/Heart";
import ArrowLeft from "../ui/icons/ArrowLeft";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "../ui/buttons/CTAButton";
import Session from "./Session";

export default function NewData({ data, onDisconnectDevice, onSetNewDataAvailable }) {
    const navigate = useNavigate();
    const handleUploadClick = () => {
        onDisconnectDevice();
        onSetNewDataAvailable(false);
        navigate('/myrecords');
    };

    let avgHB;
    let minHB;
    let maxHB;

    const sessions = ["1", "2", "3"];
    console.log("data", data)
    let list;
    let combinedData;
    if (data) {
        list = data.slice(3);
        console.log(list)
        const parsedObjects = findJsonObjects(data);
        combinedData = parsedObjects.flatMap(obj => obj.data);

        getValuesHB(combinedData);
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
        console.log("single obj", jsonObjects)
        return jsonObjects;
    }

    function getValuesHB(list) {
        minHB = list[0].min;
        let sum;
        for (const item in combinedData) {
            if(item.min < minHB) {
                minHB = item.min;
            }
            if (item.max > maxHB) {
                maxHB = item.max;
            }
            sum+=item.avg;
        }
        avgHB = sum / combinedData.length;
    }
    

    return(
        <div className="w-full border">
            <header className="mx-auto px-2 pt-5 border-b pb-10">
                <div>
                    <Link to="/myrecords">
                        <ArrowLeft />
                    </Link>
                    <h1 className="text-2xl text-center font-bold mb-3">New Record</h1>
                </div>
                <div className="w-1/2 mx-auto">
                <div className="w-full flex justify-between">
                        {data && <p>Date {combinedData[0].date}</p>}
                        {!data && <p>Date 8.04.2024</p>}
                        <div className="flex gap-2"><Heart />{avgHB && <div>{avgHB}</div>} avg BPM</div>
                    </div>
                    <div className="w-full flex justify-between">
                        {data && <p>You fidgeted {combinedData.length} times</p>}
                        {!data && <p>You fidgeted 3 times</p>}
                        <div className="flex gap-2"><Heart />{minHB && <div>{minHB}</div>} min BPM</div>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>Total duration of 16 min</p>
                        <div className="flex gap-2"><Heart />{maxHB && <div>{maxHB}</div>} max BPM</div>
                    </div>
                    {/* <div className="w-full flex justify-between">
                        <p>You mostly used rotations</p>
                        <div className="flex gap-2"><Heart />avg BPM</div>
                    </div> */}
                </div>
            </header>
            <div>
                {
                    data && combinedData.map((session, index) => {
                        return(
                            <Session session={session} tot={combinedData.length} key={index} />
                        )
                    })
                }
            </div>
            <div>
                {
                    !data && sessions.map((session, index) => {
                        return(
                            <Session session={session} key={index} tot={sessions.length} />
                        )
                    })
                }
            </div>
            <div className="border-t text-center p-5" onClick={() => handleUploadClick()}>
                <CTAButton text="Upload" />
            </div>
        </div>
    )
}
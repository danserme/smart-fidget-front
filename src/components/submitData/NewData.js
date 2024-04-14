import React from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "../ui/buttons/CTAButton";
import Session from "./Session";
import Summary from "./Summary";

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
    let duration;

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
            duration += item.duration;
            if(item.min < minHB) {
                minHB = item.min;
            }
            if (item.max > maxHB) {
                maxHB = item.max;
            }
            sum+=item.avg;
        }
        avgHB = sum / combinedData.length;
        duration /= (3600 * 60);
    }
    

    return(
        <div className="w-full border">
            <Summary len={combinedData ? combinedData.length : 3} 
                date={combinedData ? combinedData[0].date : "8.4.24"} 
                avg={avgHB ? avgHB : 98} 
                max={maxHB ? maxHB : 109} 
                min={minHB ? minHB : 67}
                duration={duration ? duration : 16} />
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
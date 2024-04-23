import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import CTAButton from "../ui/buttons/CTAButton";
import Session from "./Session";
import Summary from "./Summary";
import SmartFidget from "../../contracts/SmartFidget.sol/SmartFidget.json";
import { ethers } from "ethers";
import readData from "../../utils/readData";

const smartFidgetAddress = "0x810380b8f11537bf5A9267Ed130F3988dCe51923";


export default function NewData({ data, onDisconnectDevice, onSetNewDataAvailable }) {
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    let avgHB;
    let minHB;
    let maxHB;
    let main; //0 is for ccw, 1 is for cw and 2 is for p
    let values = {
        p: 0,
        ccw : 0,
        cw: 0
    };
    let duration;
    let sessionCount;
    let date;

    const sessions = ["1", "2", "3"];
    let list;
    let combinedData;
    if (data) {
        list = data.slice(3);
        combinedData = JSON.parse(list).data;
        console.log(combinedData);
        sessionCount = combinedData.length;
        date = combinedData[0].date;
        getValues(combinedData);
    } else {
        duration = 16;
        sessionCount = 3;
        avgHB = 88;
        minHB = 67;
        maxHB = 109;
        main = 0;
        sessionCount = 3;
        duration = 16;
        date = "8.4.24";
    }

    function getValues(list) {
        minHB = list[0].min;
        let sum;
        for (const item in combinedData) {
            values.ccw += item.ccw;
            values.cw += item.cw;
            values.p += item.p;
            duration += item.duration;
            if(item.min < minHB) {
                minHB = item.min;
            }
            if (item.max > maxHB) {
                maxHB = item.max;
            }
            sum+=item.avg;
        }
        avgHB = sum / sessionCount;
        duration /= (3600 * 60);

        let largestValue = 0;
        for (let key in values) {
            if (values[key] > largestValue) {
                largestValue = values[key];
                main = key;
            }
        }
    }

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function handleUploadClick() {
        onDisconnectDevice();
        onSetNewDataAvailable(false);
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            let signer = null;
            let provider;
            if (window.ethereum == null) {
                console.log("MetaMask not installed; using read-only defaults");
                provider = ethers.getDefaultProvider();
            } else {
                provider = new ethers.BrowserProvider(window.ethereum);
                signer = await provider.getSigner();
            }
            console.log("Connected account:", await signer.getAddress());
            const contract = new ethers.Contract(smartFidgetAddress, SmartFidget.abi, signer);
            const transaction = await contract.addRecord(avgHB, minHB, maxHB, main, sessionCount, duration, date);
            setIsLoading(true);
            await transaction.wait();
            setIsLoading(false);
            await readData();
        }
        // navigate('/myrecords');
    };
    
    return(
        <div className="w-full border">
            <Summary len={sessionCount}
                date={date}
                avg={avgHB}
                max={maxHB}
                min={minHB}
                duration={duration} />
            <div>
                {
                    data && combinedData.map((session, index) => {
                        return(
                            <Session session={session} tot={sessionCount} key={index} />
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
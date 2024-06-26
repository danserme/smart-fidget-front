import { ethers } from "ethers";
import SmartFidget from "../contracts/SmartFidget.sol/SmartFidget.json";
const smartFidgetAddress = "0x810380b8f11537bf5A9267Ed130F3988dCe51923";

export default async function readData() {
    if (typeof window.ethereum !== "undefined") {
        let provider;
        if (window.ethereum == null) {
            console.log("MetaMask not installed; using read-only defaults");
            provider = ethers.getDefaultProvider();
        } else {
            provider = new ethers.BrowserProvider(window.ethereum);
        }
        const contract = new ethers.Contract(smartFidgetAddress, SmartFidget.abi, provider);
        try {
            const countReq = await contract.getRecordsCount();
            const count = Number(countReq);
            const promises = [];
            for (let i = 0; i < count; i++) {
                const promise = contract.getRecord(i).then(result => {
                    return {
                        writer: result[0],
                        avg: Number(result[1]),
                        min: Number(result[2]),
                        max: Number(result[3]),
                        main: Number(result[4]),
                        sessionCount: Number(result[5]),
                        totDuration: Number(result[6]),
                        date: result[7]
                    };
                });
                promises.push(promise);
            }
            const data = await Promise.all(promises); // Wait for all promises to resolve
            return data;
        } catch (err) {
            console.log("Error: ", err);
            alert(
                "Switch your MetaMask network to Polygon zkEVM Testnet and refresh this page!"
            );
        }
    }
}
import React from "react";
import GhostButtonSmall from '../ui/buttons/GhostButtonSmall'

export default function SharedAccessItem({ fullname = "John Doe", role = "doctor", last = "02/01/24" }) {
    return (
        <div className="border-b flex w-full px-5 py-3 justify-between my-5">
            <div>
                <div className="flex gap-5">
                    <h5 className="text-lg font-bold">{fullname}</h5>
                    <p className="italic text-xs text-gray-600 self-center">{last}</p>
                </div>
                <p>{role}</p>
            </div>
            <div className="self-center">
                <GhostButtonSmall text={"view details"} />
            </div>
        </div>
    );
}
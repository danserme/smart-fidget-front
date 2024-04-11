import React from "react";
import Bell from "../ui/icons/Bell";
import Battery from "../ui/icons/Battery";

export default function AboutDevice() {
    return(
        <div className="w-2/5 border h-fit">
            <div className="p-5">
                <h1 className="text-lg font-semibold">My Device</h1>
                <p className="text-xs text-gray-500">last used on 24.04.2024</p>
            </div>
            <div className="p-5 pt-0 text-sm">
                <div className="flex gap-2 pb-2"><Battery /><p className="self-center">50%</p></div>
                <div className="flex gap-2"><Bell /><p className="self-center">New data available</p></div>
            </div>
        </div>
    );
}
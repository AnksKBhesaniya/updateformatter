"use client";
import { useState } from "react";
import { colorList, findClosestColor } from "../utils/colorMatcher";

export default function ColorChecker() {
  const [inputColor, setInputColor] = useState("#ff0000");
  const closestColor = findClosestColor(inputColor, colorList);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Color Checker</h2>
      <input
        type="text"
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
        className="mt-4 border p-2 w-60"
        placeholder="Enter color (HEX/RGB)"
      />
      <div className="mt-4 flex justify-center gap-4">
        <div className="w-20 h-20" style={{ backgroundColor: inputColor, border: "1px solid #000" }}></div>
        <div className="w-20 h-20" style={{ backgroundColor: closestColor?.value, border: "1px solid #000" }}></div>
      </div>
      <p className="mt-2">Closest Color: <strong>{closestColor?.name || "N/A"}</strong></p>
      <p className="mt-2">Closest Color: <strong>{closestColor?.value || "N/A"}</strong></p>
    </div>
  );
}


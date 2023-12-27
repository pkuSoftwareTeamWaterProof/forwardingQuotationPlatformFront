'use client'
import { useState } from "react";
import { SelectField } from "./Fields";

export function EvalForm({ evalInfo, setEvalInfo }: { evalInfo:{score:1|2|3|4|5, comment:string}, setEvalInfo: Function }) {
    const [score, setScore] = useState(5)
    const [comment, setComment] = useState("")
    return <div>
        <select value={score} onChange={(e) => {
            e.preventDefault();
            setScore(parseInt(e.target.value))
            setEvalInfo({
                ...evalInfo,
                score:parseInt(e.target.value)
            })
        }}>
            <option selected>5</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>
        <input value={comment} onChange={(e) => {
            e.preventDefault(); 
            setComment(e.target.value);
            setEvalInfo({
                ...evalInfo,
                comment:e.target.value
            });
        }}></input>
    </div>
    //return <input value={price} onChange={(e) => {e.preventDefault(); setPrice(e.target.value as unknown as number); setCurPrice(price)}}></input>
}
'use client'
import { useState } from "react";

export function AnswerForm({ setCurPrice }: { setCurPrice: Function }) {
    const [price, setPrice] = useState(0)
    return <input value={price} onChange={(e) => {e.preventDefault(); setPrice(e.target.value as unknown as number); setCurPrice(price)}}></input>
}
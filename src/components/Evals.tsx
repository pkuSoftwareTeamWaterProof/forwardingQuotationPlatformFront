'use client'
import {apiURL, apiPath} from "@/config"
import { getCookie } from "cookies-next"
import { useState, useEffect } from "react"
import { EvalLabel } from "./EvalLabel"

export function Evals(){
  const [avg, setAvg] = useState({score:NaN})
  const [evals, setEvals]:[any[], Function] = useState([])
  useEffect(() => {
    fetch(apiURL + apiPath + '/evaluation/forwarder_score/' + getCookie('id'), {
      method: "GET",
      mode: "cors",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
      .then(data => setAvg(data));
  }, [])
  useEffect(() => {
    fetch(apiURL + apiPath + '/evaluation/forwarder/' + getCookie('id'), {
      method: "GET",
      mode: "cors",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
      .then(data => setEvals(data));
  }, [])

  return <>
    <h2 className="mt-0 text-lg font-semibold text-gray-900">{"评分："+String(avg.score === null?NaN:avg.score)}</h2>
    <div>
      {evals.map(entry => <EvalLabel comment={entry.comment} score={entry.score} key={entry.id}/>)}
    </div>
  </>
}
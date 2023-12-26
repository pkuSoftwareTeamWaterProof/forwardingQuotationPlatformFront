'use client'
import {apiURL, apiPath} from "@/config"
import { getCookie } from "cookies-next"
import { useState, useEffect } from "react"

export function Evals(){
  const [avg, setAvg] = useState({score:NaN})
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

  return <h2 className="mt-0 text-lg font-semibold text-gray-900">{"评分："+String(avg.score === null?NaN:avg.score)}</h2>
}
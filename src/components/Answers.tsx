'use client'
import { answer, apiURL, sheet } from "@/config"
import { getCookie, getCookies } from "cookies-next"
import { useEffect, useState } from "react"
import { Princess_Sofia } from "next/font/google"

export function Answers() {
  const [answers, setAnswers] = useState([])
  const [sheets, setSheets]: [sheet[], Function] = useState([])
  useEffect(() => {
      fetch(apiURL + '/api/answer/list/' + getCookie('id'), {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(data => setAnswers(data))
  }, [])

  useEffect(() => {(async () => {
    const newSheets: sheet[] = []
    for (const answer of answers) {
        await fetch(apiURL + '/api/sheet/' + answer['sheetID'], {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
        }).then(res => res.json())
          .then(data => newSheets.push(data))
    }
    setSheets(newSheets)
  })()}, [answers])
  
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">起点</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">终点</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">运输方式</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">类别</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">重量</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">体积</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">起始时间</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">终止时间</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">报价</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  Array.from(answers).map((answer: answer) => {
                    const sheet = sheets.filter(sheet => sheet.id === answer.sheetID)[0]
                    return( sheet &&
                      <tr key={answer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.startpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.endpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.type_of_shipping}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.species}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.startdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.enddate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{answer.price}</td>
                      </tr>
                    )}
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { answer, apiURL, order, sheet } from "@/config"
import { getCookie, getCookies } from "cookies-next"
import { useEffect, useState } from "react"

export function Orders({ type }: { type: "firm" | "customer"}) {
  const [orders, setOrders]: [order[], Function] = useState([])
  const [sheets, setSheets]: [sheet[], Function] = useState([])
  const [answers, setAnswers]: [answer[], Function] = useState([])
  useEffect(() => {
    if(type === 'customer') {
      fetch(apiURL + '/api/order/cusromerid/' + getCookie('id'), {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(data => setOrders(data))
    } else {
      fetch(apiURL + '/api/order/forwardid/' + getCookie('id'), {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(data => setOrders(data))
    }
    for (const order of orders) {
        fetch(apiURL + '/api/sheet/' + order['sheetId'], {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
        }).then(res => res.json())
          .then(data => setSheets(sheets.push(data)))

        fetch(apiURL + '/api/answer/' + order['answerId'], {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
        }).then(res => res.json())
          .then(data => setAnswers(answers.push(data)))
    }
  }, [])
  
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
                  Array.from(orders).map((order: order) => {
                    const sheet: sheet = sheets.filter(sheet => sheet.id === order.sheetId)[0]
                    const answer: answer = answers.filter(answer => answer.id === order.answerId)[0]
                    console.log(order)
                    console.log(sheet)
                    console.log(answer)
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.startpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.endpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.type_of_shipping}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.species}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.startdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sheet.enddate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{answer.price}</td>
                      </tr>)
                    
                    }
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
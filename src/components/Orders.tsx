'use client'
import { answer, apiPath, apiURL, order, sheet } from "@/config"
import { getCookie, getCookies } from "cookies-next"
import { useEffect, useState } from "react"
import { EvalForm } from "./EvalForm"

export function Orders({ type }: { type: "firm" | "customer"}) {
  const [orders, setOrders]: [order[], Function] = useState([])
  const [sheets, setSheets]: [sheet[], Function] = useState([])
  const [answers, setAnswers]: [answer[], Function] = useState([])
  const [evalInfo, setEvalInfo]:[{
    score : 1|2|3|4|5,
    comment : string
  },Function] = useState({
    score : 5,
    comment : ""
  })
  useEffect(() => {
    fetch(apiURL + '/api/order/' + (type === 'firm'? 'forwardid/': 'cusromerid/') + getCookie('id'), {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
    }).then(res => res.json())
      .then(data => setOrders(data))
  }, [])
    
  useEffect(() => {(async () => { 
    // console.log('orders changed!!!!!!!!!!!!')
    // console.log(orders)
    const newSheets: sheet[] = []
    const newAnswers: answer[] = []
    for (const order of orders) {
        // console.log(order)
        await fetch(apiURL + '/api/sheet/' + order['sheetId'], {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
        }).then(res => res.json())
          .then(data => newSheets.push(data))
        // console.log(sheets)

        await fetch(apiURL + '/api/answer/' + order['answerId'], {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
        }).then(res => res.json())
          .then(data => newAnswers.push(data))
        // console.log(answers)
    }
    setSheets(newSheets)
    setAnswers(newAnswers)
  })()}, [orders])
  // console.log(orders)
  // console.log(sheets)
  // console.log(answers)
  
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
                  {type === 'customer'?(<>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">评价</th>
                  </>):<></>}
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  Array.from(orders).map((order: order) => {
                    const sheet: sheet = sheets.filter(sheet => sheet.id === order.sheetId)[0]
                    const answer: answer = answers.filter(answer => answer.id === order.answerId)[0]
                    // console.log(order)
                    // console.log(sheet)
                    // console.log(answer)
                    return (sheet && answer &&
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
                        {type === 'customer'?(<>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          <EvalForm evalInfo={evalInfo} setEvalInfo={setEvalInfo}/>
                          <button 
                            type="button" 
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={(async (e) => {
                              e.preventDefault()
                              await fetch(apiURL + apiPath + '/evaluation/create',{
                                method:"POST",
                                mode:"cors",
                                headers:{
                                  "accept":"*/*",
                                  "Content-Type":"application/json"
                                },
                                body:JSON.stringify({
                                  ...evalInfo,
                                  orderId:order.id
                                })
                              })
                              alert("评价成功")
                            })}
                          >
                            提交
                          </button>
                        </td></>):<></>}
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
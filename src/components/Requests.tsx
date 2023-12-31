'use client'
import { answer, apiURL, sheet } from "@/config"
import { getCookie, getCookies } from "cookies-next"
import { useEffect, useState } from "react"
import { AnswerForm } from "./AnswerForm"
import { Princess_Sofia } from "next/font/google"

export function Requests({ type }: { type: "firm" | "customer"}) {
  const [requests, setRequests] = useState([])
  const [curPrice, setCurPrice] = useState(0)
  const [answers, setAnswers]: [answer[][], Function] = useState([])
  useEffect(() => {
    if(type === 'customer') {
      fetch(apiURL + '/api/sheet/list/' + getCookie('id'), {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(data => setRequests(data))
    } else {
      fetch(apiURL + '/api/sheet', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(data => setRequests(data))
    }
  }, [])

  useEffect(() => {(async () => {
    if(type === 'firm') return
    const newAnswers: answer[][] = []
    for (const request of requests) {
      await fetch(apiURL + '/api/answer/sheet/' + request['id'], {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(data => newAnswers.push(data))
    }
    setAnswers(newAnswers)
  })()}, [requests])
  
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
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">最低报价</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">操作</th>
                  {type === 'customer' && <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">操作</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  Array.from(requests).map((request: sheet) => {
                    //???这里功能不对吧???
                    //怎么感觉只有第一个报价
                    const answerList = answers.filter(answer => (answer[0]? (answer[0].sheetID === request.id): false))
                    const answer = answerList[0]
                    return (
                      <tr key={request.createdAt}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.startpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.endpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.type_of_shipping}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.species}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.startdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.enddate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{answer? answer.sort((a, b) => a.price - b.price)[0].price: 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          {type === 'firm' && <AnswerForm setCurPrice={setCurPrice} />}
                          <button 
                            type="button" 
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={type === 'customer'? (async (e) => {
                              e.preventDefault()
                              await fetch(apiURL + '/api/sheet/' + request.id, {
                                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                                mode: "cors", // no-cors, *cors, same-origin
                                headers: {
                                  "accept": "*/*",
                                  "Content-Type": "application/json",
                                }
                              })
                              setRequests(await fetch(apiURL + '/api/sheet/list/' + getCookie('id'), {
                                method: "GET", // *GET, POST, PUT, DELETE, etc.
                                mode: "cors", // no-cors, *cors, same-origin
                                headers: {
                                  "accept": "*/*",
                                  "Content-Type": "application/json",
                                },
                              }).then(res => res.json()))
                            }): (async (e) => {
                              e.preventDefault()
                              await fetch(apiURL + '/api/answer/create', {
                                method: "POST",
                                mode: "cors",
                                headers: {
                                  "accept": "*/*",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  "price": curPrice, 
                                  "remark": "", 
                                  "Sheetid": request.id,
                                  "forwarderID": getCookie('id')
                                })
                              })
                              alert("报价成功")
                            })}
                          >
                            {type==="firm"?"报价":"删除"}
                          </button>
                        </td>
                        { type === 'customer' && 
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button 
                          type="button" 
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={async (e) => {
                            if(answerList.length){
                              e.preventDefault()
                              await fetch(apiURL + '/api/order/create', {
                                method: "POST",
                                mode: "cors",
                                headers: {
                                  "accept": "*/*",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  "sheetid": request.id,
                                  "answerid": answer[0].id,
                                  "context": "成交"
                                })
                              })
                              alert("下单成功")
                            } else {
                              alert("暂无报价！")
                            }
                          }}
                        >
                          下单
                        </button>
                      </td>}
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
'use client'
import { apiURL, sheet } from "@/config"

export function Requests({ requests, setRequests }: { requests: sheet[], setRequests: Function}) {
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
                  <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  Array.from(requests).map((request: sheet) => (
                      <tr key={request.createdAt}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.startpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.endpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.type_of_shipping}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.species}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.startdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.enddate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
                        </td>
                      </tr>
                    )
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
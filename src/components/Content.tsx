'use client'
import { sheet } from "@/config"
import { useState } from "react"
import { DashboardHeader } from "./DashboardHeader"
import { DashboardSidebar } from "./DashboardSidebar"
import NewRequest from "./NewRequest"
import { Requests } from "./Requests"


function getContent(requests: sheet[], setRequests: Function, content: string) {
  if(content === 'newRequest') {
    return <NewRequest/>
  } else if(content === 'myRequests'){
    return <Requests requests={requests} setRequests={setRequests}/>
  } else {
    return <></>
  }
}

export function Content({ _requests }: { _requests: sheet[] }) {
    let [content, setContent] = useState('info')
    let [requests, setRequests] = useState(_requests)
    return (
      <>
        <DashboardHeader/>
        <DashboardSidebar setContent={setContent}/>
        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
          { getContent(requests, setRequests, content) }
        </div>
      </>
    )
  
}
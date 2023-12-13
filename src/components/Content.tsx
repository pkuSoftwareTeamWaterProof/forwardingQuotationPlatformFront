'use client'
import { useEffect, useState } from "react"
import { DashboardHeader } from "./DashboardHeader"
import { DashboardSidebar } from "./DashboardSidebar"
import NewRequest from "./NewRequest"
import { Requests } from "./Requests"
import { getCookie } from "cookies-next"
import { Info } from "./Info"
import { Orders } from "./Orders"


function getContent(content: string, setContent: Function, type: "firm" | "customer") {
  if(content === 'newRequest') {
    return <NewRequest setContent={setContent}/>
  } else if(content === 'requests') {
    return <Requests type={type}/>
  } else if(content === 'myAnswers') {
    return <></>
  } else if(content === "info") {
    return <Info />
  } else if(content === "orders") {
    return <Orders type={type} />
  } else {
    return <></>
  }
}

export function Content({ type }: { type: 'firm' | 'customer' }) {
    let [content, setContent] = useState('info')
    return (
      <>
        <DashboardHeader/>
        <DashboardSidebar setContent={setContent} type={type}/>
        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
          { getContent(content, setContent, type) }
        </div>
      </>
    )
  
}
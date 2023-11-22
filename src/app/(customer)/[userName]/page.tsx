'use client'
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useState } from "react";
import NewRequest from "@/components/NewRequest";

function getContent(content: string) {
  if(content === 'newRequest') {
    return <NewRequest/>
  } else {
    return <></>
  }
}

export default function CustomerDashboard({ params }: { params: { userName: string } }) {
  let [content, setContent] = useState('info')
  return (
      <>
        <DashboardHeader/>
        <DashboardSidebar setContent={setContent}/>
        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
          { getContent(content) }
        </div>
      </>
  )
}
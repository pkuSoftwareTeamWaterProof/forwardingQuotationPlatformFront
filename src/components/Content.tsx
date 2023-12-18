'use client'
import {useEffect, useState} from "react"
import {DashboardHeader} from "./DashboardHeader"
import {DashboardSidebar} from "./DashboardSidebar"
import {getCookie} from "cookies-next"
import {Info} from "./Info"
import {Requests} from "@/views/requests/Requests";
import {MyAnswers} from "@/views/myAnswers/MyAnswers";
import {Orders} from "@/views/Orders/Orders";


function getContent(content: string, setContent: Function, type: "firm" | "customer") {

    switch (content) {
        case 'newRequest': //新询价单

        case 'requests': //询价单,我的询价单
            return <Requests type={type}/>;
        case 'myAnswers': //报价单
            return <MyAnswers type={type}/>
        case 'info': //个人信息
            return <Info/>;
        case 'orders': //订单
            return <Orders type={type}/>;
        default:
            return <></>; // 默认情况下返回空片段
    }

}

export function Content({type}: { type: 'firm' | 'customer' }) {
    let [content, setContent] = useState('info')
    return (
        <>
            <DashboardHeader/>
            <DashboardSidebar setContent={setContent} type={type}/>
            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72" >
                {getContent(content, setContent, type)}
            </div>
        </>
    )

}

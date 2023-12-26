'use client'
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Evals } from "./Evals";

export function Info() {
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient ? (
        <>
        <h2 className="mt-0 text-lg font-semibold text-gray-900">
            {"用户名：" + getCookie('username')}
        </h2>
        <h2 className="mt-0 text-lg font-semibold text-gray-900">
            {"身份：" + (getCookie('role') == 'customer' ? '顾客': '货代')}
        </h2>
        <h2 className="mt-0 text-lg font-semibold text-gray-900">
            {"邮箱：" + getCookie('email')}
        </h2>
        <h2 className="mt-0 text-lg font-semibold text-gray-900">
            {"电话：" + getCookie('telephone')}
        </h2>
        {getCookie('role') == 'forwarder'?<Evals/>:<></>}
        </>
    ) : <></>
}
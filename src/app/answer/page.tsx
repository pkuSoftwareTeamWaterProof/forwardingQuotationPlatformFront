"use client"

import Link from 'next/link'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Layout } from '@/components/Layout'
import { type Metadata } from 'next'
import { useState } from 'react'
import { apiURL } from '@/config'

/*export const metadata: Metadata = {
  title: '报价',
}*/

export default function Request() {
    let [answerInfo, setAnswerInfo] = useState({
        price: "",
        remark:""       
    })
    return (
        <Layout>
            <div className="flex">
                { /* logo */}
            </div>
            <h2 className="mt-20 text-lg font-semibold text-gray-900">
                填写报价单
            </h2>
            <form
                action="#"
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
                onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch(apiURL + '/answer', {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        headers: {
                            "accept": "*/*",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(answerInfo), // body data type must match "Content-Type" header
                    })
                }}
            >
                <TextField
                    className="col-span-full"
                    label="价格"
                    name="source"
                    type="text"
                    value={answerInfo.price}
                    onChange={(e) => setAnswerInfo({
                        ...answerInfo,
                        price: e.target.value
                    })}
                    required
                />
                <TextField
                    className="col-span-full"
                    label="备注"
                    name="remark"
                    type="text"
                    value={answerInfo.remark}
                    onChange={(e) => setAnswerInfo({
                        ...answerInfo,
                        remark: e.target.value
                    })}
                    required
                />
                <div className="col-span-full">
                    <Button type="submit" variant="solid" color="blue" className="w-full">
                        <span>
                            提交 <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </form>
        </Layout>
    )
}
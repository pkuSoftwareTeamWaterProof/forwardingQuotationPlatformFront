"use client"
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { useState } from 'react'
import { apiURL } from '@/config'
import { register } from 'module'

/*export const metadata: Metadata = {
    title: '公司信息',
}*/

export default function firm_Register() {
    let [firmRegister, setFirmRegister] = useState({
        name: '',
        description: ''
    })
    return (
        <SlimLayout>
            <div className="flex">
            </div>
            <h2 className="mt-20 text-lg font-semibold text-gray-900">
                添加公司信息
            </h2>
            <p className="mt-2 text-sm text-gray-700">
                稍后填写？{' '}
                <Link
                    href=""
                    className="font-medium text-blue-600 hover:underline"
                >
                    跳过
                </Link>{' '}
            </p>
            <form
                action="#"
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
                onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch(apiURL + '/api/firm/create', {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        headers: {
                            "accept": "*/*",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(firmRegister), // body data type must match "Content-Type" header
                    })
                }}
            >
                <TextField
                    className="col-span-full"
                    label="公司名"
                    name="name"
                    type="name"
                    autoComplete="name"
                    value={firmRegister.name}
                    onChange={(e) => setFirmRegister({
                        ...firmRegister,
                        name: e.target.value
                    })}
                    required
                />
                <TextField
                    className="col-span-full"
                    label="描述"
                    name="description"
                    type="description"
                    autoComplete="description"
                    value={firmRegister.description}
                    onChange={(e) => setFirmRegister({
                        ...firmRegister,
                        description: e.target.value
                    })}
                    required
                />
                <div className="col-span-full">
                    <Button
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        <span>
                            完成 <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </form>
        </SlimLayout>
    )
}
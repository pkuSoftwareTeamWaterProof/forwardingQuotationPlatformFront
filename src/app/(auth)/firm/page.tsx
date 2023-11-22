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
        description: '',
        createdAt: '',
        updatedAt: ''
    })
    return (
        <SlimLayout>
            <div className="flex">
            </div>
            <h2 className="mt-20 text-lg font-semibold text-gray-900">
                Add Firm Information
            </h2>
            <p className="mt-2 text-sm text-gray-700">
                Fill it out later?{' '}
                <Link
                    href=""
                    className="font-medium text-blue-600 hover:underline"
                >
                    skip
                </Link>{' '}
            </p>
            <form
                action="#"
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
                onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch(apiURL + '/api/user/create', {
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
                    label="Firm name"
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
                    label="Description"
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
                <TextField
                    className="col-span-full"
                    label="CreateDate"
                    name="createdAt"
                    type="createdAt"
                    autoComplete="createdAt"
                    value={firmRegister.createdAt}
                    onChange={(e) => setFirmRegister({
                        ...firmRegister,
                        createdAt: e.target.value
                    })}
                    required
                />
                <TextField
                    className="col-span-full"
                    label="UpdateDate"
                    name="updatedAt"
                    type="updatedAt"
                    autoComplete="updatedAt"
                    value={firmRegister.updatedAt}
                    onChange={(e) => setFirmRegister({
                        ...firmRegister,
                        updatedAt: e.target.value
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
                            Finish <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </form>
        </SlimLayout>
    )
}
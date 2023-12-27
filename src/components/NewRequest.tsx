"use client"

import Link from 'next/link'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Layout } from '@/components/Layout'
import { type Metadata } from 'next'
import { useState } from 'react'
import { apiURL } from '@/config'
import { getCookie } from 'cookies-next'
import { AddressSelector } from './AddressSelector'

/*export const metadata: Metadata = {
  title: '询价',
}*/

export default function NewRequest({ setContent }: { setContent: Function }) {
  let [requestInfo, setRequestInfo] = useState({
    startpoint: "",
    endpoint: "",
    weight: "",
    size: "",
    species: "",
    type_of_shipping: "",
    remark: "",
    startdate: "",
    enddate: "",
    customerID: getCookie('id') as string
  })

  return (
    <>
      <h2 className="mt-0 text-lg font-semibold text-gray-900">
        填写询价单
      </h2>
      <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        onSubmit={async (e) => {
          e.preventDefault()
          await fetch(apiURL + '/api/sheet/create', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestInfo), // body data type must match "Content-Type" header
          })
          setContent('requests')
        }}
      >
        <AddressSelector requestInfo={requestInfo} setRequestInfo={setRequestInfo} start={true}/>
        <AddressSelector requestInfo={requestInfo} setRequestInfo={setRequestInfo} start={false}/>
        <SelectField
          label="运输方式"
          name="way"
          level={0}
          value={requestInfo.type_of_shipping}
          onChange={(e) => {setRequestInfo({
            ...requestInfo,
            type_of_shipping: e.target.value
          })}}
          required
        >
          <option selected>请选择</option>
          <option >空运</option>
          <option >海运</option>
        </SelectField>
        <TextField
          label="类别"
          name="type"
          level={0}
          type="text"
          value={requestInfo.species}
          onChange={(e) => setRequestInfo({
            ...requestInfo,
            species: e.target.value
          })}
          required
        />
        <TextField
          label="重量(t)"
          name="weight"
          level={0}
          type="text"
          value={requestInfo.weight}
          onChange={(e) => setRequestInfo({
            ...requestInfo,
            weight: e.target.value
          })}
          required
        />
        <TextField
          label="体积(m^3)"
          name="size"
          level={0}
          type="text"
          value={requestInfo.size}
          onChange={(e) => setRequestInfo({
            ...requestInfo,
            size: e.target.value
          })}
          required
        />
        <TextField
          label="起始时间"
          name="start"
          level={0}
          type="text"
          value={requestInfo.startdate}
          onChange={(e) => setRequestInfo({
            ...requestInfo,
            startdate: e.target.value
          })}
          required
        />
        <TextField
          label="终止时间"
          name="end"
          level={0}
          type="text"
          value={requestInfo.enddate}
          onChange={(e) => setRequestInfo({
            ...requestInfo,
            enddate: e.target.value
          })}
          required
        />
        <TextField
          className="col-span-full"
          label="备注"
          level={0}
          name="remark"
          type="text"
          value={requestInfo.remark}
          onChange={(e) => setRequestInfo({
            ...requestInfo,
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
    </>
  )
}
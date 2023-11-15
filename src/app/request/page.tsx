import Link from 'next/link'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Layout } from '@/components/Layout'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: '询价',
}

export default function Request() {
  return (
    <Layout>
      <div className="flex">
        { /* logo */ }
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        填写询价单
      </h2>
      <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          className="col-span-full"
          label="起点"
          name="source"
          type="text"
          required
        />
        <TextField
          className="col-span-full"
          label="终点"
          name="destiantion"
          type="text"
          required
        />
        <TextField
          label="运输方式"
          name="way"
          type="text"
          required
        />
        <TextField
          label="类别"
          name="type"
          type="text"
          required
        />
        <TextField
          label="重量"
          name="weight"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="体积"
          name="size"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="起始时间"
          name="start"
          type="text"
          required
        />
        <TextField
          label="终止时间"
          name="end"
          type="text"
          required
        />
        <TextField
          className="col-span-full"
          label="备注"
          name="remark"
          type="text"
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
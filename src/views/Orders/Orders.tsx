import {content} from "@/utils/style";
import {Table} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {apiURL, order} from "@/config";
import {formatTime} from "@/utils";
import {getCookie} from "cookies-next";

export function Orders({type}: { type: 'firm' | 'customer' }) {

    const [data, setData] = useState<any>() // 表格
    const columns: ColumnsType<order> = [
        {
            title: '询价单',
            dataIndex: 'sheetId',
            key: 'sheetId',
        },
        {
            title: '报价单',
            dataIndex: 'answerId',
            key: 'answerId',
        },
        {
            title: '内容',
            dataIndex: 'context',
            key: 'context',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                formatTime(record.createdAt)
            ),
        },
        {
            title: '修改时间',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (_, record) => (
                formatTime(record.updateAt)
            ),
        },
    ]// 数据

    function getList() {
        const ID = getCookie('id')
        let url = ''
        if (type === 'firm') {
            url = `/api/order/forwardid/${ID}`
        } else {
            url = `/api/order/cusromerid/${ID}`
        }
        fetch(apiURL + url, {
            method: 'GET',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        }).then((res: any) => res.json()).then((res: any) => {
            console.log(res)
            //剔除[null,null,{}]的null
            const dataList = res.filter((item: any) => {
               if (item!==null){
                   return item
               }
            })
            setData(dataList)
        })
    }

    useEffect(() => {
        getList()
    }, [])



    return (
        <div style={content}>

            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record: any) => record.id}
            />
        </div>
    );
}

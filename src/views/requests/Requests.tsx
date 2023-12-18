import {ColumnsType} from "antd/es/table";
import {Button, message, Modal, Space, Table, Tag} from "antd";
import {button, content} from "@/utils/style";
import {apiURL, sheet} from "@/config";
import {getCookie} from "cookies-next";
import {useState} from "react";
import {AddEdit} from "@/views/requests/AddEdit";


// interface FieldType {
//     id?: string; // id
//     startpoint?: string; // 出发地
//     endpoint?: string; // 目的地
//     weight?: number; // 重量
//     size?: number; // 体积
//     species?: string; // 货物种类
//     type_of_shipping?: string; // 运输方式
//     remark?: string; // 备注
//     startdate?: string; // 出发日期
//     enddate?: string; // 到达日期
//     customerID?: string; // 货主ID
// }


async function getList(type: 'firm' | 'customer', customerID?: string) {


    if (type === 'firm') {
        const res1 = fetch(apiURL + `/api/sheet`, {
            method: 'GET',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        })
        return res1.then((res: any) => res.json())
    } else {
        const res = await fetch(apiURL + `/api/sheet/list/${customerID}`, {
            method: 'GET',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        })
        return res.json().then((res: any) => res)
    }
}

export function Requests({type}: { type: 'firm' | 'customer' }) {
    const [data, setData] = useState<sheet[]>() // 表格数据
    const [loading, setLoading] = useState(false); // 是否加载完成
    const [isModalOpen, setIsModalOpen] = useState(false); // 是否打开模态框
    const [pid, setPid] = useState(''); // 询价单id

    // 获取数据
    if (!loading) {
        getList(type, getCookie('id')).then(r => {
            setData(r)
            setLoading(true)
        })
    }

    // 表格列
    const columns: ColumnsType<sheet> = [
        {
            title: '出发地',
            dataIndex: 'startpoint',
            key: 'startpoint',
        },
        {
            title: '目的地',
            dataIndex: 'endpoint',
            key: 'endpoint',
        },
        {
            title: '重量',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: '体积',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: '货物种类',
            dataIndex: 'species',
            key: 'species',
        },
        {
            title: '运输方式',
            dataIndex: 'type_of_shipping',
            key: 'type_of_shipping',
        },
        {
            title: '出发日期',
            dataIndex: 'startdate',
            key: 'startdate',
        },
        {
            title: '到达日期',
            dataIndex: 'enddate',
            key: 'enddate',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => edit(record.id)}>编辑</a>
                    <a onClick={() => del(record.id)}>删除</a>
                </Space>
            ),
        },
    ];

    // 模态框打开关闭
    function ModalOpenClick(e: any) {
        setIsModalOpen(e)
        getList(type, getCookie('id')).then(r => {
            setData(r)
        })
    }

    // 新增
    function add() {
        setIsModalOpen(true)
        setPid('')
    }

    // 编辑
    function edit(id: string) {
        setIsModalOpen(true)
        setPid(id)
    }

    function del(id: string | undefined) {
        Modal.confirm({
            title: '确认删除吗？',
            content: '删除后无法恢复',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                fetch(apiURL + `/api/sheet/${id}`, {
                    method: 'DELETE',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                }).then((res: any) => {
                    if (res.status === 200) {
                        message.info('删除成功').then(() => {
                            getList('customer', getCookie('id')).then(r => {
                                setData(r)
                            })
                        })

                    } else {
                        message.info('删除失败')
                    }
                })
            },
        })

    }

    // 删除操作
    if (type === 'firm') {
        delete columns[columns.length - 1]

    }

    return (
        // @ts-ignore
        <div style={content}>
            {type === 'firm' ? <h1>询价单</h1> : <h1>我的询价单</h1>}
            {type === 'firm' ? <></> :
                <Button type='primary' style={button} className='button' onClick={add}>新增</Button>}

            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record: any) => record.id}
            />
            {isModalOpen ? <AddEdit isModalOpen={isModalOpen} setIsModalOpen={ModalOpenClick} pid={pid}/> : <></>}

        </div>
    );
}

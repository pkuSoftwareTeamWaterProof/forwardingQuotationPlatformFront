import {button, content, display, width} from "@/utils/style";
import {Button, Form, message, Modal, Select, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {answer, apiURL, sheet} from "@/config";
import {ColumnsType} from "antd/es/table";
import {AddEdit} from "@/views/myAnswers/AddEdit";
import {formatTime, isExistInArray} from "@/utils";
import {getCookie} from "cookies-next";


export function MyAnswers({type}: { type: 'firm' | 'customer' }) {
    const [data, setData] = useState<sheet[]>() // 表格数据
    const [isModalOpen, setIsModalOpen] = useState(false); // 是否打开模态框
    const [pid, setPid] = useState(''); // id
    const [options, setOptions] = useState([]) // 询价单选项
    const [sheetId, setSheetId] = useState('') // 询价单id
    const columns: ColumnsType<answer> = [
        {
            title: '金额',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '起点和终点',
            dataIndex: 'sheetID',
            key: 'sheetID',
            render: (_, record) => (
                isExistInArray(options, record.sheetID)
            ),
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
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

    ]

    useEffect(() => {
        fetch(apiURL + `/api/sheet`, {
            method: 'GET',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        }).then((res: any) => res.json()).then((res: any) => {
            setOptions(res.map((item: sheet) => {
                return {
                    label: item.startpoint + '-到-' + item.endpoint,
                    value: item.id
                }
            }))

        })

        if (type === 'customer') {
            const id = getCookie('id')
            fetch(apiURL + `/api/answer/list/${id}`, {
                method: 'GET',
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "*/*",
                },
            }).then((res: any) => res.json()).then((res: any) => {
                setData(res)
            })

        }

    }, [])


    if (type === 'customer') {
        delete columns[columns.length - 1]
        columns.push({
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => indent(record)}>发起订单</a>
                </Space>
            ),
        },)
    }

    function indent(data: any) {
        Modal.confirm({
            title: '确认发起订单吗？',
            content: '发起后无法恢复',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                fetch(apiURL + `/api/order/create`, {
                    method: 'post',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                    body: JSON.stringify({
                        sheetid: data.sheetID,
                        answerid: data.id,
                        context: '成交',
                    })
                }).then((res: any) => {
                    if (res.status === 201) {
                        message.info('发起成功')
                    } else {
                        message.info('发起失败')
                    }
                })
            },
        })
    }


    function getList(id?: string) {
        fetch(apiURL + `/api/answer/sheet/${id}`, {
            method: 'GET',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        }).then((res: any) => res.json()).then((res: any) => {
            if (res.length === 0) return false
            setData(res)
        })
    }


    function add() {
        setPid('')
        setIsModalOpen(true)
    }

    function onChange(value: any) {
        getList(value)
        setSheetId(value)
    }

    function ModalOpenClick(e: any) {
        setIsModalOpen(e)
        if (sheetId === '') return false
        getList(sheetId)
    }

    function edit(id: any) {
        setPid(id)
        setIsModalOpen(true)
    }

    function del(id: any) {
        Modal.confirm({
            title: '确认删除吗？',
            content: '删除后无法恢复',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                fetch(apiURL + `/api/answer/${id}`, {
                    method: 'DELETE',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                }).then((res: any) => {
                    if (res.status === 200) {
                        message.info('删除成功',)
                        getList(sheetId)
                    } else {
                        message.info('删除失败')
                    }
                })
            },
        })
    }

    return (
        <div style={content}>
            {type === 'customer' ? <></> :
                <div style={display}>
                    <Form.Item label='询价单' name='pid' style={width}><Select
                        options={options}
                        onChange={onChange}
                    />
                    </Form.Item>
                    <Button type='primary' style={button} className='button' onClick={add}>新增</Button>
                </div>}


            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record: any) => record.id}
            />
            {isModalOpen ? <AddEdit isModalOpen={isModalOpen} setIsModalOpen={ModalOpenClick} pid={pid}/> : <></>}
        </div>
    );
}

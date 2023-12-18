import {Form, Modal, Input, Select, message} from 'antd';
import {answer, apiURL, sheet} from "@/config";
import {useEffect, useState} from "react";

export function AddEdit({isModalOpen, setIsModalOpen, pid}: {
    isModalOpen: boolean,
    setIsModalOpen: Function,
    pid: string
}) {

    const [form] = Form.useForm();
    const [options, setOptions] = useState([])
    const [userOptions, setUserOptions] = useState([])
    const [defaultValue, setDefaultValue] = useState('')


    function handleOk() {
        form.validateFields().then(() => {
            if (pid) {
                delete form.getFieldsValue(true).id
                fetch(apiURL + `/api/answer/${pid}`, {
                    method: 'put',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                    body: JSON.stringify(form.getFieldsValue(true))
                }).then((res: any) => {
                    if (res.status === 200) {
                        message.info('修改成功')
                        setIsModalOpen(false)
                    } else {
                        message.info('修改失败')
                    }
                })
            } else {
                fetch(apiURL + `/api/answer/create`, {
                    method: 'post',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                    body: JSON.stringify(form.getFieldsValue(true))
                }).then((res: any) => {
                    if (res.status === 200) {
                        message.info('新增成功')
                        setIsModalOpen(false)
                    } else {
                        message.info('新增失败')
                    }
                })
            }
        }).catch(() => message.warning('请填写完整信息'))
    }

    function handleCancel() {
        setIsModalOpen(false)
    }

    useEffect(() => {

        if (pid) {
            fetch(apiURL + `/api/answer/${pid}`, {
                method: 'get',
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "*/*",
                },
            }).then((res: any) => res.json()).then((res: any) => {
                form.setFieldsValue(res)
            })
        }


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

        fetch(apiURL + `/api/user/list`, {
            method: 'GET',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        }).then((res: any) => res.json()).then((res: any) => {
            setUserOptions(res.map((item: any) => {
                return {
                    label: item.username,
                    value: item.id
                }
            }))

        })


    }, [])


    return (
        <>
            <Modal title={pid ? '编辑报价单' : '新增报价单'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   cancelText='取消' okText='确定'>

                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                >
                    <Form.Item<answer>
                        label='金额'
                        name='price'
                        rules={[{required: true, message: '请输入金额'}]}
                    >
                        <Input/>
                    </Form.Item>
                    {pid ? <Form.Item<answer>
                        label='订单'
                        name='sheetID'
                        rules={[{required: true, message: '请输选择订单'}]}
                    >
                        <Select
                            options={options}
                        />
                    </Form.Item> : <Form.Item<answer>
                        label='订单'
                        name='Sheetid'
                        rules={[{required: true, message: '请输选择订单'}]}
                    >
                        <Select
                            options={options}
                        />
                    </Form.Item>}

                    <Form.Item<answer>
                        label='用户'
                        name='forwarderID'
                        rules={[{required: true, message: '请输选择订单'}]}
                    >
                        <Select
                            options={userOptions}
                        />
                    </Form.Item>
                    <Form.Item<answer>
                        label='备注'
                        name='remark'
                        rules={[{required: true, message: '请输入备注'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

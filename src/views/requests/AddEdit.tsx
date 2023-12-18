import {Form, Modal, Input, message, DatePicker} from 'antd';
import {apiURL, sheet} from "@/config";
import moment from 'moment';
import {getCookie} from "cookies-next";


export function AddEdit({isModalOpen, setIsModalOpen, pid}: {
    isModalOpen: boolean,
    setIsModalOpen: Function,
    pid: string
}) {

    const [form] = Form.useForm();

    if (pid) {
        fetch(apiURL + `/api/sheet/${pid}`, {
            method: 'get',
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
            },
        }).then((res: any) => res.json()).then((res: any) => {
            res.startdate = moment(res.startdate)
            res.enddate = moment(res.enddate)
            form.setFieldsValue(res)
        })
    }


    function handleOk() {
        form.validateFields().then(() => {
            //打印表单值
            const values = form.getFieldsValue(true)
            values.startdate = moment(values.startdate).format('YYYY-MM-DD')
            values.enddate = moment(values.enddate).format('YYYY-MM-DD')
            values.customerID = getCookie('id')
            delete values.id

            if (pid) {
                fetch(apiURL + `/api/sheet/${pid}`, {
                    method: 'put',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                    body: JSON.stringify(values)
                }).then((res: any) => {
                    if (res.status === 201) {
                        message.info('编辑成功').then(() => {
                            setIsModalOpen(false)
                        })
                    } else {
                        message.info('编辑失败')
                    }
                })
            } else {
                fetch(apiURL + `/api/sheet/create`, {
                    method: 'POST',
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "*/*",
                    },
                    body: JSON.stringify(values)
                }).then((res: any) => {
                    if (res.status === 201) {
                        message.info('新增成功').then(() => {
                            setIsModalOpen(false)
                        })
                    } else {
                        message.info('新增失败')
                    }
                })


                // console.log(moment(values.startdate).format('YYYY-MM-DD'))
            }
        }).catch(() => message.warning('请填写完整信息'))
    }

    function handleCancel() {
        setIsModalOpen(false)
    }

    //
    // form.setFieldsValue({
    //     startdate: moment('2015-01-01')
    // })



    return (
        <div>
            <Modal title={pid ? '编辑询价单(后端有bug)' : '新增询价单'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   cancelText='取消' okText='确定'>
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                >
                    <Form.Item<sheet>
                        label='出发地'
                        name='startpoint'
                        rules={[{required: true, message: '请输入出发地'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='目的地'
                        name='endpoint'
                        rules={[{required: true, message: '请输入目的地'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='重量'
                        name='weight'
                        rules={[{required: true, message: '请输入重量'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='体积'
                        name='size'
                        rules={[{required: true, message: '请输入体积'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='货物种类'
                        name='species'
                        rules={[{required: true, message: '请输入货物种类'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='运输方式'
                        name='type_of_shipping'
                        rules={[{required: true, message: '请输入运输方式'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='出发日期'
                        name='startdate'
                        rules={[{required: true, message: '请输入出发日期'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label='到达日期'
                        name='enddate'
                        rules={[{required: true, message: '请输入到达日期'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label='备注'
                        name='remark'
                        rules={[{required: true, message: '请输入备注'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

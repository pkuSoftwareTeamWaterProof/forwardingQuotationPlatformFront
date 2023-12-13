'use client'
import { useEffect, useState } from "react";
import { SelectField, TextField } from "./Fields";
import { request } from "@/config";

export function AddressSelector({ requestInfo, setRequestInfo, start }: { requestInfo: request ,setRequestInfo: Function, start: boolean }){
    const [address, setAddress] = useState({
        "country": "",
        "state": "",
        "city": "",
        "region": "",
        "remark": ""
    })
    const [curCountryList, setCurCountryList] = useState([])
    const [curStateList, setCurStateList] = useState([])
    const [curCityList, setCurCityList] = useState([])
    const [curRegionList, setCurRegionList] = useState([])
    // const [curLevel, setCurLevel] = useState(0)
    // const [curPrev, setCurPrev] = useState("")
    useEffect(() => {
        fetch('/api/getAddress', {
            method: "POST",
            mode: "no-cors",
            headers: {
                "accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({level: 0, prev: ""})
        }).then(res => res.json())
          .then(data => setCurCountryList(data))
    }, [])
    return (
        <>
        <h3 className="mt-0 text-base font-semibold text-gray-900">
          {start? "起点": "终点"}
        </h3>
        <div className="col-span-full grid grid-cols-4 gap-4">
            <SelectField
                // className="col-span-full"
                label="国家"
                name="country"
                level={1}
                value={address.country}
                onChange={async (e) => {
                    setAddress({
                        ...address,
                        country: e.target.value
                    })
                    setCurStateList(
                        await fetch('/api/getAddress', {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                "accept": "*/*",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({level: 1, prev: e.target.value})
                        }).then(res => res.json())
                    )
                }}
                required
            >
                <option selected>请选择</option>
                {curCountryList.map(addr => (
                    <option>{addr}</option>
                ))}
            </SelectField>
            <SelectField
                // className="col-span-full"
                label="州/省"
                name="state"
                level={1}
                value={address.state}
                onChange={async (e) => {
                    setAddress({
                        ...address,
                        state: e.target.value
                    })
                    setCurCityList(
                        await fetch('/api/getAddress', {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                "accept": "*/*",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({level: 2, prev: e.target.value})
                        }).then(res => res.json())
                    )
                }}
                required
            >
                <option selected>请选择</option>
                {curStateList.map(addr => (
                    <option>{addr}</option>
                ))}
            </SelectField>
            <SelectField
                // className="col-span-full"
                label="城市"
                name="city"
                level={1}
                value={address.city}
                onChange={async (e) => {
                    setAddress({
                        ...address,
                        city: e.target.value
                    })
                    setCurRegionList(
                        await fetch('/api/getAddress', {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                "accept": "*/*",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({level: 3, prev: e.target.value})
                        }).then(res => res.json())
                    )
                }}
                required
            >
                <option selected>请选择</option>
                {curCityList.map(addr => (
                    <option>{addr}</option>
                ))}
            </SelectField>
            <SelectField
                // className="col-span-full"
                label="区域"
                name="region"
                level={1}
                value={address.region}
                onChange={async (e) => {
                    setAddress({
                        ...address,
                        region: e.target.value
                    })
                }}
                required
            >
                <option selected>请选择</option>
                {curRegionList.map(addr => (
                    <option>{addr}</option>
                ))}
            </SelectField>
        </div>
        <div className="col-span-full">
            <TextField
                // className="col-span-full"
                label="详细地址"
                name="source"
                level={1}
                type="text"
                value={address.remark}
                onChange={(e) => {
                    setAddress({
                        ...address,
                        remark: e.target.value
                    })
                    if(start) {
                        setRequestInfo({
                            ...requestInfo,
                            startpoint: address.country + address.state + address.city + address.region + address.remark
                        })
                    } else {
                        setRequestInfo({
                            ...requestInfo,
                            endpoint: address.country + address.state + address.city + address.region + address.remark
                        })
                    }
                }}
                required
            />
        </div>
        </>
    )
}
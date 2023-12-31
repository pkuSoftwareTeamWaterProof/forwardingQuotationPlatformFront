export { apiURL,apiPath }

const apiURL = 'http://localhost:3001'
const apiPath = '/api'

export interface request {
    startpoint: string,
    endpoint: string,
    weight: string,
    size: string,
    species: string,
    type_of_shipping: string,
    remark: string,
    startdate: string,
    enddate: string,
    customerID: string
  }

export interface sheet {
    id: string,
    startpoint: string,
    endpoint: string,
    type_of_shipping: string,
    species: string,
    weight: string,
    size: string,
    startdate: string,
    enddate: string,
    remark: string,
    createdAt?: string,
    updatedAt?: string
}

export interface order {
    id: string,
    sheetId: string,
    answerId: string,
    context: string
}

export interface answer {
    id: string,
    remark: string,
    price: number,
    sheetID: string,
    createdAt: string,
    updatedAt: string,
    forwarderID: string
}

export type address = country | state | city | region;

export interface country {
    id: string,
    continent_id: string,
    code: string,
    name: string,
    full_name: string,
    cname: string,
    full_cname: string,
    lower_name: string,
    remark: string
}

export interface state {
    id: string,
    country_id: string,
    code: string,
    name: string,
    cname: string,
    lower_name: string,
    code_full: string,
    area_id: string
}

export interface city {
    id: string,
    state_id: string,
    code: string,
    name: string,
    cname: string,
    lower_name: string,
    code_full: string
}

export interface region {
    id: string,
    state_id: string,
    code: string,
    name: string,
    cname: string,
    lower_name: string,
    code_full: string
}

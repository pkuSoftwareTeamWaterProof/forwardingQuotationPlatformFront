export { apiURL }

const apiURL = 'http://localhost:3001'

export interface sheet {
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
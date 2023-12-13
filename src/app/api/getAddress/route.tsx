import { address } from "@/config"
import { promises as fs } from 'fs';

export async function POST(request: Request) {
    const level_list = ['countries', 'states', 'cities', 'regions']
    const level_list_ = ['country', 'state', 'city', 'region']
    const { level, prev } = await request.json()
    const prev_list = level > 0? JSON.parse(await fs.readFile(process.cwd() + '/src/addresses/' + level_list[level - 1] + '.json', 'utf8')): null
    const cur_list = JSON.parse(await fs.readFile(process.cwd() + '/src/addresses/' + level_list[level] + '.json', 'utf8'))
    const prev_id = level > 0? prev_list['RECORDS'].find((record: address) => record['cname'] === prev)['id']: null
    const res_list = prev_id? cur_list['RECORDS'].filter((record: address) => record[(level_list_[level - 1] + '_id') as keyof address] === prev_id)
                                                 .map((record: address) => record['cname']):
                              cur_list['RECORDS'].map((record: address) => record['cname'])
    return new Response(JSON.stringify(res_list))
}
import { Content } from "@/components/Content";
import { apiURL, sheet } from "@/config";

export default async function CustomerDashboard({ params }: { params: { userName: string } }) {
  let getRequests = async () => {
    let response = await fetch(apiURL + '/api/sheet', {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
        headers: {
        "accept": "*\/*",
      },
    })
    let requests = await response.json()
    return requests
  }
  let requests = await getRequests()
  return <Content _requests={requests} type="customer"/>
}
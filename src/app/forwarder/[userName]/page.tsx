import { Content } from "@/components/Content";
import { apiURL, sheet } from "@/config";

export default async function FirmDashboard({ params }: { params: { userName: string } }) {
  return <Content type={"firm"}/>
}
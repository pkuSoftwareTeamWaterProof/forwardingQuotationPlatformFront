import { Content } from "@/components/Content";

export default async function FirmDashboard({ params }: { params: { userName: string } }) {
  return <Content type={"firm"}/>
}
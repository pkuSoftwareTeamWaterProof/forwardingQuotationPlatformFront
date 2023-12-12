import { Content } from "@/components/Content";
import { apiURL, sheet } from "@/config";

export default async function CustomerDashboard({ params }: { params: { userName: string } }) {
  return <Content type="customer"/>
}
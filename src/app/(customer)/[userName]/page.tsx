import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import PrelineLoader from "@/components/PrelineLoader";

export default function CustomerDashboard({ params }: { params: { userName: string } }) {
    return (
        <>
          <DashboardHeader/>
          <DashboardSidebar/>
        </>
    )
}
import { LayoutDashboard } from "lucide-react";
import { useOrganization } from "../../../shared/context/OrganizationContext";
import EmptyState from "../../../shared/components/EmptyState";

export default function DashboardPage() {
    const { planColors } = useOrganization();

    return (
        <EmptyState
            title="Dashboard Overview"
            description="Track your metrics, monitor performance, and get insights about your business in real time."
            icon={<LayoutDashboard size={18} className="text-white" />}
            planColors={planColors}
            actionLabel="View analytics"
            onAction={() => console.log("analytics")}
        />
    );
}
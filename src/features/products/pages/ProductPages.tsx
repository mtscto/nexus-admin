import { Package } from "lucide-react";
import { useOrganization } from "../../../shared/context/OrganizationContext";
import EmptyState from "../../../shared/components/EmptyState";

export default function ProductsPage() {
    const { planColors } = useOrganization();

    return (
        <EmptyState
            title="Products Management"
            description="Create, manage and organize your products. This section will support plan-based limits and features."
            icon={<Package size={18} className="text-white" />}
            planColors={planColors}

            actionLabel="Create product"
            onAction={() => console.log("create product")}
        />
    );
}
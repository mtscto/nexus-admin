import { Users } from "lucide-react";
import { useOrganization } from "../../../shared/context/OrganizationContext";
import EmptyState from "../../../shared/components/EmptyState";

export default function TeamPage() {
    const { planColors } = useOrganization();

    return (
        <EmptyState
            title="Team Management"
            description="Manage members, roles and permissions across your organization."
            icon={<Users size={18} className="text-white" />}
            planColors={planColors}
            actionLabel="Invite member"
            onAction={() => console.log("invite")}
        />
    );
}
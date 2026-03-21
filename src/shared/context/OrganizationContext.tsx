import {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/context/AuthContext";
import { getPlanColors } from "../theme/planBranding";

/* Tipagem básica (já deixa profissional) */
interface Organization {
    id: string;
    name: string;
    plan: "free" | "pro" | "enterprise";
}

interface OrganizationContextType {
    activeOrganization: Organization | null;
    switchOrganization: (orgId: string) => void;
    planColors: ReturnType<typeof getPlanColors> | null;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();

    const [activeOrgId, setActiveOrgId] = useState<string | null>(
        user?.activeOrganizationId || null
    );

    /* Sync com login / reload */
    useEffect(() => {
        if (user?.activeOrganizationId) {
            setActiveOrgId(user.activeOrganizationId);
        }
    }, [user]);

    /* 🔥 Agora sem side effect externo */
    function switchOrganization(orgId: string) {
        setActiveOrgId(orgId);
    }

    const activeOrganization = useMemo(() => {
        return (
            user?.organizations.find((org) => org.id === activeOrgId) || null
        );
    }, [user, activeOrgId]);

    const planColors = useMemo(() => {
        return activeOrganization
            ? getPlanColors(activeOrganization.plan)
            : null;
    }, [activeOrganization]);

    return (
        <OrganizationContext.Provider
            value={{
                activeOrganization,
                switchOrganization,
                planColors,
            }}
        >
            {children}
        </OrganizationContext.Provider>
    );
}

export function useOrganization() {
    const context = useContext(OrganizationContext);

    if (!context) {
        throw new Error("useOrganization must be used within OrganizationProvider");
    }

    return context;
}
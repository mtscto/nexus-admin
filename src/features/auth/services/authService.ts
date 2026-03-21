export type Role = "admin" | "member" | "viewer";

export type Plan = "free" | "pro" | "enterprise";

export interface Organization {
    id: string;
    name: string;
    plan: Plan;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    organizations: Organization[];
    activeOrganizationId: string;
}

const STORAGE_KEY = "nexus_user";

function fakeDelay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authService = {
    async login(email: string, password: string): Promise<User> {
        await fakeDelay(800);

        const DEMO_EMAIL = "demo@nexusadmin.com";
        const DEMO_PASSWORD = "demo123";

        if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
            throw new Error("Login failed. Please check your credentials.");
        }

        const mockUser: User = {
            id: "1",
            name: "Demo User",
            email: DEMO_EMAIL,
            role: "admin",
            organizations: [
                {
                    id: "org-1",
                    name: "Nexus Free Co",
                    plan: "free",
                },
                {
                    id: "org-2",
                    name: "Nexus Enterprise Co",
                    plan: "enterprise",
                },
            ],
            activeOrganizationId: "org-1",
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));

        return mockUser;
    },

    logout() {
        localStorage.removeItem(STORAGE_KEY);
    },

    getCurrentUser(): User | null {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        return JSON.parse(stored);
    },

    switchOrganization(orgId: string): User | null {
        const user = this.getCurrentUser();
        if (!user) return null;

        user.activeOrganizationId = orgId;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

        return user;
    },
};
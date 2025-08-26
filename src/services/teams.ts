
export interface TeamMember {
    name: string;
    email: string;
    role: "Admin" | "Member" | "Owner";
    avatar: string;
}

const generateTeamMembers = (): TeamMember[] => {
    const members = [
      { name: "Alex Johnson", email: "alex.j@example.com", role: "Admin", avatar: `https://placehold.co/40x40.png` },
      { name: "Maria Garcia", email: "maria.g@example.com", role: "Member", avatar: `https://placehold.co/40x40.png` },
      { name: "David Smith", email: "d.smith@example.com", role: "Member", avatar: `https://placehold.co/40x40.png` },
      { name: "Sarah Lee", email: "sarah.lee@example.com", role: "Member", avatar: `https://placehold.co/40x40.png`},
      { name: "Tom Wilson", email: "tom.wilson@example.com", role: "Owner", avatar: `https://placehold.co/40x40.png` },
    ];
    return members.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Gets team members data.
 * In a real application, this would query a database.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateTeamMembers();
}

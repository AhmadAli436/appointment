
export interface Integration {
    name: string;
    logo: string;
    'data-ai-hint': string;
}

const generateCrmIntegrations = (): Integration[] => [
    { name: "Salesforce", logo: "https://placehold.co/40x40.png", "data-ai-hint": "salesforce logo" },
    { name: "HubSpot", logo: "https://placehold.co/40x40.png", "data-ai-hint": "hubspot logo" },
    { name: "Mailchimp", logo: "https://placehold.co/40x40.png", "data-ai-hint": "mailchimp logo" },
    { name: "Marketo", logo: "https://placehold.co/40x40.png", "data-ai-hint": "marketo logo" },
];

/**
 * Gets integrations data.
 * In a real application, this would query a database.
 */
export async function getIntegrations(): Promise<Integration[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateCrmIntegrations();
}


export interface Rule {
    field: string;
    condition: string;
    action: string;
}

export interface RoutingForm {
    title: string;
    active: boolean;
    rules: Rule[];
}

const generateForms = (): RoutingForm[] => [
  {
    title: "Sales Inquiry",
    active: true,
    rules: [
      { field: "Company Size", condition: "> 500", action: "Route to Enterprise Sales" },
      { field: "Interest", condition: "is 'Pricing'", action: "Route to Account Executives" },
    ],
  },
  {
    title: "Support Request",
    active: true,
    rules: [
       { field: "Topic", condition: "is 'Billing'", action: "Route to Support Tier 2" },
       { field: "Priority", condition: "is 'High'", action: "Route to On-call Engineer" },
    ],
  },
  {
    title: "Partnership Application",
    active: false,
    rules: [
       { field: "Type", condition: "is 'Integration'", action: "Route to Product Team" },
    ],
  },
];

/**
 * Gets routing forms data.
 * In a real application, this would query a database.
 */
export async function getRoutingForms(): Promise<RoutingForm[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateForms();
}

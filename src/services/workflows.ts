
export interface Workflow {
    title: string;
    description: string;
    steps: string[];
}

const generateWorkflows = (): Workflow[] => {
  const titles = [
    "New Meeting Reminder",
    "Post-Meeting Follow-up",
    "Feedback Request",
    "Send Agenda",
    "Confirm Video Link"
  ];
  const descriptions = [
    "Send an email reminder to attendees 24 hours before a meeting.",
    "Send a follow-up SMS with a survey link after a meeting concludes.",
    "Automatically ask for feedback one day after a user interview.",
    "Email the meeting agenda to all participants 1 hour prior.",
    "Send a calendar invite with the video conference link upon booking."
  ];
  const actions = [
      ["Trigger: New Meeting", "Action: Send Email"],
      ["Trigger: Meeting End", "Action: Send SMS"],
      ["Event: User Interview", "Delay: 1 Day", "Action: Send Email"],
      ["Trigger: Before Meeting", "Delay: 1 Hour", "Action: Send Email"],
      ["Trigger: New Booking", "Action: Send Calendar Invite"]
  ];

  return titles.map((title, index) => ({
    title: title,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    steps: actions[index] || actions[0],
  })).sort(() => Math.random() - 0.5).slice(0, 3);
};

/**
 * Gets workflows data.
 * In a real application, this would query a database.
 */
export async function getWorkflows(): Promise<Workflow[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateWorkflows();
}

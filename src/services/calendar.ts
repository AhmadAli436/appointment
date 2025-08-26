// A mock calendar service to simulate checking user availability.

// Mock data representing existing appointments for different users.
const MOCK_CALENDARS: Record<string, { start: Date; end: Date }[]> = {
  'alice': [
    { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(10, 30, 0, 0)) },
    { start: new Date(new Date().setHours(14, 0, 0, 0)), end: new Date(new Date().setHours(15, 0, 0, 0)) },
  ],
  'bob': [
    { start: new Date(new Date().setHours(9, 0, 0, 0)), end: new Date(new Date().setHours(9, 30, 0, 0)) },
    { start: new Date(new Date().setHours(11, 0, 0, 0)), end: new Date(new Date().setHours(12, 0, 0, 0)) },
  ],
  'charlie@example.com': [
    { start: new Date(new Date().setHours(13, 0, 0, 0)), end: new Date(new Date().setHours(13, 30, 0, 0)) },
  ],
  'user@example.com': [
    { start: new Date(new Date().setHours(16, 0, 0, 0)), end: new Date(new Date().setHours(17, 0, 0, 0)) },
  ],
   'admin@example.com': [], // Admin is always free
};

/**
 * Gets the availability for a list of participants.
 * In a real application, this would query a calendar API.
 * For this mock, it returns a list of busy time slots from MOCK_CALENDARS.
 */
export async function getAvailability(participants: string[]): Promise<{ busy: { start: string; end: string }[] }> {
  const busySlots: { start: string; end: string }[] = [];

  participants.forEach(participant => {
    const p = participant.toLowerCase().trim();
    if (MOCK_CALENDARS[p]) {
      MOCK_CALENDARS[p].forEach(event => {
        busySlots.push({ start: event.start.toISOString(), end: event.end.toISOString() });
      });
    }
  });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return { busy: busySlots };
}

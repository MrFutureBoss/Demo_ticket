// import type { Ticket } from "@/store/interfaces/ticket";

// const generateMockTickets = (count: number): Ticket[] => {
//   const tickets: Ticket[] = [];
//   const statuses = [1, 2, 3, 4, 5, 6]; // Completed, On Hold, In Progress, Reopen, Open, Unassigned
//   const teams = ["IT", "HR", "Finance", "Marketing", "Sales"];
//   const locations = ["Floor 1", "Floor 2", "Floor 3", "Remote", "Branch Office"];
//   const currentDate = new Date();

//   for (let i = 1; i <= count; i++) {
//     const date = new Date(currentDate);
//     date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days

//     const ticket: Ticket = {
//       id: i,
//       title: `Ticket ${i} - ${["System Error", "Hardware Issue", "Software Update", "Network Problem", "Access Request"][Math.floor(Math.random() * 5)]}`,
//       content: `This is a detailed description for ticket ${i}. It includes information about the issue and necessary steps to resolve it.`,
//       pc_id: Math.floor(Math.random() * 100) + 100,
//       employee_id_issue: Math.floor(Math.random() * 100) + 1,
//       skype: `user${i}@skype.com`,
//       teamview_id: Math.floor(Math.random() * 1000000),
//       teamview_password: Math.random().toString(36).substring(2, 8),
//       location: locations[Math.floor(Math.random() * locations.length)],
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       handle: Math.floor(Math.random() * 100) + 1,
//       coworker: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 1 : null,
//       user_id: Math.floor(Math.random() * 100) + 1,
//       date: date.toISOString(),
//       confirm: Math.random() > 0.5 ? "Yes" : "No",
//       action: ["Pending", "In Progress", "Completed"][Math.floor(Math.random() * 3)],
//       create_date: date.toISOString(),
//       type: ["Technical", "Administrative", "Support"][Math.floor(Math.random() * 3)],
//       pc_id_ldap: `PC${Math.floor(Math.random() * 1000)}`,
//       rating: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : null,
//       difficulty: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : null,
//       score_category: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
//       feedback: Math.random() > 0.5 ? `Feedback for ticket ${i}: Great service!` : null,
//       round: Math.floor(Math.random() * 3) + 1,
//       receive_date: date.toISOString(),
//       process_date: Math.random() > 0.3 ? new Date(date.getTime() + 86400000).toISOString() : null,
//       receive_time: Math.floor(Math.random() * 24),
//       process_time: Math.random() > 0.3 ? Math.floor(Math.random() * 24) : null,
//       month: date.toLocaleString('default', { month: 'long' }),
//       challenge: Math.random() > 0.5 ? `Challenge for ticket ${i}: Complex system integration` : null,
//       solution: Math.random() > 0.5 ? `Solution for ticket ${i}: Implemented new workflow` : null,
//       issuer: `User${Math.floor(Math.random() * 100) + 1}`,
//       employee_id: Math.floor(Math.random() * 100) + 1,
//       mission: `Mission ${i}: Improve system performance`,
//       team: teams[Math.floor(Math.random() * teams.length)],
//       email: `user${i}@company.com`,
//       gmail: `user${i}@gmail.com`
//     };
//     tickets.push(ticket);
//   }
//   return tickets;
// };

// export const dumpApi = {
//   getAllTickets: async (): Promise<Ticket[]> => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return generateMockTickets(50);
//   },

//   getTicketById: async (id: number): Promise<Ticket | undefined> => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     const tickets = generateMockTickets(50);
//     return tickets.find(ticket => ticket.id === id);
//   },

//   getTicketsByStatus: async (status: number): Promise<Ticket[]> => {
//     await new Promise(resolve => setTimeout(resolve, 800));
//     const tickets = generateMockTickets(50);
//     return tickets.filter(ticket => ticket.status === status);
//   },

//   getTicketsByTeam: async (team: string): Promise<Ticket[]> => {
//     await new Promise(resolve => setTimeout(resolve, 800));
//     const tickets = generateMockTickets(50);
//     return tickets.filter(ticket => ticket.team === team);
//   }
// }; 
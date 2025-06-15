export interface DataType {
  key: string;
  ticketId: string;
  status: number;
  title: string;
  assignee: string;
  reporter: string;
  description: string;
}

export const generateData = (): DataType[] => {
  const data: DataType[] = [];
  const statuses = [1, 2, 3, 4, 5, 6];
  const assignees = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"];
  const reporters = ["Alice Brown", "Bob Davis", "Carol Evans", "David Miller"];

  // Shuffle statuses array to ensure random distribution
  const shuffledStatuses = [...statuses].sort(() => Math.random() - 0.5);

  for (let i = 1; i <= 20; i++) {
    data.push({
      key: i.toString(),
      ticketId: `IT-TIC-${String(i).padStart(5, "0")}`,
      status: shuffledStatuses[i % statuses.length],
      title: `Ticket Title ${i}`,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      reporter: reporters[Math.floor(Math.random() * reporters.length)],
      description: `This is a sample ticket description ${i} with some additional details about the issue.`,
    });
  }
  return data;
};

export const columnOptions = [
  { label: 'Status', value: 'status' },
  { label: 'Title', value: 'title' },
  { label: 'Assignee', value: 'assignee' },
  { label: 'Reporter', value: 'reporter' },
  { label: 'Description', value: 'description' }
];

export const defaultCheckedList = ['status', 'title', 'assignee', 'reporter', 'description'];

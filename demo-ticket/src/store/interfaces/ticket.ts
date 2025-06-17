interface Ticket {
  id: number;
  title: string;
  content: string;
  pc_id: number | string;
  employee_id_issue: number | null;
  skype: string;
  teamview_id: number;
  teamview_password: string;
  location: string;
  status: number;
  handle: number;
  coworker: number | null;
  user_id: number;
  date: string;
  confirm: string;
  action: string;
  create_date: string;
  type: string | null;
  pc_id_ldap: string;
  rating: number | null;
  difficulty: number | null;
  score_category: string | null;
  feedback: string | null;
  round: number;
  receive_date: string;
  process_date: string | null;
  receive_time: number;
  process_time: number | null;
  month: string;
  challenge: string | null;
  solution: string | null;
  issuer: string | null;
  employee_id: number;
  mission: string;
  team: string;
  email: string;
  gmail: string;
}

interface PaginationState {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
}

interface PaginationParams {
  filter?: number;
  page?: number;
  page_size?: number;
  type?: "HR" | "IT";
}

interface PaginationResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface TicketResponse {
  tickets: Ticket[];
  pagination: PaginationResponse;
}

export type { Ticket, TicketState, PaginationState, PaginationParams, PaginationResponse, TicketResponse };

interface Employee {
  employee_id: number;
  username: string;
  fullname: string;
  team_id: number;
  email: string;
  gmail: string;
  mission: string;
  day: number;
  month: number;
  year: number;
  workday: number | null;
  active: string;
  office: string | null;
  work_shift: string;
  discord: string | null;
  discord_uid: string | null;
  status_team: string;
  team_work_shift: string;
  teamgroup: string;
  leaders: string;
  supervisor: string;
  project_manager: string | null;
}

interface EmployeeState {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean;
  error: string | null;
}

export type { Employee, EmployeeState };

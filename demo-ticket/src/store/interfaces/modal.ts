import { Ticket } from "./ticket";

export interface ModalProps {
  ticketDetail: Ticket;
  openTicketDetail: boolean;
  ticketDetailLoading: boolean;
}

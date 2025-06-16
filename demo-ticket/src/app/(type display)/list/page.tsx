import { Metadata } from "next";
import TicketTable from "@/components/table/TicketTable";

export const metadata: Metadata = {
  title: "All Tickets",
  description: "View and manage all tickets in the system. Filter, sort, and organize your tickets efficiently.",
  keywords: "tickets list, view tickets, manage tickets, ticket management, ticket tracking",
  openGraph: {
    title: "All Tickets | Ticket System",
    description: "View and manage all tickets in the system. Filter, sort, and organize your tickets efficiently.",
  },
  twitter: {
    title: "All Tickets | Ticket System",
    description: "View and manage all tickets in the system. Filter, sort, and organize your tickets efficiently.",
  }
};

export default function ListPage() {
  return <TicketTable />;
}

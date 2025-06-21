import useTickets from './useTickets';

export const useTicketsByStatus = (status: number) => {
  const { tickets, isLoading } = useTickets({ 
    status: status,
  });

  return {
    tickets,
    count: tickets.length,
    isLoading
  };
}; 
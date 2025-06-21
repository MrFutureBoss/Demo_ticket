import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import TicketDetailModal from './TicketDetailModal';
import OpenTicketDetailModal from './OpenTicketDetailModal';

export default function TicketModals() {
  const ticketDetailType = useSelector(
    (state: RootState) => state.modal.ticketDetailType
  );

  return (
    <>
      {ticketDetailType === 'open' ? (
        <OpenTicketDetailModal />
      ) : (
        <TicketDetailModal />
      )}
    </>
  );
} 
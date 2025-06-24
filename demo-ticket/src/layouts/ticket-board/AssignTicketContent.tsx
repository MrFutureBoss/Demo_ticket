import React from 'react'
import AssignTicketHeader from './AssignTicketHeader'
import AssignTicketBody from './AssignTicketBody'

export default function AssignTicketContent() {
  return (
    <div className="ticket-board-content">
      <AssignTicketHeader />
      <AssignTicketBody />
    </div>
  )
}

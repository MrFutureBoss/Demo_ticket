import React from 'react';
import { List, Empty } from 'antd';
import { useTicketsByStatus } from '@/hooks/useTicketsByStatus';
import readHTML from '@/utilities/convert/readHTML';
import showLessWord from '@/utilities/format/showLessWord';
import TextAvatar from '../avatars/TextAvatar';
import formatTimeToMinutesAgo from '@/utilities/format/formatDateToTimeAgo';
import { useDispatch } from 'react-redux';
import { setOpenTicketDetail, setTicketDetail, setTicketDetailType } from '@/store/reducers/modalReducer';
import { Ticket } from '@/hooks/interfaces/ticket';

interface ListOfTicketByStatusProps {
  status: number;
}

const getEmptyMessage = (status: number) => {
  if (status === 1) {
    return "Currently, there are no tickets in open. Please wait for new notification.";
  }
  return `Currently, there are no tickets found.`;
};

const CustomEmpty = ({ status }: { status: number }) => (
  <Empty
    className="empty-ticket-list"
    image="assets/images/ticket-not-found.png"
    description={
      <div className="empty-description">
        {getEmptyMessage(status)}
      </div>
    }
  />
);

export default function ListOfTicketByStatus({ status }: ListOfTicketByStatusProps) {
  const dispatch = useDispatch();
  const { tickets, isLoading } = useTicketsByStatus(status);

  const handleTicketClick = (ticket: Ticket) => {
    const ticketWithDate = {
      ...ticket,
      date: ticket.create_date
    };
    
    dispatch(setTicketDetail(ticketWithDate));

    dispatch(setTicketDetailType(ticket.status === 1 ? 'open' : 'regular'));
    
    dispatch(setOpenTicketDetail(true));
  };

  console.log('Filtered Ticket Items:', tickets);

  return (
    <div className="ticket-list-container">
      <List
        itemLayout="horizontal"
        dataSource={tickets}
        loading={isLoading}
        locale={{
          emptyText: <CustomEmpty status={status} />
        }}
        renderItem={(item) => {
          console.log('Rendering Item:', item);
          return (
            <List.Item 
              className="cursor-pointer"
              onClick={() => handleTicketClick(item)}
            >
              <List.Item.Meta
                title={
                  <div className="d-flex align-items-start flex-column justify-content-start gap-1"> 
                    <div className="d-flex align-items-center gap-1">
                      <TextAvatar employeeId={item.user_id} fullname={item.fullname} small={true} />
                      <span className="paragraph-normal-style">&nbsp;•&nbsp;</span>
                      <span className="time-bold-style">{formatTimeToMinutesAgo(item.create_date)}</span>
                    </div>
                    <span className="paragraph-bold-style">{item.title}</span>
                  </div>
                }
                description={
                  <div className="description-italic-style">
                    &quot;{readHTML(showLessWord(item.content, 70))}&quot;
                  <div className="d-flex justify-content-between">
                  </div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}

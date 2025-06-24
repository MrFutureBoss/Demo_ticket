import { Modal, Splitter, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setOpenTicketDetail } from "@/store/reducers/modalReducer";
import Status from "../icons/Status";
import PcTag from "../tags/PcTag";
import DateTag from "../tags/DateTag";
import TextAvatar from "../avatars/TextAvatar";
import readHTML from "@/utilities/convert/readHTML";
import { Ticket } from "@/store/interfaces/ticket";
import Image from "next/image";
import Icons from "../icons/Icons";

const modalHeader = (ticket: Ticket) => {
  return (
    <div className="ticket-detail-header">
      <div className="d-flex align-items-center">
        <Status status={ticket.status} /> &nbsp;{" "}
        <span className="separator">/</span>&nbsp; test
      </div>
      <p className="title">
        <Image
          src={
            ticket.type === "HR"
              ? `/assets/images/hrticket.svg`
              : `/assets/images/itticket.svg`
          }
          alt="logo"
          width={35}
          height={35}
          quality={50}
          className="image-square-rounded"
        />
        &nbsp; TIC-{ticket.type === "HR" ? "HR" : "IT"}-{ticket.id}
      </p>
    </div>
  );
};

const modalBody = (ticket: Ticket) => {
  return (
    <Splitter className="ticket-detail-content">
      <Splitter.Panel
        defaultSize="60%"
        min="40%"
        max="70%"
        className="ticket-detail-content-left"
      >
        <div className="ticket-detail-description">
          <p className="paragraph-bold-style-2">Content: </p>
          <div className="description-italic-style-2 d-flex flex-column gap-4">
            <span className="d-flex align-items-center justify-content-start">
              <Icons name="quote-left" />
            </span>
            {readHTML(ticket.content)}
            <span className="d-flex align-items-center justify-content-end">
              <Icons name="quote-right" />
            </span>
          </div>
          <div className="d-flex justify-content-start mt-4">
            <Button size="large" color="green" variant="solid" onClick={() => {}}>
              <Icons name="create" /> Assign this ticket
            </Button>
          </div>
        </div>
      </Splitter.Panel>
      <Splitter.Panel
        defaultSize="40%"
        min="30%"
        max="50%"
        collapsible
        className="ticket-detail-content-right"
      >
        <div className="container-fluid info-box">
          <p className="paragraph-bold-style-2"> Information:</p>
          <div className="row info-user-box">
            <div className="col-4 d-flex align-items-center">
              <p>👤 Reporter:</p>
            </div>
            <div className="col-8 d-flex align-items-start">
              {ticket.user_id ? (
                <TextAvatar
                  employeeId={ticket.user_id}
                  fullname={ticket.fullname}
                />
              ) : (
                <TextAvatar employeeId={null} fullname="Not found" />
              )}
            </div>
          </div>
          {ticket.type === "HR" ? (
            <></>
          ) : (
            <div className="row detail-box">
              <div className="col-4 d-flex align-items-center">
                <p>💻 PC ID:</p>
              </div>
              <div className="col-8 d-flex align-items-center justify-content-start">
                {ticket.pc_id ? (
                  <PcTag pc_id={Number(ticket.pc_id)} />
                ) : (
                  <p className="paragraph-normal-style">None</p>
                )}
              </div>
            </div>
          )}

          <div className="row detail-box">
            <div className="col-4 d-flex align-items-center">
              <p>📍 Location:</p>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-start">
              {ticket.location ? (
                <p className="paragraph-normal-style">{ticket.location}</p>
              ) : (
                <p className="paragraph-normal-style">None</p>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid info-box">
          <p className="paragraph-bold-style-2">Details:</p>
          <div className="row detail-box">
            <div className="col-4 d-flex align-items-center">
              <p>📅 Receive Date:</p>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-start">
              {ticket.receive_date ? (
                <DateTag date={ticket.receive_date} />
              ) : (
                <p className="paragraph-normal-style">None</p>
              )}
            </div>
          </div>
          <div className="row detail-box">
            <div className="col-4 d-flex align-items-center">
              <p>🎯 Mission:</p>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-start">
              {ticket.mission ? (
                <p className="paragraph-normal-style">{ticket.mission}</p>
              ) : (
                <p className="paragraph-normal-style">None</p>
              )}
            </div>
          </div>
          <div className="row detail-box">
            <div className="col-4 d-flex align-items-center">
              <p>📧 Email:</p>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-start">
              {ticket.email ? (
                <p className="paragraph-normal-style">{ticket.email}</p>
              ) : (
                <p className="paragraph-normal-style">None</p>
              )}
            </div>
          </div>
          <div className="row detail-box">
            <div className="col-4 d-flex align-items-center">
              <p>📩 Gmail:</p>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-start">
              {ticket.gmail ? (
                <p className="paragraph-normal-style">{ticket.gmail}</p>
              ) : (
                <p className="paragraph-normal-style">None</p>
              )}
            </div>
          </div>
        </div>
      </Splitter.Panel>
    </Splitter>
  );
};

export default function OpenTicketDetailModal() {
  const dispatch = useDispatch();
  const openTicketDetail = useSelector(
    (state: RootState) => state.modal.openTicketDetail
  );
  const ticketDetail = useSelector(
    (state: RootState) => state.modal.ticketDetail
  );
  const ticketDetailLoading = useSelector(
    (state: RootState) => state.modal.ticketDetailLoading
  );

  return (
    <Modal
      className="ticket-detail-modal"
      title={modalHeader(ticketDetail)}
      centered
      open={openTicketDetail}
      onOk={() => dispatch(setOpenTicketDetail(false))}
      onCancel={() => dispatch(setOpenTicketDetail(false))}
      loading={ticketDetailLoading}
      footer={null}
      zIndex={1100}
    >
      {modalBody(ticketDetail)}
    </Modal>
  );
}

import React from "react";
import Icons from "../../components/icons/Icons";
import { Button } from "antd";
import SearchPopOver from "@/components/pop-overs/SearchPopOver";
import logo from "../../assets/images/jira-logo.jpg";
import Image from "next/image";
export default function Header() {
  return (
    <div className="container-fluid">
      <div className="row header-container align-items-center">
        <div className="col-4 col-lg-2 header-left">
          <div className="d-none d-lg-flex">
            <div className="header-icon">
              <Icons name="expand" />
            </div>
            <div className="header-icon">
              <Icons name="apps" />
            </div>
            <div className="header-logo">
              <Image
                src={logo}
                width={24}
                height={24}
                alt="Mai Tu copycat logo"
              />
              <p>Jira</p>
            </div>
          </div>
          <div className="d-flex d-lg-none">
            <div className="header-icon">
              <Icons name="expand" />
            </div>
            <div className="header-icon">
              <Icons name="apps" />
            </div>
            <Button className="btn btn-light header-search-button">
              <Icons name="search" />
            </Button>
          </div>
        </div>

        <div className="col-4 col-lg-7 header-center">
          <div className="d-none d-lg-flex align-items-center w-100 gap-2">
            <div className="header-search-icon">
              <Icons name="search" />
            </div>
            <SearchPopOver />
            <button className="header-create-ticket" type="button">
              <Icons name="create" />
              Create
            </button>
          </div>
        </div>

        <div className="col-4 col-lg-3 header-right">
          <div className="d-none d-lg-flex align-items-center">
            <div className="header-icon">
              <Icons name="notifications" />
            </div>
            <div className="header-icon">
              <Icons name="question" />
            </div>
            <div className="header-icon">
              <Icons name="settings" />
            </div>
            <div className="header-avatar">
              <p>NM</p>
            </div>
          </div>
          <div className="d-flex d-lg-none w-100 justify-content-center">
            <button className="header-create-ticket" type="button">
              <Icons name="create" />
              Create
            </button>
            <div className="header-icon">
              <Icons name="notifications" />
            </div>
            <div className="header-icon">
              <Icons name="question" />
            </div>
            <div className="header-icon">
              <Icons name="settings" />
            </div>
            <div className="header-avatar">
              <p>NM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

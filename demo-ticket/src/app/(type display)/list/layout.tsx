import React from "react";


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">{children}</div>
      </div>
    </div>
  );
};

export default layout;

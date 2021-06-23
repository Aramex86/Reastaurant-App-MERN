import React, { FC } from "react";

interface PropsType {
  mesg: string;
  type: string;
}

const SnackBarSucces: FC<PropsType> = ({ mesg, type }) => {
  if (type === "error")
    return <div className="snackbar snackbar--error ">{mesg}</div>;

  return <div className="snackbar snackbar--success ">{mesg}</div>;
};

export default SnackBarSucces;

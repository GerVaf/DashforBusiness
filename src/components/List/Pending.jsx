import React, { useEffect, useState } from "react";
import { get } from "../../Global/api";
import ListTable from "../Table/ListTable";

const Pending = () => {

  return (
    <div>
      <ListTable parent={1} />
    </div>
  );
};

export default Pending;

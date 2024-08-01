import React from "react";

const reservationDate = () => {
  return (
    <div>
      <input type="time" min="09:00" max="23:00" /> ~{" "}
      <input type="time" min="09:00" max="23:00" />

    </div>
  );
};

export default reservationDate;

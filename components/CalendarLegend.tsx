import React from "react";

const CalendarLegend: React.FC = () => {
  return (
    <div>
      <ul>
        <li className="bg-green-500 text-white p-2 mb-2 border rounded-md">
          Places disponibles
        </li>
        <li className="bg-orange-300 text-white p-2 mb-2 border rounded-md">
          Places limitées
        </li>
        <li className="bg-gray-300 text-white p-2 mb-2 border rounded-md">
          Complet
        </li>
        <li className="bg-white text-black p-2 mb-2 border rounded-md">
          Pas de cours
        </li>
      </ul>
    </div>
  );
};

export default CalendarLegend;

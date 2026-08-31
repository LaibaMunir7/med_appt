import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  return (
    <div className="reports-container">
      <h1>Your Reports</h1>

      <div className="reports-card">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Report Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Medical Consultation Report</td>
              <td>Doctor</td>
              <td>-</td>
              <td>No report available</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Health Report</td>
              <td>Doctor</td>
              <td>-</td>
              <td>No report available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsLayout;

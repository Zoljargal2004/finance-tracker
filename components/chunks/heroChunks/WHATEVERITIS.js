"use client"; // Ensure this component is treated as a client-side component

import React from "react";

// Sample data
const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

// Simple table component using plain HTML
export function SimpleTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr>
              <th>Status</th>
              <th>Email</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.status}</td>
                  <td>{item.email}</td>
                  <td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "MNT",
                    }).format(item.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SimpleTable;

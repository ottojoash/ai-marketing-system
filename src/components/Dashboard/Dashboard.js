import React from "react";
// import Sidebar from "../Shared/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Welcome to the Dashboard</h1>
        </header>

        {/* Grid of Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold">Total Sales</h2>
            <p className="text-2xl font-bold text-green-500">$45,000</p>
          </div>
          <div className="card bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold">New Users</h2>
            <p className="text-2xl font-bold text-blue-500">1,200</p>
          </div>
          <div className="card bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold">Monthly Revenue</h2>
            <p className="text-2xl font-bold text-purple-500">$12,500</p>
          </div>
        </section>

        {/* Table */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>$500</td>
                  <td>
                    <span className="badge badge-success">Completed</span>
                  </td>
                  <td>2024-11-20</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>$250</td>
                  <td>
                    <span className="badge badge-warning">Pending</span>
                  </td>
                  <td>2024-11-19</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mark Evans</td>
                  <td>$1,000</td>
                  <td>
                    <span className="badge badge-error">Failed</span>
                  </td>
                  <td>2024-11-18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

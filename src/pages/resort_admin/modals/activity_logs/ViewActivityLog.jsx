import React from "react";

const ViewActivityLog = ({ log }) => {
  // Split the message by ";" and filter out empty strings after trimming
  const messages = log.message
    .split(";")
    .map((msg) => msg.trim())
    .filter((msg) => msg.length > 0);

  return (
    <div className=" lg:w-[30rem] p-6 bg-white shadow-md rounded-md border border-gray-200 space-y-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div>
          <span className="font-semibold">Table:</span> {log.table} |{" "}
          <span className="font-semibold">Affected ID:</span> {log.affected_id}
        </div>
        <div>
          <span className="font-semibold">Action:</span>{" "}
          <span className="capitalize">{log.action}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">Message</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>

      <div className="mt-2 text-sm text-gray-400 space-y-2">
        <div>Created: {new Date(log.created_at).toLocaleString()}</div>
        <div>Updated: {new Date(log.updated_at).toLocaleString()}</div>
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <div>
          Triggered by: <span className="font-medium">{log.triggered_by}</span>
        </div>
        <div>
          Resort ID: <span className="font-medium">{log.resort_id}</span>
        </div>
      </div>

    </div>
  );
};

export default ViewActivityLog;


import React from 'react';

export default function ClientTable({ clients }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Client ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Updated At
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Contact
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Revenue
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {client.clientId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {client.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {client.type}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {client.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {new Date(client.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {new Date(client.updatedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {new Date(client.lastContact).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
              {client.revenue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

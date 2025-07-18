import React, { useState } from 'react';
import { DataTable } from '../components/ui/datatable';

const departmentData = [
  {
    srNo: '#1',
    department: 'Project Manager',
    subDepartment: 'Planning, procurement and execution of a project',
  },
  {
    srNo: '#1',
    department: 'NetworkAdministration',
    subDepartment: 'Managing the computer',
  },
  // ...more data
];

export default function Department() {
  const [page, setPage] = useState(1);

  const columns: {
    header: string;
    accessor: keyof (typeof departmentData)[0];
  }[] = [
    { header: 'Sr. No.', accessor: 'srNo' },
    { header: 'Department', accessor: 'department' },
    { header: 'Sub Department', accessor: 'subDepartment' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-xl font-semibold">Department List</h1> */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      <DataTable
        columns={columns}
        data={departmentData.slice((page - 1) * 10, page * 10)}
        currentPage={page}
        totalPages={5}
        onPageChange={(p) => setPage(p)}
        onEdit={(row) => console.log('Edit:', row)}
        onDelete={(row) => console.log('Delete:', row)}
      />
    </div>
  );
}

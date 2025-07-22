import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiService } from "@/services/api";
import { DataTable } from "@/components/ui/datatable";
import { Loader } from "@/components/ui/loader";
import { SearchAddHeader } from "@/components/ui/searchHeader";

type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  departmentId: number;
  positionId: number;
  uploadEmployeePhoto: string;
  activeStatus: boolean;
  assignRole: number;
};

type EmployeeResponse = {
  success: boolean;
  message: string;
  data: {
    data: EmployeeType[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
  };
};

export const Employee: React.FC = () => {
  const { t } = useTranslation();

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchEmployeeList = async (page: number) => {
    setLoading(true);
    try {
      const res: any = await apiService.getEmployee(page, pageSize);
      const employeeList = res?.data?.data || [];
      const totalRecords = res?.data?.totalRecords || 0;

      setEmployees(employeeList);
      setTotalPages(Math.ceil(totalRecords / pageSize));
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList(currentPage);
  }, [currentPage]);

  const columns = [
    {
      header: t("table.name"),
      accessor: "firstName" as const,
      render: (value: any, row: EmployeeType) => `${row.firstName} ${row.lastName}`,
    },
    {
      header: t("table.email"),
      accessor: "email" as const,
    },
    {
      header: t("table.position"),
      accessor: "positionId" as const,
      render: (value: number) => `#${value}`,
    },
  ];

  const handleEdit = (row: EmployeeType) => {
    console.log("Edit clicked for:", row);
  };

  const handleDelete = (row: EmployeeType) => {
    console.log("Delete clicked for:", row);
  };
  const handleSearchChange = (value: string) => {
    console.log("Searching:", value);
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
  };
  return (
    // <div className="space-y-6">
    <>
  
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <><SearchAddHeader
        onSearchChange={handleSearchChange}
        onAddClick={handleAddClick}
      />
      <DataTable
            columns={columns}
            data={employees}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onEdit={handleEdit}
            onDelete={handleDelete} /></>
       )} 
        </>
    // </div>
  );
};

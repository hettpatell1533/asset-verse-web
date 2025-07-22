import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/ui/datatable";
import { Loader } from "@/components/ui/loader";
import { SearchAddHeader } from "@/components/ui/searchHeader";
import { apiService } from "@/services/api";
import { useNavigate } from "react-router-dom";

type PositionType = {
  id: number;
  name: string;
};

type PositionResponse = {
  success: boolean;
  message: string;
  data: PositionType[];
};

export const PositionList: React.FC = () => {
  const { t } = useTranslation();
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<PositionType | null>(null);
  const pageSize = 10;
  const navigate=useNavigate();

  const fetchPositions = async (page: number) => {
    setLoading(true);
    try {
      const res: any = await apiService.getPositions(page, pageSize);
      const positionList = res?.data.data || [];
      const totalRecords = res?.totalRecords || 0;

      setPositions(positionList);
      setTotalPages(Math.ceil(totalRecords / pageSize));
    } catch (err) {
      console.error("Failed to fetch positions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions(currentPage);
  }, [currentPage, search, openModal]); // Refresh after modal close

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    navigate('/position/add')
  };

  const handleEdit = (row: PositionType) => {
    setEditData(row);
    setOpenModal(true);
  };

  const handleDelete = (row: PositionType) => {
    console.log("Delete clicked:", row);
    // Implement deletion logic
  };

  const columns = [
    {
      header: t("table.id"),
      accessor: "id" as const, // `name` from API
    },
    {
      header: t("table.position"),
      accessor: "name" as const, // `name` from API
    },
  ];

  return (
    <>
      <SearchAddHeader
        onSearchChange={handleSearchChange}
        onAddClick={handleAddClick}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={positions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

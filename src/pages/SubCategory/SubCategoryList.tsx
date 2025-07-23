import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/datatable";
import { Loader } from "@/components/ui/loader";
import { SearchAddHeader } from "@/components/ui/searchHeader";
import { apiService } from "@/services/api";

type SubCategoryType = {
  subCategoryId: number;
  subCategoryName: string;
  categoryId: number;
};

export const SubCategoryList: React.FC = () => {
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const res: any = await apiService.getSubCategories(1, 1000); // Fetch all to filter/search on frontend
      const list: SubCategoryType[] = res?.data?.data || [];
      setSubCategories(list);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    navigate("/subcategory/add");
  };

  const handleEdit = (row: SubCategoryType) => {
    navigate(`/subcategory/edit/${row.subCategoryId}`);
  };

  const handleDelete = async (row: SubCategoryType) => {
    try {
      await apiService.deleteSubCategory(row.subCategoryId);
      fetchSubCategories();
    } catch (err) {
      console.error("Failed to delete subcategory", err);
    }
  };

  const filtered = subCategories.filter((c) =>
    c.subCategoryName.toLowerCase().includes(search.toLowerCase())
  );

  // Slice the filtered data for current page
  const paginatedData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [filtered]);

  const columns = [
    {
      header: t("table.id"),
      accessor: "subCategoryId" as const,
    },
    {
      header: t("table.subCategory"),
      accessor: "subCategoryName" as const,
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
          data={paginatedData}
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

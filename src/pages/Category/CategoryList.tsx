import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/datatable";
import { Loader } from "@/components/ui/loader";
import { SearchAddHeader } from "@/components/ui/searchHeader";
import { apiService } from "@/services/api";

type CategoryType = {
  id: number;
  categoryName: string;
};

export const CategoryList: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const pageSize = 10;

  const fetchCategories = async (page: number) => {
    setLoading(true);
    try {
      const res: any = await apiService.getCategories(page, pageSize);
      const categoryList: CategoryType[] = res?.data?.data || [];
      const totalRecords: number = res?.data?.totalRecords || 0;

      setCategories(categoryList);
      setTotalPages(Math.ceil(totalRecords / pageSize));
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    navigate("/category/add");
  };

  const handleEdit = (row: CategoryType) => {
    navigate(`/category/edit/${row.id}`);
  };

  const handleDelete = async (row: CategoryType) => {
    try {
      await apiService.deleteCategory(row.id);
      fetchCategories(currentPage);
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  const filteredCategories = categories.filter((c) => c.categoryName.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      header: t("table.id"),
      accessor: "id" as const,
    },
    {
      header: t("table.category"),
      accessor: "categoryName" as const,
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
          data={filteredCategories}
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

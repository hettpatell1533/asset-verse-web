import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/api';

interface OptionType {
  label: string;
  value: number;
}

const PAGE_SIZE = 10;

const SubCategoryForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(null);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async (inputValue = '', page = 1): Promise<OptionType[]> => {
    try {
      const res = await apiService.getCategories(page, PAGE_SIZE);
      return ((res as any)?.data?.data || []).map((cat: any) => ({
        label: cat.categoryName,
        value: cat.categoryId,
      }));
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  };

  const loadOptions = debounce(async (inputValue: string, callback: (options: OptionType[]) => void) => {
    const options = await fetchCategories(inputValue, 1);
    callback(options);
  }, 500);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      setError(t('subcategory.selectCategoryRequired') || 'Please select a category');
      return;
    }

    if (!subCategoryName.trim()) {
      setError(t('subcategory.required') || 'Sub category name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await apiService.createSubCategory({
        categoryId: selectedCategory.value,
        subCategoryName: subCategoryName.trim(),
        createdBy: '',
      });

      navigate('/subcategory');
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Something went wrong';
      setError(t(`errors.${errMsg}`) || errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">{t('subcategory.title') || 'Add Sub Category'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>{t('subcategory.selectCategory') || 'Category'}</Label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
            isDisabled={loading}
            placeholder={t('subcategory.selectPlaceholder') || 'Select Category'}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('subcategory.name') || 'Sub Category Name'}</Label>
          <Input
            type="text"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            placeholder={t('subcategory.placeholder') || 'Enter sub category name'}
            className="h-12 pr-10 pl-3 border-auth-border"
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4 justify-center mt-8">
          <button
            type="button"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md"
            onClick={() => navigate('/subcategory')}
            disabled={loading}
          >
            {t('common.cancel') || 'Cancel'}
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#003087] to-[#0099D6] text-white px-8 py-3 rounded-md"
            disabled={loading}
          >
            {loading ? t('common.loading') || 'Loading...' : t('common.add') || 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubCategoryForm;

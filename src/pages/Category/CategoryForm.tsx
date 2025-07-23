import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '@/services/api';

const CategoryForm: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch for edit
  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const res = await apiService.getCategoryById(Number(id));
          setCategoryName(res.data?.categoryName || '');
        } catch (err) {
          console.error('Failed to load category', err);
        } finally {
          setLoading(false);
        }
      };

      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError(t('category.required') || 'Category name is required');
      return;
    }

    try {
      setError('');
      setLoading(true);

      if (id) {
        await apiService.updateCategory(Number(id), {
            categoryId:id,
          categoryName: categoryName.trim(),
        });
      } else {
        await apiService.createCategory({
          categoryName: categoryName.trim(),
          createdBy: '', // you can update this with actual user ID
        });
      }

      navigate('/category');
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        {id ? t('category.edit') : t('category.title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="categoryName">{t('category.name')}</Label>
          <Input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={t('category.placeholders')}
            className="h-12 pr-10 pl-3 border-auth-border"
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            type="button"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md"
            onClick={() => navigate('/category')}
            disabled={loading}
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#003087] to-[#0099D6] text-white px-8 py-3 rounded-md"
            disabled={loading}
          >
            {loading
              ? t('common.loading')
              : id
              ? t('common.save')
              : t('common.add')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

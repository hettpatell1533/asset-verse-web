import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '@/services/api';

const PositionForm: React.FC = () => {
  const { t } = useTranslation();
  const {id} = useParams();

  const navigate = useNavigate();

  const [positionName, setPositionName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch for edit
  useEffect(() => {
    if(id){
        const fetchPosition = async () => {
          try {
            setLoading(true);
            const res = await apiService.getPositionById(id as any);
            setPositionName((res as any)?.data?.name || '');
          } catch (err) {
            console.error('Failed to load position', err);
          } finally {
            setLoading(false);
          }
        }
        
          fetchPosition();
    }   
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!positionName.trim()) {
      setError(t('position.required') || 'Position name is required');
      return;
    }

    try {
      setError('');
      setLoading(true);

      if (id) {
        await apiService.updatePosition(Number(id), { 
          positionId:id,
          positionName: positionName.trim() });
      } else {
        await apiService.createPosition( { name: positionName.trim(),createdBy:"" });
      }

      navigate('/position');
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
        {id ? t('position.edit') : t('position.title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="positionName">{t('position.name')}</Label>
          <Input
            id="positionName"
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            placeholder={t('position.placeholders')}
            className="h-12 pr-10 pl-3 border-auth-border"
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            type="button"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md"
            onClick={() => navigate('/position')}
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

export default PositionForm;

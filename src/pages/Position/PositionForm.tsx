import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

interface PositionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, id?: string) => void;
  positionId?: string;
  initialName?: string;
}

const PositionForm: React.FC<PositionModalProps> = ({
  open,
  onClose,
  onSubmit,
  positionId,
  initialName = '',
}) => {
  const { t } = useTranslation();
  const [positionName, setPositionName] = useState(initialName);
  const [error, setError] = useState('');

  useEffect(() => {
    if (positionId && initialName) {
      setPositionName(initialName);
    }
  }, [positionId, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!positionName.trim()) {
      setError(t('position.validation.required') || 'Position name is required');
      return;
    }
    onSubmit(positionName.trim(), positionId);
    onClose();
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">{positionId ? t('position.edit') : t('position.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="positionName">{t('position.name')}</Label>
          <Input
            id="positionName"
            name="positionName"
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            placeholder={t('position.placeholders')}
            className="h-12 pr-10 pl-3 border-auth-border"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <button
            type="button"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md"
            onClick={onClose}
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#003087] to-[#0099D6] text-white px-8 py-3 rounded-md"
          >
            {positionId ? t('common.update') : t('common.add')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PositionForm;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { assetActions } from '../actions/assetActions';

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance' | 'repair';
  purchaseDate: string;
  serialNumber: string;
}

export const Assets: React.FC = () => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const response = await assetActions.getAssets();
      setAssets((response as any)?.data || []);
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success text-white';
      case 'inactive':
        return 'bg-neutral-400 text-white';
      case 'maintenance':
        return 'bg-warning text-white';
      case 'repair':
        return 'bg-error text-white';
      default:
        return 'bg-muted';
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('assets.title')}</h1>
          <p className="text-muted-foreground">
            Manage your organization's assets
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('assets.addAsset')}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {t('assets.filterByCategory')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory('')}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('Computer')}>
                  Computer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('Furniture')}>
                  Furniture
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('Vehicle')}>
                  Vehicle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assets ({filteredAssets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('assets.assetName')}</TableHead>
                  <TableHead>{t('assets.category')}</TableHead>
                  <TableHead>{t('assets.location')}</TableHead>
                  <TableHead>{t('assets.status')}</TableHead>
                  <TableHead>{t('assets.serialNumber')}</TableHead>
                  <TableHead>{t('assets.purchaseDate')}</TableHead>
                  <TableHead>{t('assets.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">No assets found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.category}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(asset.status)}>
                          {t(`status.${asset.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>{asset.serialNumber}</TableCell>
                      <TableCell>{asset.purchaseDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
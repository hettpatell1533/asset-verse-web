import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, Upload } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const HelpSupport: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useAppContext();
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [openFAQs, setOpenFAQs] = useState<{ [key: string]: boolean }>({});
  const [ticketForm, setTicketForm] = useState({
    title: '',
    supportType: '',
    description: '',
    screenshot: null as File | null
  });

  const ticketStats = [
    { key: 'totalTickets', value: '1500', color: 'bg-blue-500' },
    { key: 'newTickets', value: '126', color: 'bg-yellow-500' },
    { key: 'activeTickets', value: '500', color: 'bg-green-500' },
    { key: 'inProgressTickets', value: '150', color: 'bg-orange-500' },
    { key: 'closedTickets', value: '724', color: 'bg-red-500' }
  ];

  const faqKeys = [
    'whatIsAsset',
    'whyAssetsImportant', 
    'mainTypesAssets',
    'differenceCurrentNonCurrent',
    'intangibleAsset',
    'assetsValued',
    'depreciation',
    'assetsRelateToLiabilities'
  ];

  const priorities = [
    { value: 'high', label: t('helpSupport.priorities.high') },
    { value: 'medium', label: t('helpSupport.priorities.medium') },
    { value: 'low', label: t('helpSupport.priorities.low') }
  ];

  const toggleFAQ = (faqKey: string) => {
    setOpenFAQs(prev => ({
      ...prev,
      [faqKey]: !prev[faqKey]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTicketForm(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmitTicket = () => {
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    setShowRaiseTicket(false);
    setTicketForm({ title: '', supportType: '', description: '', screenshot: null });
  };

  if (showRaiseTicket) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            {t('helpSupport.raiseTicketTitle')}
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('helpSupport.ticketTitle')}
                </label>
                <Input
                  placeholder={t('helpSupport.placeholders.ticketTitle')}
                  value={ticketForm.title}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('helpSupport.supportType')}
                </label>
                <Select
                  value={ticketForm.supportType}
                  onValueChange={(value) => setTicketForm(prev => ({ ...prev, supportType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('helpSupport.placeholders.selectSupportType')} />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <label className="text-sm font-medium text-foreground">
                {t('helpSupport.description')}
              </label>
              <Textarea
                placeholder={t('helpSupport.placeholders.enterDescription')}
                className="min-h-[120px]"
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2 mt-6">
              <label className="text-sm font-medium text-foreground">
                {t('helpSupport.uploadScreenshot')}
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label htmlFor="screenshot-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {ticketForm.screenshot ? ticketForm.screenshot.name : t('helpSupport.placeholders.uploadScreenshot')}
                  </p>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowRaiseTicket(false)}
              >
                {t('helpSupport.cancel')}
              </Button>
              <Button onClick={handleSubmitTicket}>
                {t('helpSupport.addTicket')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          {t('helpSupport.title')}
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {ticketStats.map((stat, index) => (
          <Card key={stat.key} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className={`absolute top-0 left-0 w-full h-1 ${stat.color}`} />
              <div className="text-sm text-muted-foreground mb-1">
                {t(`helpSupport.ticketStats.${stat.key}`)}
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t('helpSupport.howCanWeHelp')}
          </CardTitle>
          <div className="flex gap-4">
            <Button variant="outline">
              {t('helpSupport.contactUs')}
            </Button>
            <Button onClick={() => setShowRaiseTicket(true)}>
              {t('helpSupport.raiseTicket')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqKeys.map((faqKey) => (
            <Collapsible
              key={faqKey}
              open={openFAQs[faqKey]}
              onOpenChange={() => toggleFAQ(faqKey)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-muted rounded-lg">
                <span className="font-medium text-foreground">
                  {t(`helpSupport.faqs.${faqKey}`)}
                </span>
                <div className={`transform transition-transform ${openFAQs[faqKey] ? 'rotate-180' : ''}`}>
                  {openFAQs[faqKey] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {faqKey === 'assetsValued' && (
                    <div>
                      <p>Assets are typically recorded on the balance sheet at their historical cost (the original purchase price). Over time, some assets are depreciated.</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Liabilities are what a company owes to others (e.g., loans, accounts payable).</li>
                        <li>Equity is the residual value of assets after all liabilities are paid (what's left for the owners). This equation shows that a company's assets are financed</li>
                      </ul>
                    </div>
                  )}
                  {faqKey !== 'assetsValued' && (
                    <p>Detailed information about {t(`helpSupport.faqs.${faqKey}`).toLowerCase()} will be displayed here.</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
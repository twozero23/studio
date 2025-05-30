
"use client";
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AVAILABLE_FONTS, DEFAULT_FONT, DEFAULT_ACCENT_COLOR } from '@/lib/portfolio-data-types';
import type { PortfolioTheme, FontOption } from '@/lib/portfolio-data-types';

export default function AdminThemePage() {
  const { portfolioData, updateTheme, isLoading, currentFont, currentAccentColor } = useAppContext();

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading theme settings...</p></AdminLayout>;
  }

  const handleThemeChange = (field: keyof PortfolioTheme, value: string) => {
    updateTheme(prev => ({ ...prev, [field]: value }));
  };

  const handleResetAccentColor = () => {
    handleThemeChange('accentColor', DEFAULT_ACCENT_COLOR);
  };
  
  const handleResetFont = () => {
    handleThemeChange('font', DEFAULT_FONT);
  };

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Theme & Appearance"
        description="Customize the look and feel of your portfolio."
      >
        <div className="space-y-4">
          <Label htmlFor="accentColor" className="font-medium">Accent Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="accentColor"
              type="color"
              value={currentAccentColor}
              onChange={(e) => handleThemeChange('accentColor', e.target.value)}
              className="p-1 h-10 w-16 rounded-md border bg-background"
            />
            <Input
              type="text"
              value={currentAccentColor}
              onChange={(e) => handleThemeChange('accentColor', e.target.value)}
              placeholder="#RRGGBB"
              className="max-w-xs bg-background"
            />
            <Button variant="outline" onClick={handleResetAccentColor}>Reset to Default</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Select your portfolio's primary accent color. Used for highlights, buttons, and links.
            The current default is a <span style={{color: DEFAULT_ACCENT_COLOR, fontWeight: 'bold'}}>soft blue</span>.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontSelection" className="font-medium">Font Selection</Label>
          <div className="flex items-center gap-2">
            <Select
              value={currentFont}
              onValueChange={(value: FontOption) => handleThemeChange('font', value)}
            >
              <SelectTrigger id="fontSelection" className="w-full md:w-[280px] bg-background">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_FONTS.map(font => (
                  <SelectItem key={font.name} value={font.name} style={{fontFamily: font.value}}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleResetFont}>Reset to Default</Button>
          </div>
           <p className="text-xs text-muted-foreground">
            Choose a primary font for your portfolio. The current default is <strong>{DEFAULT_FONT}</strong>.
          </p>
        </div>
        
        <div className="space-y-2">
            <FormField
              id="profilePictureUrl"
              label="Profile Picture URL (Optional)"
              type="url"
              value={portfolioData.theme.profilePictureUrl || ''}
              onChange={(e) => handleThemeChange('profilePictureUrl', e.target.value)}
              placeholder="https://example.com/your-photo.jpg"
              description="Paste a URL to an image to use as your profile picture. If empty, initials will be shown."
            />
        </div>

        {/* Preview (Conceptual) */}
        <div className="mt-6 border-t pt-6">
            <h4 className="text-md font-semibold mb-2">Live Preview (Example)</h4>
            <div className="p-4 border rounded-md" style={{ fontFamily: AVAILABLE_FONTS.find(f => f.name === currentFont)?.value, borderColor: currentAccentColor }}>
                <h5 className="text-lg font-bold" style={{ color: currentAccentColor }}>This is a Title with Accent Color</h5>
                <p className="text-sm">This paragraph uses the selected font. The border of this box also uses the accent color.</p>
                <Button style={{ backgroundColor: currentAccentColor, borderColor: currentAccentColor }} className="text-primary-foreground mt-2">Accent Button</Button>
            </div>
        </div>

      </EditableSectionWrapper>
    </AdminLayout>
  );
}

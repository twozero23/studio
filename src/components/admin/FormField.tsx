
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'url' | 'textarea' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  description?: string;
  required?: boolean;
  rows?: number; // for textarea
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  description,
  required,
  rows
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          id={id}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows || 3}
          className="bg-background"
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="bg-background"
        />
      )}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};

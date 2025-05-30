
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import React from 'react';

interface EditableSectionWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const EditableSectionWrapper: React.FC<EditableSectionWrapperProps> = ({ title, description, children }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};


"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ArrayManagerProps<T extends { id: string }> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>> | ((newItems: T[]) => void);
  renderItem: (item: T, index: number, onChange: (index: number, updatedItem: Partial<T>) => void, onMoveUp: (index: number) => void, onMoveDown: (index: number) => void) => React.ReactNode;
  generateNewItem: () => T;
  itemTypeName: string; // e.g., "Experience Entry"
}

export function ArrayManager<T extends { id: string }>({
  items,
  setItems,
  renderItem,
  generateNewItem,
  itemTypeName,
}: ArrayManagerProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddItem = () => {
    const newItem = generateNewItem();
    setItems([...items, newItem]);
    setEditingIndex(items.length); // Open the new item for editing
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const handleItemChange = (index: number, updatedItem: Partial<T>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updatedItem };
    setItems(newItems);
  };
  
  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const newItems = [...items];
    const itemToMove = newItems[index];
    if (direction === 'up') {
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = itemToMove;
    } else { // down
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = itemToMove;
    }
    setItems(newItems);
    // Adjust editing index if the currently edited item moved
    if (editingIndex === index) {
      setEditingIndex(direction === 'up' ? index - 1 : index + 1);
    } else if (editingIndex === (direction === 'up' ? index - 1 : index + 1)) {
      setEditingIndex(index);
    }
  };


  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">
                {itemTypeName} {index + 1}
                {(item as any).role && ` - ${(item as any).role}`}
                {(item as any).name && ` - ${(item as any).name}`}
                {(item as any).degree && ` - ${(item as any).degree}`}
                {(item as any).title && ` - ${(item as any).title}`}
              </h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleMoveItem(index, 'up')} disabled={index === 0} aria-label="Move up">
                  <ChevronUp className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" onClick={() => handleMoveItem(index, 'down')} disabled={index === items.length - 1} aria-label="Move down">
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditingIndex(editingIndex === index ? null : index)}>
                  <Edit2 className="h-4 w-4 mr-1" /> {editingIndex === index ? 'Collapse' : 'Edit'}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(index)}>
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
            </div>
            {editingIndex === index && (
              <div className="mt-4 pt-4 border-t">
                {renderItem(item, index, handleItemChange, () => handleMoveItem(index, 'up'), () => handleMoveItem(index, 'down'))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleAddItem} variant="outline">
        <PlusCircle className="h-4 w-4 mr-2" /> Add New {itemTypeName}
      </Button>
    </div>
  );
}

// Helper for managing string arrays within an item (e.g., responsibilities, achievements)
interface StringListManagerProps {
  list: string[];
  setList: (newList: string[]) => void;
  label: string; // e.g. "Responsibility"
}

export const StringListManager: React.FC<StringListManagerProps> = ({ list, setList, label }) => {
  const handleAddString = () => setList([...list, '']);
  const handleRemoveString = (index: number) => setList(list.filter((_, i) => i !== index));
  const handleStringChange = (index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  return (
    <div className="space-y-2">
      {list.map((str, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            type="text"
            value={str}
            onChange={(e) => handleStringChange(index, e.target.value)}
            placeholder={`${label} ${index + 1}`}
            className="flex-grow bg-background"
          />
          <Button variant="ghost" size="icon" onClick={() => handleRemoveString(index)} aria-label={`Remove ${label}`}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={handleAddString}>
        <PlusCircle className="h-4 w-4 mr-2" /> Add {label}
      </Button>
    </div>
  );
};

// Re-exporting Input to avoid direct import of shadcn/ui/input in multiple admin pages
import { Input } from '@/components/ui/input';

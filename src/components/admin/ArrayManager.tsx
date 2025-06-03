
"use client";
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input'; // Re-import Input here

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

  const handleAddItem = useCallback(() => {
    const newItem = generateNewItem();
    // Ensure items is an array before spreading.
    // The 'setItems' prop callback updates the parent's state.
    setItems((prevParentItems: T[] = []) => [...prevParentItems, newItem]);
    
    // Set editingIndex to the length of the current 'items' prop.
    // This will be the index of the newly added item.
    // 'items' here refers to the prop passed to ArrayManager at the time of this call.
    setEditingIndex(items.length); 
  }, [generateNewItem, setItems, items]); // Added 'items' to dependency array

  const handleRemoveItem = useCallback((index: number) => {
    setItems((prevItems: T[] = []) => prevItems.filter((_, i) => i !== index));
    setEditingIndex(currentEditingIndex => {
      if (currentEditingIndex === index) {
        return null;
      } else if (currentEditingIndex !== null && currentEditingIndex > index) {
        return currentEditingIndex - 1;
      }
      return currentEditingIndex;
    });
  }, [setItems]);

  const handleItemChange = useCallback((index: number, updatedItem: Partial<T>) => {
    setItems((prevItems: T[] = []) => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], ...updatedItem };
      return newItems;
    });
  }, [setItems]);
  
  const handleMoveItem = useCallback((index: number, direction: 'up' | 'down') => {
    setItems((prevItems: T[] = []) => {
      if (!prevItems || prevItems.length === 0) return [];
      if (direction === 'up' && index === 0) return prevItems;
      if (direction === 'down' && index === prevItems.length - 1) return prevItems;

      const newItems = [...prevItems];
      const itemToMove = newItems[index];
      if (direction === 'up') {
        newItems[index] = newItems[index - 1];
        newItems[index - 1] = itemToMove;
      } else { // down
        newItems[index] = newItems[index + 1];
        newItems[index + 1] = itemToMove;
      }
      return newItems;
    });
    setEditingIndex(currentEditingIndex => {
      if (currentEditingIndex === index) {
        return direction === 'up' ? index - 1 : index + 1;
      } else if (currentEditingIndex === (direction === 'up' ? index - 1 : index + 1)) {
        return index;
      }
      return currentEditingIndex;
    });
  }, [setItems]);


  return (
    <div className="space-y-4">
      {(items || []).map((item, index) => (
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
                 <Button variant="ghost" size="icon" onClick={() => handleMoveItem(index, 'down')} disabled={index === (items || []).length - 1} aria-label="Move down">
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

interface StringListManagerProps {
  list: string[];
  setList: (newList: string[]) => void;
  label: string; 
}

const StringListManagerInternal: React.FC<StringListManagerProps> = ({ list, setList, label }) => {
  const handleAddString = useCallback(() => setList([...(list || []), '']), [list, setList]);
  
  const handleRemoveString = useCallback((index: number) => setList((list || []).filter((_, i) => i !== index)), [list, setList]);
  
  const handleStringChange = useCallback((index: number, value: string) => {
    const newList = [...(list || [])];
    newList[index] = value;
    setList(newList);
  }, [list, setList]);

  return (
    <div className="space-y-2">
      {(list || []).map((str, index) => (
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
export const StringListManager = React.memo(StringListManagerInternal);

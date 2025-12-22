'use client';

import React from 'react';
import { Box, Button, IconButton, TextField, Typography, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface DynamicListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
  sectionTitle: string;
  placeholder?: string;
}

const DynamicListEditor: React.FC<DynamicListEditorProps> = ({
  items,
  onChange,
  label,
  sectionTitle,
  placeholder,
}) => {
  const handleAddItem = () => {
    onChange([...items, '']);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{sectionTitle}</Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddItem}
          size="small"
        >
          Add Item
        </Button>
      </Box>

      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label={`${label} ${index + 1}`}
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={placeholder}
            size="small"
          />
          <IconButton onClick={() => handleRemoveItem(index)} color="error">
            <Delete />
          </IconButton>
        </Box>
      ))}

      {items.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5', border: '1px dashed #bdbdbd' }}>
          <Typography color="text.secondary" gutterBottom>
            No items added yet.
          </Typography>
          <Button startIcon={<Add />} onClick={handleAddItem}>
            Add First Item
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default DynamicListEditor;

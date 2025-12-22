'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, TextField, Typography, Paper, Tabs, Tab } from '@mui/material';
import { Add, Delete, Close } from '@mui/icons-material';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

export interface SectionItem {
  title: string;
  description: string;
}

interface DynamicSectionEditorProps {
  items: SectionItem[];
  onChange: (items: SectionItem[]) => void;
  titleLabel: string;
  descriptionLabel: string;
  sectionTitle: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DynamicSectionEditor: React.FC<DynamicSectionEditorProps> = ({
  items,
  onChange,
  titleLabel,
  descriptionLabel,
  sectionTitle,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  // Ensure activeTab is valid when items change
  useEffect(() => {
    if (activeTab >= items.length && items.length > 0) {
      setActiveTab(items.length - 1);
    }
  }, [items.length, activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddItem = () => {
    const newItem = { title: `New Item ${items.length + 1}`, description: '' };
    onChange([...items, newItem]);
    setActiveTab(items.length); // Switch to the new tab
  };

  const handleRemoveItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent tab switching when clicking delete
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    // Active tab adjustment is handled by the useEffect
  };

  const handleItemChange = (index: number, field: keyof SectionItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <Box sx={{ mb: 4, width: '100%' }}>
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

      {items.length > 0 ? (
        <Paper sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              aria-label={`${sectionTitle} tabs`}
              sx={{ flexGrow: 1 }}
            >
              {items.map((item, index) => (
                <Tab 
                  key={index} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title || `Item ${index + 1}`}
                      </span>
                      <IconButton
                        size="small"
                        component="span"
                        onClick={(e) => handleRemoveItem(index, e)}
                        sx={{ ml: 0.5, p: 0.2, '&:hover': { color: 'error.main' } }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  } 
                />
              ))}
            </Tabs>
          </Box>
          
          {items.map((item, index) => (
            <CustomTabPanel value={activeTab} index={index} key={index}>
              <TextField
                fullWidth
                label={titleLabel}
                value={item.title}
                onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                sx={{ mb: 3 }}
                required
              />

              <RichTextEditor
                value={item.description}
                onChange={(value) => handleItemChange(index, 'description', value)}
                label={descriptionLabel}
              />
            </CustomTabPanel>
          ))}
        </Paper>
      ) : (
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

export default DynamicSectionEditor;

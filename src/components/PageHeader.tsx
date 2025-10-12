import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ breadcrumbs, title, description, actions }: PageHeaderProps) {
  const router = useRouter();

  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<ChevronRight size={16} />}
        sx={{ mb: 2 }}
      >
        {breadcrumbs.map((item, index) => (
          item.href ? (
            <Link
              key={index}
              color="inherit"
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href!);
              }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={index} color="text.primary" fontWeight={500}>
              {item.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>

      {/* Title and Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        {actions && <Box>{actions}</Box>}
      </Box>

      {/* Description */}
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}

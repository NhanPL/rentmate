import { MenuItem } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import * as React from 'react';

export interface SharedMenuItem {
  label: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  onClick: (i: string) => void;
  icon?: React.ReactNode;
}

interface SharedMenuProps extends Omit<MenuProps, 'children'> {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: SharedMenuItem[];
  id: string;
}

export default function PositionedMenu({ id, anchorEl, open, onClose, items, ...props }: SharedMenuProps) {
  const renderColor = (color: string | undefined) => {
    switch (color) {
      case 'primary':
        return 'text-blue-600';
      case 'secondary':
        return 'text-purple-600';
      case 'error':
        return 'text-red-600';
      case 'info':
        return 'text-cyan-600';
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-inherit';
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} {...props}>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          className={renderColor(item.color)}
          onClick={() => {
            item.onClick(id);
            onClose();
          }}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
}

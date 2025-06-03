import { MenuItem } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import * as React from 'react';

export interface SharedMenuItem {
  label: string;
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
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} {...props}>
      {items.map((item, index) => (
        <MenuItem
          key={index}
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

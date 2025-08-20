// Sidebar.tsx
'use client';
import * as React from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Toolbar,
  Box,
} from '@mui/material';
import NextLink from 'next/link';

export type MenuItemLeaf = {
  type: 'item'; // 바로 이동하는 메뉴
  key: string;
  name: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type MenuItemGroup = {
  type: 'group'; // 아코디언 카테고리
  key: string;
  name: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: MenuItemLeaf[]; // 2뎁스 페이지 목록
};

export type MenuNode = MenuItemLeaf | MenuItemGroup;

export type SidebarProps = {
  menu: MenuNode[];
  width?: number;
  selectedKey?: string; // 현재 선택된 key (leaf의 key 사용 권장)
  defaultOpenGroups?: string[]; // 처음 열어둘 group key 목록
  open?: boolean;
  onClose?: () => void;
  header?: React.ReactNode;
  showDividers?: boolean; // 그룹 사이 Divider
};

const DEFAULT_WIDTH = 260;

export default function Sidebar({
  menu,
  width = DEFAULT_WIDTH,
  selectedKey,
  defaultOpenGroups = [],
  open = false,
  onClose,
  header,
  showDividers = false,
}: SidebarProps) {
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () => defaultOpenGroups.reduce((acc, k) => ({ ...acc, [k]: true }), {}),
  );

  const toggleGroup = React.useCallback((key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      ModalProps={{ BackdropProps: { invisible: true } }}
      anchor="left"
      elevation={0}
      sx={{
        width: open ? width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          height: 'calc(100vh - 64px)', // header height
          top: '64px', // header height
        },
      }}
    >
      {/* <Toolbar sx={{ minHeight: 64 }}>
        <Box sx={{ px: 2, width: '100%' }}>{header}</Box>
      </Toolbar>
      <Divider /> */}

      <List component="nav" sx={{ px: 1, py: 0.5 }}>
        {menu.map((node, idx) => {
          const isGroup = node.type === 'group';

          if (!isGroup) {
            const leaf = node as MenuItemLeaf;
            const isSelected = selectedKey === leaf.key;

            return (
              <React.Fragment key={leaf.key}>
                {showDividers && idx > 0 && <Divider sx={{ my: 0.5 }} />}
                <ListItemButton
                  href={leaf.href}
                  prefetch={false}
                  component={NextLink}
                  selected={isSelected}
                  disabled={leaf.disabled}
                  sx={{ borderRadius: 1 }}
                >
                  {!!leaf.icon && (
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {leaf.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={leaf.name} />
                </ListItemButton>
              </React.Fragment>
            );
          }

          const group = node as MenuItemGroup;
          const isOpen = !!openGroups[group.key];

          return (
            <React.Fragment key={group.key}>
              {showDividers && idx > 0 && <Divider sx={{ my: 0.5 }} />}

              <ListItemButton
                disabled={group.disabled}
                onClick={() => toggleGroup(group.key)}
                sx={{ borderRadius: 1 }}
                aria-expanded={isOpen}
                aria-controls={`submenu-${group.key}`}
              >
                {!!group.icon && (
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {group.icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={group.name} />
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  id={`submenu-${group.key}`}
                >
                  {group.children.map((leaf) => {
                    const isSelected = selectedKey === leaf.key;
                    return (
                      <ListItemButton
                        component={NextLink}
                        href={group.href + leaf.href}
                        prefetch={false}
                        key={leaf.key}
                        selected={isSelected}
                        disabled={leaf.disabled}
                        sx={{
                          pl: 6, // 그룹 들여쓰기
                          borderRadius: 1,
                        }}
                      >
                        {!!leaf.icon && (
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {leaf.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText primary={leaf.name} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
}

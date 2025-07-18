// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { NavLink, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Package, 
//   BarChart3, 
//   Settings, 
//   Users, 
//   MapPin,
//   FolderOpen,
//   Wrench,
//   X, ChevronLeft, ChevronRight,Network,Building2,IdCardIcon,
//   IdCard
// } from 'lucide-react';
// import { cn } from '../../lib/utils';
// import { useAppContext } from '../../contexts/AppContext';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   const { dispatch } = useAppContext();
//   const [collapsed, setCollapsed] = useState(false);
//   const { t } = useTranslation();
//   const { state } = useAppContext();
//   const location = useLocation();

//   const navigationItems = [
//     {
//       title: t('common.dashboard'),
//       href: '/dashboard',
//       icon: LayoutDashboard,
//     },
//     {
//       title: t('common.sites'),
//       href: '/sites',
//       icon: Building2,
//     },
//     {
//       title: t('navigation.locations'),
//       href: '/locations',
//       icon: MapPin,
//     },
//     {
//       title: t('navigation.department'),
//       href: '/department',
//       icon: Network,
//     },
//     {
//       title: t('navigation.employee'),
//       href:"/employee",
//       icon: IdCard,
//       children: [
//         {
//           title: t('navigation.positions'),
//           href: '/position',
//         },
//         {
//           title: t('navigation.rolesandrights'),
//           href: '/rolesandrights',
//         },
//         {
//           title: t('navigation.category'),
//           href: '/category',
//         },
//         {
//           title: t('navigation.subcategory'),
//           href: '/subcategory',
//         },
//       ],
//     },
//     {
//       title: t('navigation.assets'),
//       href: '/assets',
//       icon: Package,
//     },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <>
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside className={cn(
//         "fixed top-0 left-0 z-50 h-full bg-card border-r transform transition-transform duration-200 ease-in-out",
//         isOpen ? "translate-x-0" : "-translate-x-full",
//         collapsed ? "w-16" : "w-64",
//         "lg:translate-x-0 lg:static lg:inset-0",
//         state.language === 'ar' && "right-0 left-auto"
//       )}>
//         {/* Top Controls */}
//         <div className="flex items-center justify-between h-16 border-b px-4">
//           {!collapsed && (
//             // <h1 className="text-xl font-bold text-gradient whitespace-nowrap">
//             //   Asset Manager
//             // </h1>
//             <img src='/images/ASMLogo.png' style={{maxWidth:"52%"}}></img>
//           )}
//           <div className="flex gap-2">
//             {/* Collapse/Expand Button */}
//             <button onClick={() => setCollapsed(!collapsed)} className="lg:block hidden">
//               {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//             </button>
//             {/* Close Button (mobile only) */}
//             <button onClick={onClose} className="lg:hidden">
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto py-4">
//           <ul className="space-y-1 px-3">
//   {navigationItems.map((item) => {
//     const Icon = item.icon;

//     // If item has children = submenu
//     if (item.children) {
//       const isActiveParent = item.children.some(child => isActive(child.href));
//       const [open, setOpen] = useState(isActiveParent); // Open if one submenu is active

//       return (
//         <li key={item.title}>
//           {/* Parent Menu Button */}
//           <div
//             onClick={() => setOpen(!open)}
//             className={cn(
//               "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
//               isActiveParent ? "bg-primary text-primary-foreground" : "text-muted-foreground",
//               state.language === 'ar' && "flex-row-reverse",
//               collapsed && "justify-center"
//             )}
//           >
//             <Icon className="h-5 w-5" />
//             {!collapsed && <span>{item.title}</span>}
//           </div>

//           {/* Submenu */}
//           {!collapsed && open && (
//             <ul className="ml-6 mt-1 space-y-1">
//               {item.children.map((subItem) => (
//                 <li key={subItem.href}>
//                   <NavLink
//                     to={subItem.href}
//                     onClick={() => {
//                       dispatch({ type: 'SET_PAGE_TITLE', payload: subItem.title });
//                       onClose();
//                     }}
//                     className={cn(
//                       "block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
//                       isActive(subItem.href)
//                         ? "bg-primary text-primary-foreground"
//                         : "text-muted-foreground"
//                     )}
//                   >
//                     {subItem.title}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       );
//     }

//     // Normal menu item (no children)
//     return (
//       <li key={item.href}>
//         <NavLink
//           to={item.href}
//           onClick={() => {
//             dispatch({ type: 'SET_PAGE_TITLE', payload: item.title });
//             onClose();
//           }}
//           className={cn(
//             "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
//             isActive(item.href)
//               ? "bg-primary text-primary-foreground"
//               : "text-muted-foreground",
//             state.language === 'ar' && "flex-row-reverse",
//             collapsed && "justify-center"
//           )}
//         >
//           <Icon className="h-5 w-5" />
//           {!collapsed && <span>{item.title}</span>}
//         </NavLink>
//       </li>
//     );
//   })}
// </ul>
//         </nav>
//       </aside>
//     </>
//   );
// };
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  MapPin,
  Network,
  Building2,
  IdCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronRight as ArrowRight,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useAppContext();
  const { t } = useTranslation();
  const { state } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const navigationItems = [
    {
      title: t('common.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('common.sites'),
      href: '/sites',
      icon: Building2,
    },
    {
      title: t('navigation.locations'),
      href: '/locations',
      icon: MapPin,
    },
    {
      title: t('navigation.department'),
      href: '/department',
      icon: Network,
    },
    {
      title: t('navigation.employee'),
      href: '/employee',
      icon: IdCard,
      children: [
        { title: t('navigation.positions'), href: '/position' },
        { title: t('navigation.rolesandrights'), href: '/rolesandrights' },
        { title: t('navigation.category'), href: '/category' },
        { title: t('navigation.subcategory'), href: '/subcategory' },
      ],
    },
    {
      title: t('navigation.assets'),
      href: '/assets',
      icon: Package,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-card border-r transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'w-16' : 'w-64',
          'lg:translate-x-0 lg:static lg:inset-0',
          state.language === 'ar' && 'right-0 left-auto'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b px-4">
          {!collapsed && (
            <img src="/images/ASMLogo.png" style={{ maxWidth: '52%' }} alt="Logo" />
          )}
          <div className="flex gap-2">
            <button onClick={() => setCollapsed(!collapsed)} className="lg:block hidden">
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button onClick={onClose} className="lg:hidden">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              // If item has children (like Employee)
              if (item.children) {
                const isActiveParent =
                  location.pathname === item.href ||
                  item.children.some((child) => isActive(child.href));
                const isOpen = openMenus[item.title] ?? isActiveParent;

                return (
                  <li key={item.title}>
                    <div
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActiveParent
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground',
                        state.language === 'ar' && 'flex-row-reverse',
                        collapsed && 'justify-center'
                      )}
                    >
                      {/* NavLink for parent (navigates to /employee) */}
                      <NavLink
                        to={item.href!}
                        onClick={() => {
                          dispatch({ type: 'SET_PAGE_TITLE', payload: item.title });
                          onClose();
                        }}
                        className={cn(
                          'flex items-center gap-3 flex-1',
                          collapsed && 'justify-center'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>

                      {/* Chevron icon for toggling submenu */}
                      {!collapsed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent NavLink navigation
                            setOpenMenus((prev) => ({
                              ...prev,
                              [item.title]: !prev[item.title],
                            }));
                          }}
                          className="ml-2"
                        >
                          {isOpen ? <ChevronDown size={16} /> : <ArrowRight size={16} />}
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    {!collapsed && isOpen && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.children.map((subItem) => (
                          <li key={subItem.href}>
                            <NavLink
                              to={subItem.href}
                              onClick={() => {
                                dispatch({
                                  type: 'SET_PAGE_TITLE',
                                  payload: subItem.title,
                                });
                                onClose();
                              }}
                              className={cn(
                                'block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                isActive(subItem.href)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground'
                              )}
                            >
                              {subItem.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              // If item has no children
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      dispatch({ type: 'SET_PAGE_TITLE', payload: item.title });
                      onClose();
                    }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground',
                      state.language === 'ar' && 'flex-row-reverse',
                      collapsed && 'justify-center'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};



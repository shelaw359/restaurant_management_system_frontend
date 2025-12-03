// src/config/navigation.ts

import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  Armchair, 
  Package, 
  Calendar, 
  CreditCard, 
  Settings,
  ChefHat,
  ClipboardList
} from 'lucide-react';
import { UserRole } from '../types/auth.types';

export interface NavItem {
  name: string;
  path: string;
  icon: any;
  roles: UserRole[];
  badge?: string;
}

export const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.WAITER, UserRole.CHEF],
  },
  {
    name: 'Staff',
    path: '/staff',
    icon: Users,
    roles: [UserRole.ADMIN, UserRole.OWNER],
  },
  {
    name: 'Menu',
    path: '/menu',
    icon: UtensilsCrossed,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    name: 'Orders',
    path: '/orders',
    icon: ClipboardList,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.WAITER, UserRole.CHEF],
  },
  {
    name: 'Tables',
    path: '/tables',
    icon: Armchair,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.WAITER],
  },
  {
    name: 'Inventory',
    path: '/inventory',
    icon: Package,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    name: 'Reservations',
    path: '/reservations',
    icon: Calendar,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    name: 'Payments',
    path: '/payments',
    icon: CreditCard,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    name: 'Kitchen',
    path: '/kitchen',
    icon: ChefHat,
    roles: [UserRole.CHEF],
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
    roles: [UserRole.ADMIN, UserRole.OWNER],
  },
];
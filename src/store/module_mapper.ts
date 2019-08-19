import * as Employee from '@/store/employee';
import * as Search from '@/store/search';

export type StateTree = Employee.StateTree & Search.StateTree;

export type RootState = Employee.RootState & Search.RootState;

export type ActionTree = Employee.ActionTree & Search.ActionTree;

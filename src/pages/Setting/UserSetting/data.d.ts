export type UserListParams = {
  key?: number;
  userName?: string;
  userPassword?: string;
  userLevel?: string;

  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type UserListItem = {
  key: number;
  userName: string;
  userPassword: string;
  userLevel: string;
  createTime: string;
};

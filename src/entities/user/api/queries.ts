import { queryOptions, useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/entities/user/api/requests';

export const userInfoQueryOptions = queryOptions({
  queryKey: ['userInfo'],
  queryFn: getUserInfo,
});
export const useUserInfo = () => {
  return useQuery(userInfoQueryOptions);
};

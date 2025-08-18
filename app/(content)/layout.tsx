import ContentLayout from '@/app/ui/layout/ContentLayout';
// import { getUserInfo } from '@/entities/user/api/requests';

const dummyGetUserMenu = async () => {
  // Simulating a user menu fetch, replace with actual API call
  return Promise.resolve({
    data: [
      {
        type: 'item',
        key: 1,
        name: 'Fleet Map',
        href: '/fleet-map',
      },
      {
        type: 'group',
        key: 2,
        name: 'Monitoring',
        href: '/monitoring',
        children: [
          {
            type: 'item',
            key: '2-1',
            categoryName: 'Monitoring',
            name: 'Sites',
            href: '/sites',
          },
          {
            type: 'item',
            key: '2-2',
            categoryName: 'Monitoring',
            name: 'Device',
            href: '/device',
          },
        ],
      },
      {
        key: 4,
        type: 'item',
        name: 'Real-time Alarms',
        href: '/alarms',
      },
    ],
  });
};

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 유저정보에 따른 메뉴 가져와야 함
  const userMenu = await dummyGetUserMenu();

  return <ContentLayout menu={userMenu.data}>{children}</ContentLayout>;
}

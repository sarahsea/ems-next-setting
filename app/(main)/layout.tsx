import MainLayout from "@/app/layout/MainLayout";
import { getUserInfo } from "@/entities/user/api/requests";

const dummyGetUserMenu = async () => {
  // Simulating a user menu fetch, replace with actual API call
  return Promise.resolve({
    data: [
      {
        id: 1,
        pageId: 1,
        categoryId: 1,
        categoryName: "Fleet Map",
        name: "Fleet Map",
      },
      {
        id: 2,
        pageId: 2,
        categoryId: 2,
        categoryName: "Monitoring",
        name: "Sites",
      },
      {
        id: 3,
        pageId: 3,
        categoryId: 2,
        categoryName: "Monitoring",
        name: "Devices",
      },
      {
        id: 4,
        pageId: 4,
        categoryId: 3,
        categoryName: "Alarms",
        name: "Real-time Alarms",
      },
    ],
  });
};

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userMenu = await dummyGetUserMenu();

  return <MainLayout menu={userMenu.data}>{children}</MainLayout>;
}

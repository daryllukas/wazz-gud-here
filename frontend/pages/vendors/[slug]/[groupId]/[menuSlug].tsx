import { GetServerSideProps, NextPage } from 'next';
import client from '../../../../src/lib/apollo-client';
import { getMenuItemsByGroup } from '../../../../src/graphql/queries';
import { AppProps } from 'next/app';
import { MenuListItem } from '../../../../src/components/MenuListItem';
import Head from 'next/head';

interface MenuGroup {
  name: string;
  vendor: string;
  featuredImage: string;
  items: Array<any>;
}

interface MenuProps extends AppProps {
  menu: MenuGroup;
}

const MenuPage: NextPage<MenuProps> = (props) => {
  const { menu } = props;

  return (
    <div className="container mx-auto overflow-hidden rounded-xl bg-white">
      <Head>
        <title>Wazz Gud @ {menu.vendor} | {menu.name}</title>
        <meta
          name="description"
          content="Check out the food and menu from your favorite local pubs and restaurants"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="flex flex-col h-48 items-start justify-center bg-cover bg-center bg-no-repeat pl-6"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${menu.featuredImage})`,
        }}
      >
        <h1 className="text-5xl font-extrabold uppercase text-white">
          {menu.name}
        </h1>
        <h2 className="text-2xl font-extrabold uppercase text-white">
          {menu.vendor}
        </h2>
      </div>
      <div>
        {menu.items.map((item) => (
          <MenuListItem
            key={item.id}
            menuItem={{
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              featuredImage: item.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { data } = await client.query({
    query: getMenuItemsByGroup,
    variables: { menuGroupId: params?.groupId as string },
  });
  let groupData = data.menuGroup.data;
  if (!groupData) {
    return {
      notFound: true,
    };
  }

  let menuItems = groupData.attributes?.menu_items.data?.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes?.name,
      description: item.attributes?.description,
      price: item.attributes?.price,
      image: item.attributes?.featuredImage.data?.attributes.url || null,
    };
  });

  let menu: MenuGroup = {
    name: groupData.attributes?.name || '',
    vendor: groupData.attributes?.vendor.data?.attributes?.name || '',
    featuredImage:
      groupData.attributes?.featuredImage.data?.attributes.url ||
      '/no-image.png',
    items: menuItems || [],
  };

  return {
    props: {
      menu,
    },
  };
};

export default MenuPage;

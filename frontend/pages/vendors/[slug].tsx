import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { AppProps } from 'next/app';
import { MenuGroupCard } from '../../src/components/MenuGroupCard';
import { getVendor } from '../../src/graphql/queries';
import client from '../../src/lib/apollo-client';
import { SpecialsCard } from '../../src/components/SpecialsCard';
import Head from 'next/head';

interface VendorProps extends AppProps {
  vendor: Vendor;
}

interface Specials {
  name: string;
  items: any;
}

interface Vendor {
  id: any;
  name: string;
  address: string;
  phone: string;
  avatar: string;
  slug: string;
  menuGroups: Array<any>;
  specials: Specials;
}

const VendorPage: NextPage<VendorProps> = (props) => {
  const { vendor } = props;

  return (
    <div className="container space-y-10 p-5">
      <Head>
        <title>Wazz Gud @ {vendor.name}</title>
        <meta
          name="description"
          content="Check out the food and menu from your favorite local pubs and restaurants"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex flex-wrap items-center justify-center gap-4 px-2 sm:px-0 md:flex-nowrap md:justify-between">
        <div
          className="flex-none bg-cover bg-center rounded-full w-20 h-20 md:w-32 md:h-32"
          style={{
            backgroundImage: `url(${vendor.avatar})`,
          }}
        ></div>
        <div className="flex-auto self-center text-white text-center sm:text-left">
          <p className="text-2xl font-bold">{vendor.name}</p>
          <p className="text-xl">{vendor.address}</p>
          <p className="text-base">{vendor.phone}</p>
        </div>
      </header>
      <div className="rounded-lg bg-white p-4 md:p-8 space-y-10">
        {vendor.specials && (
          <div className="">
            <p className=" text-xl font-semibold mb-4">
              {vendor.specials.name}
            </p>
            <div className="flex overflow-x-scroll lg:overflow-auto">
              {vendor.specials.items?.map((item: any) => (
                <SpecialsCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  featuredImage={item.image || undefined}
                />
              ))}
            </div>
          </div>
        )}
        <div className="w-full">
          <p className=" text-xl font-semibold mb-4">Browse Menu</p>
          <div className="flex flex-wrap">
            {vendor.menuGroups.map((group) => (
              <MenuGroupCard
                key={group.id}
                id={group.id}
                title={group.name}
                vendorSlug={vendor.slug}
                backgroundImg={group.image || undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const { data } = await client.query({
    query: getVendor,
    variables: { slug: params?.slug as string },
  });

  let vendorData = data.vendors.data[0];
  if (!vendorData) {
    return {
      notFound: true,
    };
  }
  let address = '';
  if (vendorData.attributes?.information.contact.address) {
    address =
      vendorData.attributes.information.contact.address +
      ', ' +
      vendorData.attributes.city.data.attributes.name;
  }
  let specials: any = null;
  if (vendorData.attributes?.specials_menu.data) {
    specials = {};
    specials['name'] =
      vendorData.attributes?.specials_menu.data?.attributes.name || '';
    specials['items'] =
      vendorData.attributes?.specials_menu.data?.attributes.menu_items.data.map(
        (i: any) => ({
          id: i.id,
          name: i.attributes.name,
          price: i.attributes.price,
          image: i.attributes.featuredImage.data?.attributes.url || null,
        })
      ) || [];
  }

  let vendor: Vendor = {
    id: vendorData.id || '',
    name: (vendorData.attributes?.name as string) || '',
    address,
    phone: (vendorData.attributes?.information.contact.phone as string) || '',
    slug: (vendorData.attributes?.slug as string) || '',
    avatar: (vendorData.attributes?.avatar.data.attributes.url as string) || '',
    menuGroups: [],
    specials,
  };

  let menuGroups = vendorData.attributes?.menu_groups.data;
  if (menuGroups && menuGroups.length > 0) {
    menuGroups = menuGroups.map((group: any) => {
      return {
        id: group.id,
        name: group.attributes.name,
        image: group.attributes.featuredImage.data?.attributes.url || null,
      };
    });
  }
  vendor['menuGroups'] = menuGroups || [];

  return {
    props: {
      vendor,
    },
  };
};

export default VendorPage;

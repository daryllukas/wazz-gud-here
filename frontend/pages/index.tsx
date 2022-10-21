import type { GetServerSideProps, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { VendorCard } from '../src/components/VendorCard';
import { getVendors } from '../src/graphql/queries';
import client from '../src/lib/apollo-client';
import styles from '../src/styles/Home.module.css';

interface Vendor {
  id: any;
  name: string;
  description: string;
  slug: string;
  city: string;
  featuredImage: string;
}

interface HomeProps extends AppProps {
  vendors: Array<Vendor>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { vendors } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Wazz Gud Here</title>
        <meta name="description" content="Browse menus from your favorite local pubs and restaurants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container space-y-10 p-5">
        <div className="flex flex-wrap items-center justify-center gap-4 px-2 sm:px-0 md:flex-nowrap md:justify-between">
          <div className="flex flex-col gap-8">
            <div className=" text-white">
              <h1 className="text-5xl font-bold md:shrink-0 lg:text-7xl lg:leading-[64px]">
                Menus from your favorite restaurants and pubs...
              </h1>
              <p className="text-3xl uppercase mt-5">At your fingertips!</p>
            </div>
          </div>
          <div>
            <picture>
              <img
                className="max-h-96 w-full"
                src="./undraw_breakfast.svg"
                alt="Plate with pasta"
              />
            </picture>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 md:p-8 space-y-10">
          <div className="border-b-4">
            <p className=" text-5xl font-semibold mb-4">Explore Places</p>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 mt-24 px-4">
            {vendors.map((vendor: Vendor) => (
              <VendorCard
                key={vendor.id}
                id={vendor.id}
                name={vendor.name}
                description={vendor.description}
                city={vendor.city}
                slug={vendor.slug}
                featuredImage={vendor.featuredImage || undefined}
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
    query: getVendors,
    variables: { slug: params?.slug as string },
  });

  const vendorData = data.vendors.data || [];

  if (vendorData.length === 0) {
    return {
      notFound: true,
    };
  }

  let vendors = vendorData.map((data: any) => ({
    id: data.id,
    name: data.attributes?.name,
    description: data.attributes?.information.description,
    slug: data.attributes?.slug,
    city: data.attributes?.city.data.attributes?.name,
    featuredImage: data.attributes?.avatar.data.attributes?.url,
  }));

  return {
    props: {
      vendors,
    },
  };
};

export default Home;

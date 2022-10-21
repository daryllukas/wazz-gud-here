import Link from 'next/link';

export type MenuGroupCardProps = {
  id: number;
  title: string;
  vendorSlug: string;
  backgroundImg?: string;
};

export const MenuGroupCard: React.FC<MenuGroupCardProps> = ({
  id,
  title,
  vendorSlug,
  backgroundImg = '/no-image.png',
}) => {
  return (
    <Link
      href={{
        pathname: '/vendors/[vendorSlug]/[groupId]/[titleSlug]',
        query: {
          vendorSlug,
          groupId: id,
          titleSlug: encodeURIComponent(title),
        },
      }}
    >
      <a className="h-60 w-full overflow-hidden p-2 md:w-1/3">
        <div
          className="flex h-full items-center justify-center rounded-lg bg-cover bg-center shadow-md transition-opacity duration-300 hover:opacity-95"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImg})`,
          }}
        >
          <div className="text-3xl text-center font-extrabold uppercase text-white md:text-2xl lg:text-3xl">
            {title}
          </div>
        </div>
      </a>
    </Link>
  );
};

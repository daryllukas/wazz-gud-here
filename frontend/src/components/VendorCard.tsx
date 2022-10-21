import Link from "next/link";

interface VendorProps {
    id: string;
    name: string;
    description?: string;
    city: string;
    featuredImage?: string;
    slug: string;
  }


export const VendorCard: React.FC<VendorProps> = ({id, name, slug, city, description, featuredImage = '/no-image.png'}) => {
  return (
    <Link href={`/vendors/${slug}`}>
      <div className="overflow-hidden shadow-lg rounded-lg h-90 w-full cursor-pointer">
        <picture>
          <img
            alt={name}
            src={featuredImage}
            className="max-h-48 w-full object-cover"
          />
        </picture>
        <div className="bg-white w-full p-4">
          <p className="text-secondary text-md font-medium">@{slug}</p>

          <p className="text-primary text-xl font-medium mb-2">
            {name}
          </p>

          <p className="text-gray-400 font-light text-md">
            {description}
          </p>

          <div className="flex flex-wrap justify-starts items-center mt-4">
            <div className="text-xs mr-2 py-1.5 px-4 text-white bg-primary rounded-2xl">
              {city}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

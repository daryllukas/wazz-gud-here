import Link from 'next/link';

export type SpecialsCardProps = {
  id: number;
  name: string;
  description?: string;
  price: string;
  featuredImage?: string;
};

export const SpecialsCard: React.FC<SpecialsCardProps> = ({
  id,
  name,
  price,
  featuredImage = '/no-image.png',
}) => {
  return (
    <div key={id} className="h-full p-2 flex-none">
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 p-2 pt-0 shadow-md md:pt-8 lg:pt-2">
        <picture className="shrink-0">
          <img
            className="h-32 w-32 rounded-full object-cover"
            src={featuredImage}
            alt={name}
          />
        </picture>
        <div className="h-full flex-auto px-2 pt-8">
          <h3 className="text-sm md:text-lg font-bold text-gray-800">{name}</h3>
          <span className="text-base md:text-xl font-bold text-gray-800">
            ZMW {price}
          </span>
        </div>
      </div>
    </div>
  );
};

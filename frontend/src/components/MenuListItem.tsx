interface IMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  featuredImage?: string;
}

type MenuListItemProps = {
  menuItem: IMenuItem;
};

export const MenuListItem: React.FC<MenuListItemProps> = ({ menuItem }) => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 p-4">
      <picture>
        <img
          className="h-32 w-32 flex-none rounded-full object-cover"
          alt={menuItem.name}
          src={menuItem.featuredImage || '/no-image.png'}
        />
      </picture>
      <div className="flex-auto flex-col text-center md:text-left">
        <h3 className="text-lg font-bold text-gray-800">{menuItem.name}</h3>
        <p className="text-gray-600">{menuItem.description}</p>
      </div>
      <div className="w-32 shrink-0 text-lg font-bold text-gray-800 text-center md:text-left">
        ZMW {menuItem.price}
      </div>
    </div>
  );
};

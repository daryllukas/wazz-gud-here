import React, { PropsWithChildren, useContext, useState } from 'react';

export const ModalContext = React.createContext<{
  aboutModalVisible: boolean;
  setAboutModalVisible: Function;
}>({
  aboutModalVisible: false,
  setAboutModalVisible: () => null,
});

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ aboutModalVisible, setAboutModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const { aboutModalVisible, setAboutModalVisible } = useContext(ModalContext);
  return { aboutModalVisible, setAboutModalVisible };
};

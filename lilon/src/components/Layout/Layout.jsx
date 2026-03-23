import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import LeadModal from "../LeadModal/LeadModal";
import { headerData } from '../../data.json';
import { useState, useEffect, createContext, useContext } from "react";
import Preloader from "../Preloader/Preloader";
import CustomCursor from "../CustomCursor/CustomCursor";

// Create context for modal state
export const ModalContext = createContext();

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {isLoading ? <Preloader /> : (
        <>
          <CustomCursor />
          <Header data={headerData} />
          <Outlet />
          <LeadModal isOpen={isModalOpen} onClose={closeModal} />
        </>
      )}
    </ModalContext.Provider>
  )
}

export default Layout;

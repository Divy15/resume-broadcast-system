import { createContext, useContext, useState, type ReactNode } from 'react';
// 1. Import the library spinner of your choice
import { HashLoader } from 'react-spinners'; 

interface LoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}

      {/* 2. Render the Global Overlay when isLoading is true */}
      {isLoading && (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <HashLoader color="#4f46e5" size={60} />
          <p className="mt-4 text-white font-medium text-lg">Please wait...</p>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
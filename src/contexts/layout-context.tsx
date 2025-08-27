import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

interface LayoutContextType {
  showOverlay: (content: React.ReactNode) => void;
  hideOverlay: () => void;
  showActionSheet: (content: React.ReactNode) => void;
  hideActionSheet: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overlayContent, setOverlayContent] = useState<React.ReactNode | null>(null);
  const [actionSheetContent, setActionSheetContent] = useState<React.ReactNode | null>(null);

  const showOverlay = (content: React.ReactNode) => {
    setOverlayContent(content);
  };

  const hideOverlay = () => {
    setOverlayContent(null);
  };

  const showActionSheet = (content: React.ReactNode) => {
    setActionSheetContent(content);
  };

  const hideActionSheet = () => {
    setActionSheetContent(null);
  };

  const value = React.useMemo(
    () => ({ showOverlay, hideOverlay, showActionSheet, hideActionSheet }),
    []
  );

  return (
    <LayoutContext.Provider value={value}>
      {children}
      {overlayContent && createPortal(
        <div className="level-overlay active">{overlayContent}</div>,
        document.getElementById('overlay-root')!
      )}
      {actionSheetContent && createPortal(
        <div className="level-action-sheet">{actionSheetContent}</div>,
        document.getElementById('action-sheet-root')!
      )}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

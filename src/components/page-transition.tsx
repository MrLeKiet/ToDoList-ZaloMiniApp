import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation } from 'zmp-ui';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const nodeRef = useRef(null);

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={location.pathname}
                nodeRef={nodeRef}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <div ref={nodeRef} className="page">
                    {children}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default PageTransition;

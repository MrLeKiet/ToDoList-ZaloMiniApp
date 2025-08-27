import { NavLink, NavLinkProps } from "react-router-dom";

export interface TransitionLinkProps extends NavLinkProps {}

/**
 * Wrapper component for view transition enabled Links, to stabilize the API.
 * Uses the View Transitions API for smooth page transitions.
 */
export default function TransitionLink(props: TransitionLinkProps) {
  return <NavLink {...props} viewTransition />;
}

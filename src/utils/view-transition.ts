import { useNavigate } from "zmp-ui";

/**
 * Custom hook to handle view transitions
 */
export function useViewTransition() {
  const navigate = useNavigate();

  const startViewTransition = (path: string) => {
    if ('startViewTransition' in document) {
      // @ts-ignore - The View Transitions API is new and TypeScript doesn't have types for it yet
      document.startViewTransition(() => {
        navigate(path);
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      navigate(path);
    }
  };

  return startViewTransition;
}

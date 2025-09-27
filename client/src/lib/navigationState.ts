/**
 * Navigation state management for marketing website and demo modes
 */

export type AppMode = "marketing" | "demo";
export type DemoRole = "admin" | "user" | null;

export interface NavigationState {
  mode: AppMode;
  demoRole: DemoRole;
  currentSection?: string;
}

// Simple state management - can be enhanced with Context API later if needed
let navigationState: NavigationState = {
  mode: "marketing",
  demoRole: null,
  currentSection: "home"
};

export const getNavigationState = (): NavigationState => navigationState;

export const setNavigationState = (updates: Partial<NavigationState>): void => {
  navigationState = { ...navigationState, ...updates };
};

export const resetNavigationState = (): void => {
  navigationState = {
    mode: "marketing",
    demoRole: null,
    currentSection: "home"
  };
};

// Helper functions for common navigation actions
export const enterDemoMode = (): void => {
  setNavigationState({ mode: "demo" });
};

export const exitDemoMode = (): void => {
  setNavigationState({ mode: "marketing", demoRole: null });
};

export const setDemoRole = (role: DemoRole): void => {
  setNavigationState({ demoRole: role });
};

export const setCurrentSection = (section: string): void => {
  setNavigationState({ currentSection: section });
};
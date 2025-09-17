import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
        <span className="text-sm font-medium">Theme Toggle</span>
        <ThemeToggle />
      </div>
      <p className="text-sm text-muted-foreground">
        Click the button to toggle between light and dark themes. The preference is saved to localStorage.
      </p>
    </div>
  );
}
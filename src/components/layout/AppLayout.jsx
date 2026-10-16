export default function AppLayout({ children }) {
  return (
    <div className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden lg:flex-row">
      {children}
    </div>
  );
}

AppLayout.Main = function ({ children }) {
  return (
    <main className="custom-scrollbar min-h-0 grow overflow-y-auto p-6 lg:w-full">
      <div className="mx-auto flex flex-col lg:w-full">{children}</div>
    </main>
  );
};

AppLayout.Header = function ({ children }) {
  return (
    <header className="border-border/20 bg-background/50 sticky top-0 z-20 flex w-full items-center justify-between border-b px-6 py-4 backdrop-blur-sm">
      {children}
    </header>
  );
};

AppLayout.Navigation = function ({ children, isCollapsed }) {
  return (
    <aside
      className={`border-sidebar-border bg-sidebar text-sidebar-foreground relative z-30 border-t px-8 pb-10 pt-6 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] transition-["width"] duration-200 lg:order-first lg:flex lg:h-full lg:shrink-0 lg:flex-col lg:border-r lg:border-t-0 lg:px-4 lg:py-8 ${isCollapsed ? "lg:w-20" : "lg:w-72"} `}
    >
      {children}
    </aside>
  );
};

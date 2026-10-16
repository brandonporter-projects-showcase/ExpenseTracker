export default function Logo({ className = "", size = "md" }) {
  const sizes = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-20 w-auto",
    xl: "h-32 w-auto",
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="from-primary to-secondary absolute -inset-1 rounded-full bg-gradient-to-tr opacity-25 blur-sm"></div>
        <img
          src="/Logo.webp"
          alt="AI Expense Tracker Logo"
          className={`relative ${sizes[size]} rounded-full border object-contain drop-shadow-2xl`}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-primary text-xl font-bold tracking-tight">
          Fin<span className="text-secondary">Track</span>
        </span>
        <div className="via-primary/30 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent to-transparent"></div>
      </div>
    </div>
  );
}

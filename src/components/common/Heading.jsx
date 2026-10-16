export default function Heading({
  as = "h1",
  size,
  children,
  className = "",
  customStyles = false,
}) {
  const styles = {
    h1: "font-bold text-primary tracking-tight",
    h2: "font-medium text-primary",
    h3: "font-medium text-secondary",
    h4: "font-medium text-primary-foreground",
    h5: "font-semibold text-primary-foreground",
    h6: "font-semibold text-primary-foreground",
  };

  const sizes = {
    h1: "text-lg",
    h2: "text-md",
    h3: "text-base",
    h4: "text-sm",
    h5: "text-xs",
    h6: "text-2xs",
  };

  const Component = as;

  return (
    <Component
      className={`${customStyles || styles[as] || styles.h1} ${size ? sizes[size] : sizes[as]} ${className}`}
    >
      {children}
    </Component>
  );
}

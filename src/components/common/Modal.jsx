import AppButton from "./AppButton";
import Heading from "./Heading";

export default function Modal({ setShowForm, heading, children, input }) {
  function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) return;
    setShowForm(false);
  }

  return (
    <div
      className="bg-background/50 backdrop-blur-xs animate-fade-in fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-background w-full max-w-md rounded-xl p-6 shadow-2xl">
        <Heading as="h3" className="text-primary font-semibold">
          {heading}
        </Heading>
        {input}
        <div className="mt-6 flex justify-between gap-5">
          <AppButton
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setShowForm(false)}
            className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary flex-1 border bg-transparent duration-200"
          >
            Cancel
          </AppButton>

          {children}
        </div>
      </div>
    </div>
  );
}

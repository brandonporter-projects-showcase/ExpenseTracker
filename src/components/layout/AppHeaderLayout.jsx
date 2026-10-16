import Heading from "#components/common/Heading";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function AppHeaderLayout({ children, goBack }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex w-full items-center justify-center">
      {goBack && (
        <button
          onClick={() => navigate(goBack, { replace: true })}
          className="text-primary hover:bg-primary/10 absolute left-0 cursor-pointer rounded-xl p-2 transition-colors active:scale-90"
          aria-label="Go back"
        >
          <IoChevronBack className="text-2xl" />
        </button>
      )}

      <Heading
        as="h2"
        className="text-primary flex w-full flex-col items-center justify-center gap-4 text-center font-semibold tracking-tight"
      >
        {children}
      </Heading>
    </div>
  );
}

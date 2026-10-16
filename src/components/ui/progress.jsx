import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

function Progress({ className, children, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator
          className={
            value > 33 ? (value < 66 ? "bg-chart-5" : "bg-destructive") : ""
          }
        />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "bg-muted relative flex h-2 w-full items-center overflow-x-hidden rounded-full",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("bg-primary h-full transition-all", className)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "text-muted-foreground ml-auto text-xs tabular-nums",
        className,
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};

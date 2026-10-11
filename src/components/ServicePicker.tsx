import { useState } from "react";
import {
  Check,
  ChevronDown,
  Globe,
  Layout,
  Monitor,
  Building2,
  Database,
  Cloud,
  HelpCircle,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

/* ─── Types ────────────────────────────────────────────── */
export type ServiceGroup = {
  label: string;
  icon: typeof Globe;
  accent: "pulse" | "azure" | "azure-deep" | "violet" | "navy" | "teal" | "olive";
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    label: "Trident Pulse (Subscription)",
    icon: Cloud,
    accent: "pulse",
    items: [
      "Trident Pulse — Not sure of tier yet",
      "Pulse Starter — R499/mo",
      "Pulse Business — R899/mo",
      "Pulse Premium — R1,499/mo",
    ],
  },
  {
    label: "Website Development",
    icon: Globe,
    accent: "azure",
    items: [
      "Website Development — Not sure of tier yet",
      "Website — Starter (R8,500)",
      "Website — Business (R18,000)",
      "Website — Premium (R38,000+)",
    ],
  },
  {
    label: "Web Applications",
    icon: Layout,
    accent: "azure-deep",
    items: [
      "Web Applications — Not sure of tier yet",
      "Web App — MVP (R35,000)",
      "Web App — Business (R85,000)",
      "Web App — Platform (R180,000+)",
    ],
  },
  {
    label: "Desktop Applications",
    icon: Monitor,
    accent: "violet",
    items: [
      "Desktop Applications — Not sure of tier yet",
      "Desktop — Basic (R65,000)",
      "Desktop — Business (R140,000)",
      "Desktop — Enterprise (R300,000+)",
    ],
  },
  {
    label: "Enterprise Systems",
    icon: Building2,
    accent: "navy",
    items: [
      "Enterprise Systems — Not sure of tier yet",
      "Enterprise — Integration (R120,000)",
      "Enterprise — System Build (R280,000)",
      "Enterprise — Platform (R600,000+)",
    ],
  },
  {
    label: "ERP Solutions",
    icon: Database,
    accent: "teal",
    items: [
      "ERP Solutions — Not sure of tier yet",
      "ERP — Small Business (R150,000)",
      "ERP — Mid-Market (R450,000)",
      "ERP — Platform (R1.5M+)",
    ],
  },
  {
    label: "Cloud Hosting & Management",
    icon: Cloud,
    accent: "olive",
    items: [
      "Cloud Hosting — Not sure of plan yet",
      "Managed Hosting",
      "Managed Infrastructure",
      "Managed Operations",
      "Enterprise / Custom Hosting",
    ],
  },
  {
    label: "Something else",
    icon: HelpCircle,
    accent: "azure",
    items: ["Something else — I'll describe it below"],
  },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
  labelId: string;
  placeholder?: string;
};

export function ServicePicker({
  value,
  onChange,
  labelId,
  placeholder = "Select a service...",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`service-picker-trigger ${value ? "has-value" : ""}`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
        >
          <span className="service-picker-value">{value || placeholder}</span>
          <ChevronDown className="service-picker-chevron" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="service-picker-content" align="start" sideOffset={6}>
        <Command shouldFilter={true}>
          <CommandInput placeholder="Search services or plans..." />
          <CommandList>
            <CommandEmpty>No matching service found.</CommandEmpty>
            {serviceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <CommandGroup
                  key={group.label}
                  heading={group.label}
                  className={`service-picker-group service-picker-group-${group.accent}`}
                >
                  {group.items.map((item) => (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => {
                        onChange(item === value ? "" : item);
                        setOpen(false);
                      }}
                      className={`service-picker-item${value === item ? " is-selected" : ""}`}
                    >
                      <span className="service-picker-item-thumb" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="service-picker-item-label">
                        {item.includes(" — ") ? (
                          <>
                            <span className="service-picker-item-primary">
                              {item.split(" — ")[0]}
                            </span>
                            <span className="service-picker-item-secondary">
                              {item.split(" — ")[1]}
                            </span>
                          </>
                        ) : (
                          <span className="service-picker-item-primary">{item}</span>
                        )}
                      </span>
                      {value === item && <Check className="service-picker-item-check" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

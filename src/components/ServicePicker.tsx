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
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    label: "Trident Pulse (Subscription)",
    icon: Cloud,
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
                <CommandGroup key={group.label} heading={group.label}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => {
                        onChange(item === value ? "" : item);
                        setOpen(false);
                      }}
                      className="service-picker-item"
                    >
                      <Icon className="service-picker-item-icon" aria-hidden="true" />
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
                          item
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

'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';

export default function TooltipWrapper({ children }: { children: React.ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>;
}
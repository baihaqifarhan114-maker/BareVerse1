import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
export function Container({ className, ...props }) {
    return _jsx("div", { className: cn('container-wide', className), ...props });
}

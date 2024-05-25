import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref, rows = 2) => (
  <textarea
    {...props}
    ref={ref}
    className={`border border-gray-400 p-2 w-full rounded`}
    rows={rows}
  />
));
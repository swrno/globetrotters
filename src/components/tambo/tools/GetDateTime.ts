
import { z } from "zod";

export const getDateTimeSchema = z.object({});

export const getDateTimeAction = async () => {
  const now = new Date();
  return {
    iso: now.toISOString(),
    local: now.toLocaleString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };
};

export const educationQueryKeys = {
  all: ["admin", "education"] as const,
  list: () => [...educationQueryKeys.all, "list"] as const,
  details: () => [...educationQueryKeys.all, "detail"] as const,
  detail: (educationId: string) =>
    [...educationQueryKeys.details(), educationId] as const,
};

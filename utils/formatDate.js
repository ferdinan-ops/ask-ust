export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("En-US", {
    year: "numeric",
    month: "long",
  });
}

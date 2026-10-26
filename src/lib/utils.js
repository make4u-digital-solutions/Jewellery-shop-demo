// Class name helper
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Generate random order reference
export function generateOrderNumber() {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AUR-${dateStr}-${randomStr}`;
}

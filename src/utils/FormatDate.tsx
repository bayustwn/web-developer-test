export {};

declare global {
  interface String {
    toIDDate(): string;
  }
}

String.prototype.toIDDate = function (): string {
  const date = new Date(this.toString()); 
  if (isNaN(date.getTime())) return this.toString();

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
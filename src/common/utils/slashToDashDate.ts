export function slashToDashDate(dateString: any) {
  const parts = dateString.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export const capitalize = (text: string): string => {
  return text.replace(/(?:^|\s)\S/g, (newText) => newText.toUpperCase());
};
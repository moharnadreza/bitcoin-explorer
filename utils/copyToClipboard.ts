type Params = { value: string };

/**
 * copy given text to user's clipboard
 */
export const copyToClipboard = ({ value }: Params): void => {
  navigator.clipboard.writeText(value);
};

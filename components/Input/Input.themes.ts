export namespace Theme {
  type Colors = {
    wrapperBg: string;
    inputBg: string;
    inputBorder: string;
    inputFocusBg: string;
    inputFocusBorder: string;
    inputHoverBg: string;
    inputText: string;
    inputPlaceholder: string;
    inputDisabledText: string;
    inputInvalidBorder: string;
  };

  type Factory = (primaryColor: string) => Colors;

  // @TODO: add colors to theme
  export const getLight: Factory = (primaryColor) => ({
    wrapperBg: 'hsl(240, 14%, 99%)',
    inputBg: 'hsla(0, 0%, 100%, 0)',
    inputBorder: '$deepBlue5',
    inputFocusBg: 'hsl(0, 0%, 100%)',
    inputFocusBorder: 'hsl(68, 53%, 48%)',
    inputFocusBorderGhost: 'hsl(68, 53%, 56%)',
    inputHoverBg: 'hsla(68, 80%, 94%, 0.33)',
    inputHoverBorderGhost: 'hsla(208, 9%, 73%, 0.9)', // inputBorder with opacity
    inputText: 'hsla(0, 0%, 0%, 0.74)',
    inputTextFocused: 'hsl(0, 0%, 0%)',
    inputPlaceholder: 'hsla(0, 0%, 0%, 0.5)',
    inputDisabledText: 'hsla(0, 0%, 0%, 0.35)',
    inputDisabledBorder: 'hsla(208, 9%, 73%, 0.7)', // inputBorder with opacity
    inputInvalidBorder: '$red8',
  });

  export const getDark: Factory = (primaryColor) => ({
    wrapperBg: 'hsl(209, 38%, 12%)',
    inputBg: 'hsla(0, 0%, 100%, 0)',
    inputBorder: '$deepBlue6',
    inputFocusBg: 'hsla(0, 0%, 0%, 0.15)',
    inputFocusBorder: 'hsl(67, 78%, 84%)',
    inputFocusBorderGhost: 'hsl(67, 78%, 92%)',
    inputHoverBg: 'hsla(68, 81%, 80%, 0.1)',
    inputHoverBorderGhost: 'hsla(208, 11%, 45%, 0.9)', // inputBorder with opacity
    inputText: 'hsla(0, 0%, 100%, 0.8)',
    inputTextFocused: 'hsl(0, 0%, 100%)',
    inputPlaceholder: 'hsla(0, 0%, 100%, 0.51)',
    inputDisabledText: 'hsla(0, 0%, 100%, 0.35)',
    inputDisabledBorder: 'hsla(208, 11%, 45%, 0.7)', // inputBorder with opacity
    inputInvalidBorder: '$red8',
  });
}

// Array HEX colors for default profile avatars (JavaScript)
const avatarColors  = [
  "#1A73E8", "#0B8043", "#D50000", "#E67C73", // Google đậm
  "#FF6D00", "#FFAB00", "#FFD600", // Cam/Vàng đậm
  "#00897B", "#00BFA5", "#00ACC1", // Teal/Cyan đậm
  "#5E35B1", "#3949AB", "#6A1B9A", // Tím/Blue đậm
  "#D81B60", "#C2185B", // Pink/Red đậm
  "#43A047", "#2E7D32", // Green đậm
  "#EF5350", "#EC407A", // Coral/Magenta
  "#7B1FA2", "#8E24AA" // Purple đậm
];

const getRandomAvatarColor = (): string => {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
};

export default getRandomAvatarColor;

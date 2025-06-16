const randomColorName = () => {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default randomColorName;

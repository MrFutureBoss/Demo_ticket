export const takeCharaterFromFirstAndLastWord = (word: string) => {
  if (!word) return "";
  const words = word.trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  if (words.length === 0) return "";
  if (words.length === 1) {
    // Nếu chỉ có 1 từ, lấy 2 ký tự đầu
    return words[0].substring(0, 2).toUpperCase();
  }
  // Nếu có nhiều từ, lấy ký tự đầu của từ đầu và từ cuối
  const firstChar = words[0].substring(0, 1);
  const lastChar = words[words.length - 1].substring(0, 1);
  return (firstChar + lastChar).toUpperCase();
};

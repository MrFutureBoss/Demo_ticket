import DOMPurify from 'dompurify';

const readHTML = (html: string) => {
  if (!html) return '';
  return DOMPurify.sanitize(html);
};

export default readHTML;
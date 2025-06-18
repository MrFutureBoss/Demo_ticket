import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

const readHTML = (html: string) => {
  if (!html) return '';
  try {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return parse(sanitizedHTML);
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return html;
  }
};

export default readHTML;


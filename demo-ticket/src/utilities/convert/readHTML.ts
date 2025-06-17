import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const readHTML = (html: string) => {
    // Sanitize HTML to prevent XSS attacks
    const sanitizedHTML = DOMPurify.sanitize(html);
    
    // Parse HTML string into React elements
    const parsedHTML = parse(sanitizedHTML);
    
    return parsedHTML;
};

export default readHTML;
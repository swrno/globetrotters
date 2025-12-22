import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";


interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ 
  content, 
  className = "" 
}) => {
  const [htmlContent, setHtmlContent] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);


  // Configure marked with basic settings
  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }, []);

  // Convert markdown to HTML and sanitize
  useEffect(() => {
    const parseAndSanitize = async () => {
      try {
        const rawHTML = marked.parse(content) as string;
        const sanitized = DOMPurify.sanitize(rawHTML, { ADD_TAGS: ['u'] });
        setHtmlContent(sanitized);
      } catch (error) {
        console.error("Error parsing markdown:", error);
        setHtmlContent("<p>Error rendering content</p>");
      }
    };

    if (content) {
      parseAndSanitize();
    }
  }, [content]);

  // Apply styling to code blocks and render Mermaid diagrams
  useEffect(() => {
    if (!containerRef.current || !htmlContent) return;

    // Simple timeout to ensure DOM is ready
    setTimeout(async () => {
      if (!containerRef.current) return;
      
      const codeBlocks = containerRef.current.querySelectorAll("pre code");
      
      for (const block of Array.from(codeBlocks)) {
        const codeElement = block as HTMLElement;
        const preElement = codeElement.parentElement as HTMLElement;
        const text = codeElement.textContent || codeElement.innerText || "";
        
        if (!text.trim()) continue;
        
        // Extract language from class attribute (e.g., "language-javascript")
        const languageClass = codeElement.className;
        const languageMatch = languageClass.match(/language-(\w+)/);
        const language = languageMatch ? languageMatch[1] : '';
        
       

      }
    }, 1);
  }, [htmlContent]);

  // Helper function to apply code block styling with copy button
  const applyCodeBlockStyling = (preElement: HTMLElement, codeElement: HTMLElement, text: string, language: string = '') => {
    // Apply minimal gray background styling and relative positioning
    if (preElement) {

      preElement.style.padding = '1rem';
      preElement.style.paddingTop = '2.5rem'; // Make room for copy button
      preElement.style.borderRadius = '4px';
      preElement.style.border = '1px solid #e0e0e0';
      preElement.style.fontFamily = 'monospace';
      preElement.style.fontSize = '14px';
      preElement.style.lineHeight = '1.4';
      preElement.style.color = '#333';
      preElement.style.position = 'relative';
      
      // Create language label (if language is available)
      if (language) {
        const languageLabel = document.createElement('span');
        languageLabel.innerHTML = language;
        languageLabel.style.position = 'absolute';
        languageLabel.style.top = '8px';
        languageLabel.style.left = '8px';
        languageLabel.style.padding = '2px 6px';
        languageLabel.style.fontSize = '11px';
        languageLabel.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        languageLabel.style.color = '#666';
        languageLabel.style.borderRadius = '3px';
        languageLabel.style.fontFamily = 'monospace';
        languageLabel.style.textTransform = 'uppercase';
        languageLabel.style.fontWeight = 'bold';
        languageLabel.style.letterSpacing = '0.5px';
        
        preElement.appendChild(languageLabel);
      }
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.innerHTML = 'Copy';
      copyButton.style.position = 'absolute';
      copyButton.style.top = '8px';
      copyButton.style.right = '8px';
      copyButton.style.padding = '4px 8px';
      copyButton.style.fontSize = '12px';
      copyButton.style.backgroundColor = '#fff';
      copyButton.style.border = '1px solid #ccc';
      copyButton.style.borderRadius = '3px';
      copyButton.style.cursor = 'pointer';
      copyButton.style.color = '#333';
      copyButton.style.fontFamily = 'inherit';
      
      // Copy functionality
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(text);
          copyButton.innerHTML = 'Copied!';
          copyButton.style.backgroundColor = '#4caf50';
          copyButton.style.color = 'white';
          copyButton.style.borderColor = '#4caf50';
          
          setTimeout(() => {
            copyButton.innerHTML = 'Copy';
            copyButton.style.backgroundColor = '#fff';
            copyButton.style.color = '#333';
            copyButton.style.borderColor = '#ccc';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          copyButton.innerHTML = 'Failed';
          setTimeout(() => {
            copyButton.innerHTML = 'Copy';
          }, 2000);
        }
      });
      
      // Hover effects
      copyButton.addEventListener('mouseenter', () => {
        if (copyButton.innerHTML === 'Copy') {
          copyButton.style.backgroundColor = '#f0f0f0';
        }
      });
      
      copyButton.addEventListener('mouseleave', () => {
        if (copyButton.innerHTML === 'Copy') {
          copyButton.style.backgroundColor = '#fff';
        }
      });
      
      preElement.appendChild(copyButton);
    }
    
    // Keep code element simple with default styling
    codeElement.style.backgroundColor = 'transparent';
    codeElement.style.fontFamily = 'monospace';
    codeElement.style.fontSize = '14px';
    codeElement.style.color = '#333';
    
    // Just use plain text, no syntax highlighting
    codeElement.textContent = text;
  };

  return (
    <article
      className={`

        prose max-w-none text-base
        prose-headings:text-gray-900 prose-headings:font-black
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:text-base
        prose-strong:text-gray-900 prose-strong:font-semibold prose-strong:text-base
        prose-em:text-gray-600 prose-em:italic prose-em:text-base
        prose-blockquote:text-gray-600 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-blockquote:text-base
        prose-ul:text-gray-700 prose-ul:text-base prose-ol:text-gray-700 prose-ol:text-base
        prose-li:text-gray-700 prose-li:marker:text-gray-500 prose-li:text-base
        prose-table:border-gray-300 prose-table:border prose-table:text-base
        prose-th:p-3  prose-th:text-gray-900 prose-th:font-semibold prose-th:border-gray-300 prose-th:text-base
        prose-td:p-3 prose-td:border-gray-300 prose-td:text-gray-700 prose-td:text-base
        prose-code:text-base
        ${className}
      `}
    >
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default Markdown;
// Container Component JavaScript - Renders content dynamically

document.addEventListener('DOMContentLoaded', function() {
    const containerContent = document.getElementById('containerContent');
    
    // Function to render content from schema
    function renderContent(content) {
        if (!content) return;
        
        // Clear existing content
        containerContent.innerHTML = '';
        
        // Handle different content types
        if (typeof content === 'string') {
            // If content is HTML string, render it directly
            containerContent.innerHTML = content;
        } else if (Array.isArray(content)) {
            // If content is array, render each item
            content.forEach(item => {
                const element = document.createElement('div');
                if (typeof item === 'string') {
                    element.innerHTML = item;
                } else if (typeof item === 'object') {
                    // Handle structured content objects
                    if (item.type === 'text') {
                        const p = document.createElement('p');
                        p.textContent = item.text || item.content;
                        element.appendChild(p);
                    } else if (item.type === 'html') {
                        element.innerHTML = item.html || item.content;
                    }
                }
                containerContent.appendChild(element);
            });
        } else if (typeof content === 'object') {
            // Handle structured content object
            if (content.html) {
                containerContent.innerHTML = content.html;
            } else if (content.text) {
                containerContent.textContent = content.text;
            }
        }
    }
    
    // Example: Render content if provided via data attribute or global variable
    const container = document.getElementById('mainContainer');
    const contentData = container.getAttribute('data-content');
    
    if (contentData) {
        try {
            const parsedContent = JSON.parse(contentData);
            renderContent(parsedContent);
        } catch (e) {
            // If not JSON, treat as HTML string
            renderContent(contentData);
        }
    }
    
    // Expose render function globally for external use
    window.renderContainerContent = renderContent;
});

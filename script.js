// Container Component JavaScript - Renders content dynamically

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('mainContainer');
    const containerContent = document.getElementById('containerContent');
    
    // Function to apply styling from config
    function applyStyling(styling) {
        if (!styling) return;
        
        if (styling.borderColor) {
            container.style.borderColor = styling.borderColor;
        }
        if (styling.borderWidth) {
            container.style.borderWidth = styling.borderWidth;
        }
        if (styling.borderRadius) {
            container.style.borderRadius = styling.borderRadius;
        }
        if (styling.padding) {
            container.style.padding = styling.padding;
        }
        if (styling.minHeight) {
            container.style.minHeight = styling.minHeight;
        }
        if (styling.boxShadow) {
            container.style.boxShadow = styling.boxShadow;
        }
    }
    
    // Function to render content items as table
    function renderItemsAsTable(items) {
        if (!items || !Array.isArray(items) || items.length === 0) return '';
        
        // Get all unique keys from items to create table headers
        const allKeys = new Set();
        items.forEach(item => {
            Object.keys(item).forEach(key => allKeys.add(key));
        });
        const headers = Array.from(allKeys);
        
        let tableHTML = '<table class="content-table"><thead><tr>';
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
        
        items.forEach(item => {
            tableHTML += '<tr>';
            headers.forEach(header => {
                const value = item[header] || '';
                tableHTML += `<td>${value}</td>`;
            });
            tableHTML += '</tr>';
        });
        
        tableHTML += '</tbody></table>';
        return tableHTML;
    }
    
    // Function to render content from schema
    function renderContent(content) {
        if (!content) return;
        
        // Clear existing content
        containerContent.innerHTML = '';
        
        // Handle different content types
        if (typeof content === 'string') {
            containerContent.innerHTML = content;
        } else if (Array.isArray(content)) {
            // If content is array of objects, render as table
            if (content.length > 0 && typeof content[0] === 'object') {
                containerContent.innerHTML = renderItemsAsTable(content);
            } else {
                // If array of strings
                content.forEach(item => {
                    const element = document.createElement('div');
                    element.innerHTML = typeof item === 'string' ? item : JSON.stringify(item);
                    containerContent.appendChild(element);
                });
            }
        } else if (typeof content === 'object') {
            // Handle structured content object
            if (content.type === 'array' && content.items) {
                // Render items array
                if (Array.isArray(content.items) && content.items.length > 0) {
                    if (typeof content.items[0] === 'object') {
                        containerContent.innerHTML = renderItemsAsTable(content.items);
                    } else {
                        content.items.forEach(item => {
                            const element = document.createElement('div');
                            element.innerHTML = typeof item === 'string' ? item : JSON.stringify(item);
                            containerContent.appendChild(element);
                        });
                    }
                }
            } else if (content.html) {
                containerContent.innerHTML = content.html;
            } else if (content.text) {
                containerContent.textContent = content.text;
            }
        }
    }
    
    // Function to initialize from full config object
    function initializeFromConfig(config) {
        if (!config) return;
        
        // Apply styling
        if (config.styling) {
            applyStyling(config.styling);
        }
        
        // Render content
        if (config.content) {
            renderContent(config.content);
        }
    }
    
    // Check for config in data attribute or global variable
    const configData = container.getAttribute('data-config');
    
    if (configData) {
        try {
            const parsedConfig = JSON.parse(configData);
            initializeFromConfig(parsedConfig);
        } catch (e) {
            console.error('Error parsing config:', e);
        }
    }
    
    // Check for global config variable
    if (window.containerConfig) {
        initializeFromConfig(window.containerConfig);
    }
    
    // Expose functions globally for external use
    window.renderContainerContent = renderContent;
    window.applyContainerStyling = applyStyling;
    window.initializeContainer = initializeFromConfig;
});

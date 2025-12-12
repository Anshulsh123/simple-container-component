// Container Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const containerContent = document.getElementById('containerContent');
    
    toggleBtn.addEventListener('click', function() {
        containerContent.classList.toggle('hidden');
        
        if (containerContent.classList.contains('hidden')) {
            toggleBtn.textContent = 'Show';
        } else {
            toggleBtn.textContent = 'Toggle';
        }
    });
    
    // Add some interactive animations
    const container = document.getElementById('mainContainer');
    
    container.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    container.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

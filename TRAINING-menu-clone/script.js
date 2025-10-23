// Menu Management Web App JavaScript

// Global variable to track editing mode
let currentEditingItemId = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

// Setup quick action links for availability
function setupAvailabilityQuickActions() {
    const quickActionLinks = document.querySelectorAll('.quick-action-link');
    
    quickActionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.dataset.action;
            const target = this.dataset.target;
            
            if (target === 'days') {
                const dayButtons = document.querySelectorAll('.availability-toggle-btn[data-day]');
                if (action === 'select-all') {
                    dayButtons.forEach(btn => btn.classList.add('active'));
                } else if (action === 'none') {
                    dayButtons.forEach(btn => btn.classList.remove('active'));
                }
            } else if (target === 'meals') {
                const mealButtons = document.querySelectorAll('.availability-toggle-btn[data-meal]');
                if (action === 'select-all') {
                    mealButtons.forEach(btn => btn.classList.add('active'));
                } else if (action === 'none') {
                    mealButtons.forEach(btn => btn.classList.remove('active'));
                }
            }
        });
    });
}

function initializeApp() {
    // Set up event listeners
    setupSearchFunctionality();
    setupThemeToggle();
    setupResponsiveNavigation();
    setupTabFunctionality();
    setupBulkSelection();
    setupBulkEditModal();
    setupViewToggle();
    setupNewMenuDropdown();
    setupMenuItemModal();
    setupAvailabilityQuickActions();
    
    // Initialize any other components
    console.log('Menu app initialized');
}


// Search Functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-input input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            handleSearch(query);
        });
        
        // Keyboard shortcut for search (⌘+K)
        document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

function handleSearch(query) {
    if (query.length > 2) {
        console.log(`Searching for: ${query}`);
        // Implement search functionality here
        // This could filter navigation items, search through campaigns, etc.
    }
}

// Theme Toggle
function setupThemeToggle() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Responsive Navigation
function setupResponsiveNavigation() {
    // Handle mobile navigation if needed
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Check if we're on mobile
    function checkMobile() {
        return window.innerWidth <= 768;
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (checkMobile()) {
            // Mobile-specific behavior
            console.log('Mobile view detected');
        } else {
            // Desktop behavior
            console.log('Desktop view detected');
        }
    });
}

// Button Interactions
function setupButtonInteractions() {
    // Primary button (Create Campaign)
    const primaryButton = document.querySelector('.button.primary');
    if (primaryButton) {
        primaryButton.addEventListener('click', function() {
            console.log('Create Menu clicked');
            // Handle campaign creation
        });
    }
    
    // Secondary button (Settings)
    const secondaryButton = document.querySelector('.button.secondary');
    if (secondaryButton) {
        secondaryButton.addEventListener('click', function() {
            console.log('Settings clicked');
            // Handle settings
        });
    }
    
    // Help button
    const helpButton = document.querySelector('.help-button');
    if (helpButton) {
        helpButton.addEventListener('click', function() {
            console.log('Help clicked');
            // Handle help
        });
    }
}

// Navigation Item Interactions
function setupNavigationInteractions() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation
            const navText = this.textContent.trim();
            handleNavigation(navText);
        });
    });
}

function handleNavigation(navItem) {
    console.log(`Navigated to: ${navItem}`);
    
    switch(navItem) {
        case 'Home':
            // Handle home navigation
            break;
        case 'My Profile':
            // Handle profile navigation
            break;
        case 'EDM Marketing':
            // Handle EDM Marketing navigation (already active)
            break;
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filter functionality
function setupFilterFunctionality() {
    const filterButton = document.querySelector('.filter-button');
    const filterPanel = document.querySelector('.filter-panel');
    const filterCategories = document.querySelectorAll('.filter-category');
    const filterContents = document.querySelectorAll('.filter-content');
    const clearAllButton = document.querySelector('.clear-all');
    const searchInput = document.querySelector('.search-input');
    const filterIndicator = document.querySelector('.filter-indicator');
    
    // Toggle filter panel
    if (filterButton && filterPanel) {
        filterButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = filterPanel.style.display !== 'none';
            
            console.log('Filter button clicked, isVisible:', isVisible);
            
            if (isVisible) {
                filterPanel.style.display = 'none';
                console.log('Hiding filter panel');
            } else {
                filterPanel.style.display = 'flex';
                console.log('Showing filter panel');
                
                // Ensure it's positioned correctly
                filterPanel.style.position = 'absolute';
                filterPanel.style.top = '100%';
                filterPanel.style.left = '0';
                filterPanel.style.zIndex = '1000';
            }
        });
    } else {
        console.log('Filter button or panel not found:', { filterButton, filterPanel });
    }
    
    // Close filter panel when clicking outside
    document.addEventListener('click', function(e) {
        if (filterPanel && !filterPanel.contains(e.target) && !filterButton.contains(e.target)) {
            filterPanel.style.display = 'none';
        }
    });
    
    // Switch filter categories
    filterCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryType = this.dataset.category;
            
            // Update active state
            filterCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            filterContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const targetContent = document.getElementById(categoryType + '-filters');
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
    
    // Clear all filters
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function() {
            // Uncheck all checkboxes
            const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Clear search
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Hide filter indicator
            if (filterIndicator) {
                filterIndicator.style.display = 'none';
            }
            
            // Hide filter panel
            if (filterPanel) {
                filterPanel.style.display = 'none';
            }
        });
    }
    
    // Update filter indicator when checkboxes change
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateFilterIndicator();
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            filterCampaigns(query);
            updateFilterIndicator();
        });
    }
    
    // Apply filters when checkboxes change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const query = searchInput ? searchInput.value.toLowerCase() : '';
            filterCampaigns(query);
        });
    });
}

function updateFilterIndicator() {
    const filterIndicator = document.querySelector('.filter-indicator');
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]:checked');
    const searchInput = document.querySelector('.search-input');
    
    const hasFilters = checkboxes.length > 0 || (searchInput && searchInput.value.trim() !== '');
    
    if (filterIndicator) {
        if (hasFilters) {
            filterIndicator.style.display = 'inline-block';
            filterIndicator.textContent = checkboxes.length;
        } else {
            filterIndicator.style.display = 'none';
        }
    }
}

function filterCampaigns(query) {
    const tableRows = document.querySelectorAll('.menu-table tbody tr');
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]:checked');
    
    tableRows.forEach(row => {
        const name = row.querySelector('.menu-name strong').textContent.toLowerCase();
        const price = row.querySelector('.price').textContent.toLowerCase();
        const category = row.querySelector('.category-tag').textContent.toLowerCase();
        const status = row.querySelector('.status-tag').textContent.toLowerCase();
        
        let shouldShow = true;
        
        // Apply status filters
        if (checkboxes.length > 0) {
            const statusMatches = Array.from(checkboxes).some(checkbox => {
                return checkbox.value === status;
            });
            shouldShow = statusMatches;
        }
        
        // Apply search query if provided
        if (query && shouldShow) {
            const matches = name.includes(query) || price.includes(query) || category.includes(query) || status.includes(query);
            shouldShow = matches;
        }
        
        row.style.display = shouldShow ? 'table-row' : 'none';
    });
}

// Dark Mode Toggle
function setupDarkModeToggle() {
    const profileToggle = document.getElementById('profile-toggle');
    
    if (profileToggle) {
        profileToggle.addEventListener('click', function() {
            // Toggle theme using data-theme attribute
            toggleTheme();
        });
    }
}

// Sort Dropdown
function setupSortDropdown() {
    const sortButton = document.querySelector('.sort-button');
    const sortOptions = document.querySelector('.sort-options');
    const sortLabel = document.querySelector('.sort-label');
    const sortOptionElements = document.querySelectorAll('.sort-option');
    
    if (sortButton && sortOptions) {
        // Toggle dropdown
        sortButton.addEventListener('click', function(e) {
            e.stopPropagation();
            sortOptions.style.display = sortOptions.style.display === 'none' ? 'block' : 'none';
        });
        
        // Handle option selection
        sortOptionElements.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                // Update label
                sortLabel.textContent = text;
                
                // Update active state
                sortOptionElements.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Hide dropdown
                sortOptions.style.display = 'none';
                
                // Here you would implement the actual sorting logic
                console.log('Sort by:', value);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!sortButton.contains(e.target) && !sortOptions.contains(e.target)) {
                sortOptions.style.display = 'none';
            }
        });
    }
}

// Trophy Button and Records Modal
function setupTrophyButton() {
    const trophyButton = document.getElementById('trophy-button');
    const recordsModal = document.getElementById('records-modal');
    const closeButton = document.getElementById('close-records');

    if (trophyButton && recordsModal) {
        // Open modal when trophy button is clicked
        trophyButton.addEventListener('click', function() {
            recordsModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close modal when close button is clicked
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                recordsModal.classList.remove('show');
                document.body.style.overflow = ''; // Restore scrolling
            });
        }

        // Close modal when clicking outside
        recordsModal.addEventListener('click', function(e) {
            if (e.target === recordsModal) {
                recordsModal.classList.remove('show');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && recordsModal.classList.contains('show')) {
                recordsModal.classList.remove('show');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
}

// Tab Functionality
function setupTabFunctionality() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle tab switching
            const tabText = this.textContent.trim();
            handleTabSwitch(tabText);
        });
    });
}

function handleTabSwitch(tabName) {
    console.log(`Switched to: ${tabName}`);
    
    switch(tabName) {
        case 'Quantity':
            // Handle quantity tab
            console.log('Showing quantity view');
            break;
        case 'Menu Lists':
            // Handle menu lists tab
            console.log('Showing menu lists view');
            break;
    }
}

// Bulk Selection Functionality
function setupBulkSelection() {
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const bulkActionsButton = document.getElementById('bulk-actions-button');
    
    // Category selection functionality
    categoryCheckboxes.forEach(categoryCheckbox => {
        categoryCheckbox.addEventListener('change', function() {
            const category = this.dataset.category;
            const isChecked = this.checked;
            
            // Find all rows in this category and toggle their checkboxes
            const categoryRows = getCategoryRows(category);
            categoryRows.forEach(row => {
                const checkbox = row.querySelector('.row-checkbox');
                if (checkbox) {
                    checkbox.checked = isChecked;
                }
            });
            
            updateBulkActionsButton();
        });
    });
    
    // Individual row selection
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCategoryCheckboxState(this);
            updateBulkActionsButton();
        });
    });
    
    function getCategoryRows(category) {
        const categoryHeader = document.querySelector(`[data-category="${category}"]`).closest('tr');
        const rows = [];
        let nextRow = categoryHeader.nextElementSibling;
        
        while (nextRow && !nextRow.classList.contains('category-header')) {
            rows.push(nextRow);
            nextRow = nextRow.nextElementSibling;
        }
        
        return rows;
    }
    
    function updateCategoryCheckboxState(changedCheckbox) {
        const row = changedCheckbox.closest('tr');
        const categoryHeader = findCategoryHeader(row);
        
        if (categoryHeader) {
            const categoryCheckbox = categoryHeader.querySelector('.category-checkbox');
            const categoryRows = getCategoryRows(categoryCheckbox.dataset.category);
            const checkedRows = categoryRows.filter(row => {
                const checkbox = row.querySelector('.row-checkbox');
                return checkbox && checkbox.checked;
            });
            
            if (checkedRows.length === 0) {
                categoryCheckbox.checked = false;
                categoryCheckbox.indeterminate = false;
            } else if (checkedRows.length === categoryRows.length) {
                categoryCheckbox.checked = true;
                categoryCheckbox.indeterminate = false;
            } else {
                categoryCheckbox.checked = false;
                categoryCheckbox.indeterminate = true;
            }
        }
    }
    
    function findCategoryHeader(row) {
        let currentRow = row.previousElementSibling;
        while (currentRow) {
            if (currentRow.classList.contains('category-header')) {
                return currentRow;
            }
            currentRow = currentRow.previousElementSibling;
        }
        return null;
    }
    
    function updateBulkActionsButton() {
        const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
        
        if (checkedCount > 0) {
            bulkActionsButton.style.display = 'flex';
            bulkActionsButton.querySelector('span')?.remove();
            const countSpan = document.createElement('span');
            countSpan.textContent = `(${checkedCount})`;
            bulkActionsButton.appendChild(countSpan);
        } else {
            bulkActionsButton.style.display = 'none';
        }
    }
}

// Bulk Edit Modal Functionality
function setupBulkEditModal() {
    const bulkActionsButton = document.getElementById('bulk-actions-button');
    const bulkEditModal = document.getElementById('bulk-edit-modal');
    const bulkConfigModal = document.getElementById('bulk-config-modal');
    const closeButton = document.getElementById('close-bulk-edit');
    const closeConfigButton = document.getElementById('close-bulk-config');
    const cancelButton = document.getElementById('cancel-bulk-edit');
    const backButton = document.getElementById('back-to-parameters');
    const applyButton = document.getElementById('apply-bulk-edit');
    const parameterOptions = document.querySelectorAll('.parameter-option');
    const selectedCountElement = document.getElementById('selected-count');
    const configSelectedCountElement = document.getElementById('config-selected-count');
    const configModalTitle = document.getElementById('config-modal-title');
    
    let currentParameter = null;
    
    // Open parameter selection modal
    if (bulkActionsButton && bulkEditModal) {
        bulkActionsButton.addEventListener('click', function() {
            const selectedItems = document.querySelectorAll('.row-checkbox:not(#select-all):checked');
            selectedCountElement.textContent = `${selectedItems.length} items selected`;
            bulkEditModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close parameter selection modal
    function closeParameterModal() {
        bulkEditModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Close configuration modal
    function closeConfigModal() {
        bulkConfigModal.classList.remove('show');
        document.body.style.overflow = '';
        resetConfigModal();
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closeParameterModal);
    }
    
    if (closeConfigButton) {
        closeConfigButton.addEventListener('click', closeConfigModal);
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', closeParameterModal);
    }
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            closeConfigModal();
            bulkEditModal.classList.add('show');
        });
    }
    
    // Close modals when clicking outside
    bulkEditModal.addEventListener('click', function(e) {
        if (e.target === bulkEditModal) {
            closeParameterModal();
        }
    });
    
    bulkConfigModal.addEventListener('click', function(e) {
        if (e.target === bulkConfigModal) {
            closeConfigModal();
        }
    });
    
    // Parameter selection
    parameterOptions.forEach(option => {
        option.addEventListener('click', function() {
            currentParameter = this.dataset.parameter;
            const selectedItems = document.querySelectorAll('.row-checkbox:not(#select-all):checked');
            
            // Update configuration modal
            configSelectedCountElement.textContent = `${selectedItems.length} items selected`;
            configModalTitle.textContent = `Configure ${this.textContent.trim()}`;
            
            // Show configuration modal
            showParameterConfig(currentParameter);
            closeParameterModal();
            bulkConfigModal.classList.add('show');
        });
    });
    
    function showParameterConfig(parameterType) {
        // Hide all config sections
        document.querySelectorAll('.config-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected config section
        const configSection = document.getElementById(`${parameterType}-config`);
        if (configSection) {
            configSection.style.display = 'block';
        }
    }
    
    // Apply changes
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            if (!currentParameter) return;
            
            const selectedItems = document.querySelectorAll('.row-checkbox:not(#select-all):checked');
            
            selectedItems.forEach(item => {
                const row = item.closest('tr');
                applyBulkChanges(row, currentParameter);
            });
            
            closeConfigModal();
            console.log(`Applied bulk changes to ${selectedItems.length} items for parameter: ${currentParameter}`);
        });
    }
    
    function applyBulkChanges(row, parameterType) {
        switch(parameterType) {
            case 'category':
                const newCategory = document.getElementById('new-category').value;
                const categoryTag = row.querySelector('.category-tag');
                if (categoryTag) {
                    categoryTag.textContent = newCategory;
                }
                break;
                
            case 'status':
                const newStatus = document.getElementById('new-status').value;
                const statusTag = row.querySelector('.status-tag');
                if (statusTag) {
                    statusTag.textContent = newStatus;
                    statusTag.className = `status-tag ${newStatus}`;
                }
                break;
                
            case 'days':
                const selectedDays = Array.from(document.querySelectorAll('.day-checkboxes input:checked'))
                    .map(input => input.value);
                const daysContainer = row.querySelector('.days-info');
                if (daysContainer && selectedDays.length > 0) {
                    daysContainer.innerHTML = selectedDays.map(day => 
                        `<span class="day-tag">${day}</span>`
                    ).join('');
                }
                break;
                
            case 'meal-periods':
                const selectedPeriods = Array.from(document.querySelectorAll('.period-checkboxes input:checked'))
                    .map(input => input.value);
                const periodsContainer = row.querySelector('.meal-periods');
                if (periodsContainer && selectedPeriods.length > 0) {
                    periodsContainer.innerHTML = selectedPeriods.map(period => 
                        `<span class="period-tag">${period}</span>`
                    ).join('');
                }
                break;
        }
    }
    
    function resetConfigModal() {
        // Reset all checkboxes
        document.querySelectorAll('.day-checkboxes input, .period-checkboxes input').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset selects to first option
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
        
        currentParameter = null;
    }
}

// Initialize all interactions
setupButtonInteractions();
setupNavigationInteractions();
setupFilterFunctionality();
setupDarkModeToggle();
setupSortDropdown();
setupTrophyButton();

// New Menu Dropdown
function setupNewMenuDropdown() {
    const newMenuButton = document.getElementById('new-menu-button');
    const newMenuOptions = document.getElementById('new-menu-options');
    const dropdownOptions = document.querySelectorAll('.dropdown-option');
    
    console.log('Setting up new menu dropdown', { 
        newMenuButton, 
        buttonFound: !!newMenuButton,
        newMenuOptions, 
        optionsFound: !!newMenuOptions,
        optionsCount: dropdownOptions.length 
    });
    
    if (newMenuButton && newMenuOptions) {
        console.log('Adding click listener to button');
        
        // Toggle dropdown
        newMenuButton.addEventListener('click', function(e) {
            console.log('Button clicked!');
            e.stopPropagation();
            
            console.log('Classes before:', newMenuOptions.className);
            newMenuOptions.classList.toggle('hidden');
            console.log('Classes after:', newMenuOptions.className);
        });
        
        // Handle option clicks
        dropdownOptions.forEach(option => {
            option.addEventListener('click', function() {
                const action = this.dataset.action;
                handleNewMenuAction(action);
                newMenuOptions.classList.add('hidden');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!newMenuButton.contains(e.target) && !newMenuOptions.contains(e.target)) {
                newMenuOptions.classList.add('hidden');
            }
        });
    } else {
        console.error('New menu dropdown elements not found!', {
            button: newMenuButton,
            options: newMenuOptions
        });
    }
}

function handleNewMenuAction(action) {
    console.log(`New menu action: ${action}`);
    
    switch(action) {
        case 'menu-item':
            openMenuItemModal();
            break;
        case 'multiple-items':
            console.log('Opening bulk menu items form');
            // Add bulk items creation logic here
            break;
        case 'category':
            console.log('Opening category creation form');
            // Add category creation logic here
            break;
    }
}

// Menu Item Modal Functions
function openMenuItemModal(itemId = null) {
    const modal = document.getElementById('menu-item-modal');
    if (modal) {
        if (itemId) {
            // Edit mode
            currentEditingItemId = itemId;
            const itemData = extractItemDataFromDOM(itemId);
            populateModalWithData(itemData);
            
            // Update modal title
            const breadcrumb = modal.querySelector('.modal-breadcrumb');
            if (breadcrumb) breadcrumb.textContent = 'Edit Menu Item';
        } else {
            // Create mode
            currentEditingItemId = null;
            resetModalForm();
            
            // Update modal title
            const breadcrumb = modal.querySelector('.modal-breadcrumb');
            if (breadcrumb) breadcrumb.textContent = 'New Menu Item';
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Update preview to reflect current form state
        updatePreview();
        
        // Setup copy link buttons (needs to be called each time modal opens)
        setupCopyLinkButtons();
        
        // Setup status dropdown (needs to be called each time modal opens)
        setupStatusDropdown();
        
        console.log('Menu item modal opened', itemId ? `(editing ID: ${itemId})` : '(create mode)');
    }
}

function closeMenuItemModal() {
    const modal = document.getElementById('menu-item-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        console.log('Menu item modal closed');
    }
}

function setupMenuItemModal() {
    const modal = document.getElementById('menu-item-modal');
    const closeButton = document.getElementById('close-menu-item-modal');
    const saveButton = document.getElementById('save-menu-item');
    const tabs = document.querySelectorAll('.menu-item-tab');
    
    if (!modal) return;
    
    // Close button
    if (closeButton) {
        closeButton.addEventListener('click', closeMenuItemModal);
    }
    
    // Save button
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            console.log('Save menu item clicked');
            
            // Collect form data
            const formData = collectFormData();
            
            if (currentEditingItemId !== null) {
                // Edit mode - update existing item
                const updatedItem = createMenuItem(formData);
                updatedItem.id = currentEditingItemId;
                
                updateMenuItemInTable(currentEditingItemId, updatedItem);
                updateMenuItemInCards(currentEditingItemId, updatedItem);
                
                console.log('Menu item updated:', updatedItem);
                currentEditingItemId = null;
            } else {
                // Create mode - add new item
                const newItem = createMenuItem(formData);
                
                addMenuItemToTable(newItem);
                addMenuItemToCards(newItem);
                
                console.log('New menu item created:', newItem);
            }
            
            closeMenuItemModal();
        });
    }
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeMenuItemModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeMenuItemModal();
        }
    });
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents in modal body
            const modalTabContents = document.querySelectorAll('.menu-item-modal-tab-content');
            modalTabContents.forEach(content => content.classList.remove('active'));
            
            // Show selected tab content
            const targetContent = document.querySelector(`.menu-item-modal-tab-content[data-tab-content="${tabName}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            console.log('Switched to tab:', tabName);
        });
    });
    
    // Toggle switch sections functionality
    const toggleSwitchSections = document.querySelectorAll('.toggle-switch-section');
    toggleSwitchSections.forEach(section => {
        const switchInput = section.querySelector('.toggle-switch-input');
        const content = section.querySelector('.toggle-switch-content');
        
        if (switchInput && content) {
            switchInput.addEventListener('change', function() {
                // Toggle hidden class on content based on checkbox state
                if (this.checked) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
                
                const title = section.querySelector('.toggle-switch-title').textContent;
                console.log('Toggle switch changed:', title, 'State:', this.checked);
            });
        }
    });
    
    // Availability toggle buttons
    const availabilityToggleBtns = document.querySelectorAll('.availability-toggle-btn');
    availabilityToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const day = this.dataset.day;
            const meal = this.dataset.meal;
            const type = day ? 'day' : 'meal';
            const value = day || meal;
            
            console.log('Availability toggled:', type, value, 'Active:', this.classList.contains('active'));
        });
    });
    
    // Setup preview update listeners
    setupPreviewUpdateListeners();
    
    // Edit buttons in table view (more-options button)
    document.addEventListener('click', function(e) {
        const moreOptionsBtn = e.target.closest('.more-options');
        if (moreOptionsBtn) {
            const row = moreOptionsBtn.closest('tr');
            if (row) {
                const checkbox = row.querySelector('.row-checkbox');
                if (checkbox) {
                    const itemId = parseInt(checkbox.dataset.itemId);
                    openMenuItemModal(itemId);
                }
            }
        }
    });
    
    // Edit buttons in card view
    document.addEventListener('click', function(e) {
        const editBtn = e.target.closest('.edit-button');
        if (editBtn) {
            const card = editBtn.closest('.menu-card');
            if (card) {
                const itemId = parseInt(card.dataset.itemId);
                openMenuItemModal(itemId);
            }
        }
    });
    
    // Advanced tax settings accordion
    const advancedTaxToggle = document.getElementById('advanced-tax-toggle');
    const advancedTaxSettings = document.getElementById('advanced-tax-settings');

    if (advancedTaxToggle && advancedTaxSettings) {
        advancedTaxToggle.addEventListener('click', function() {
            const isHidden = advancedTaxSettings.classList.contains('hidden');
            
            if (isHidden) {
                // Show advanced settings
                advancedTaxSettings.classList.remove('hidden');
                advancedTaxToggle.textContent = 'Hide tax options';
            } else {
                // Hide advanced settings
                advancedTaxSettings.classList.add('hidden');
                advancedTaxToggle.textContent = 'Show tax options';
            }
        });
    }
}

// Setup preview update listeners
function setupPreviewUpdateListeners() {
    const modal = document.getElementById('menu-item-modal');
    if (!modal) return;
    
    // Get form inputs
    const priceInput = modal.querySelector('.currency-prefix-input input[placeholder="3000"]');
    const originalPriceInput = modal.querySelector('.currency-prefix-input input[placeholder="4000"]');
    const showDiscountCheckbox = modal.querySelector('input[name="show-discount"]');
    
    // Add event listeners
    if (priceInput) {
        priceInput.addEventListener('input', updatePreview);
    }
    
    if (originalPriceInput) {
        originalPriceInput.addEventListener('input', updatePreview);
    }
    
    if (showDiscountCheckbox) {
        showDiscountCheckbox.addEventListener('change', updatePreview);
    }
    
    // Initial update
    updatePreview();
}

// Update preview based on form values
function updatePreview() {
    const modal = document.getElementById('menu-item-modal');
    if (!modal) return;
    
    // Get form values
    const priceInput = modal.querySelector('.currency-prefix-input input[placeholder="3000"]');
    const originalPriceInput = modal.querySelector('.currency-prefix-input input[placeholder="4000"]');
    const showDiscountCheckbox = modal.querySelector('input[name="show-discount"]');
    
    const price = priceInput ? priceInput.value.trim() : '';
    const originalPrice = originalPriceInput ? originalPriceInput.value.trim() : '';
    const showDiscount = showDiscountCheckbox ? showDiscountCheckbox.checked : false;
    
    // Get preview elements
    const previewPriceRow = modal.querySelector('.preview-price-row');
    const previewPrice = modal.querySelector('.preview-price');
    const previewOriginalPrice = modal.querySelector('.preview-original-price');
    const previewDiscount = modal.querySelector('.preview-discount');
    
    if (!previewPriceRow || !previewPrice) return;
    
    // Check if price has value
    const numPrice = parseFloat(price);
    const numOriginalPrice = parseFloat(originalPrice);
    
    if (!price || price === '' || price === '0' || isNaN(numPrice) || numPrice === 0) {
        // Hide entire price row if no price
        previewPriceRow.style.display = 'none';
    } else {
        // Show price row
        previewPriceRow.style.display = 'flex';
        
        // Update main price (use JPY currency symbol from placeholder)
        previewPrice.textContent = `¥${numPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        
        // Check if we should show discount info
        if (originalPrice && originalPrice !== '' && !isNaN(numOriginalPrice) && numOriginalPrice > numPrice && showDiscount) {
            // Show discount information
            if (previewOriginalPrice) {
                previewOriginalPrice.style.display = 'inline';
                previewOriginalPrice.textContent = `¥${numOriginalPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            }
            
            if (previewDiscount) {
                const discountPercent = Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100);
                previewDiscount.style.display = 'inline';
                previewDiscount.textContent = `${discountPercent}% off`;
            }
        } else {
            // Hide discount information
            if (previewOriginalPrice) {
                previewOriginalPrice.style.display = 'none';
            }
            
            if (previewDiscount) {
                previewDiscount.style.display = 'none';
            }
        }
    }
}

// Setup copy link buttons
function setupCopyLinkButtons() {
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const socialShareBtn = document.getElementById('social-share-btn');
    const socialShareOptions = document.querySelector('.social-share-options');
    const socialOptions = document.querySelectorAll('.social-option');
    const linkUrl = document.querySelector('.preview-link-url');
    
    // Copy link button
    if (copyLinkBtn && linkUrl) {
        copyLinkBtn.addEventListener('click', async function() {
            const url = linkUrl.textContent;
            
            try {
                await navigator.clipboard.writeText(url);
                showCopiedState(this);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }
    
    // Social share button - toggle dropdown
    if (socialShareBtn && socialShareOptions) {
        socialShareBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            socialShareOptions.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!socialShareBtn.contains(e.target) && !socialShareOptions.contains(e.target)) {
                socialShareOptions.classList.add('hidden');
            }
        });
    }
    
    // Social option buttons
    if (socialOptions && linkUrl) {
        socialOptions.forEach(option => {
            option.addEventListener('click', async function() {
                const platform = this.dataset.platform;
                const baseUrl = linkUrl.textContent;
                
                // Add UTM parameters based on platform
                const utmParams = getUTMParams(platform);
                const urlWithUTM = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${utmParams}`;
                
                try {
                    await navigator.clipboard.writeText(urlWithUTM);
                    
                    // Show copied state on parent button
                    if (socialShareBtn) {
                        showCopiedState(socialShareBtn);
                    }
                    
                    // Close dropdown
                    if (socialShareOptions) {
                        socialShareOptions.classList.add('hidden');
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }
}

// Get UTM parameters for social platform
function getUTMParams(platform) {
    const utmMap = {
        'facebook': 'utm_source=facebook&utm_medium=social',
        'twitter': 'utm_source=twitter&utm_medium=social',
        'instagram': 'utm_source=instagram&utm_medium=social',
        'linkedin': 'utm_source=linkedin&utm_medium=social',
        'whatsapp': 'utm_source=whatsapp&utm_medium=social',
        'email': 'utm_source=email&utm_medium=email'
    };
    return utmMap[platform] || 'utm_source=social&utm_medium=social';
}

// Show copied state with animation
function showCopiedState(button) {
    const originalHTML = button.innerHTML;
    
    // Change to copied state
    button.classList.add('copied');
    const span = button.querySelector('span');
    if (span) {
        span.textContent = 'Copied!';
    }
    
    // Add checkmark icon
    const svg = button.querySelector('svg');
    if (svg) {
        svg.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
    }
    
    // Revert after 2 seconds
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalHTML;
    }, 2000);
}

// Setup status dropdown
let statusDropdownInitialized = false;
function setupStatusDropdown() {
    const statusDropdown = document.querySelector('.status-dropdown');
    const statusOptions = document.querySelector('.status-dropdown-options');
    const statusOptionBtns = document.querySelectorAll('.status-option');
    
    if (!statusDropdown || !statusOptions) return;
    
    // Only set up event listeners once
    if (!statusDropdownInitialized) {
        // Toggle dropdown on click
        statusDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            statusOptions.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside (use event delegation on modal)
        const modal = document.getElementById('menu-item-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (!statusDropdown.contains(e.target) && !statusOptions.contains(e.target)) {
                    statusOptions.classList.add('hidden');
                }
            });
        }
        
        // Handle option selection
        statusOptionBtns.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.dataset.value;
                const label = this.textContent;
                
                // Update button text and value
                const statusLabel = statusDropdown.querySelector('.status-label');
                if (statusLabel) {
                    statusLabel.textContent = label;
                }
                statusDropdown.dataset.value = value;
                
                // Update button colors based on status
                updateStatusColors(statusDropdown, value);
                
                // Close dropdown
                statusOptions.classList.add('hidden');
                
                console.log('Status changed to:', value);
            });
        });
        
        statusDropdownInitialized = true;
    }
}

// Update status dropdown colors based on selected value
function updateStatusColors(dropdown, status) {
    // Remove all status color classes
    dropdown.style.backgroundColor = '';
    dropdown.style.color = '';
    dropdown.style.borderColor = '';
    
    // Apply colors based on status
    switch(status) {
        case 'online':
            dropdown.style.backgroundColor = 'var(--success-surface)';
            dropdown.style.color = 'var(--success-text)';
            dropdown.style.borderColor = 'var(--success-border)';
            break;
        case 'hidden':
            dropdown.style.backgroundColor = 'var(--warning-surface)';
            dropdown.style.color = 'var(--warning-text)';
            dropdown.style.borderColor = 'var(--warning-border)';
            break;
        case 'manager':
            dropdown.style.backgroundColor = 'var(--info-surface)';
            dropdown.style.color = 'var(--info-text)';
            dropdown.style.borderColor = 'var(--info-border)';
            break;
        case 'disabled':
            dropdown.style.backgroundColor = 'var(--neutral-surface)';
            dropdown.style.color = 'var(--neutral-text)';
            dropdown.style.borderColor = 'var(--neutral-border)';
            break;
    }
}

// View Toggle Functionality
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-button');
    const tableContainer = document.querySelector('.table-container');
    const cardsContainer = document.querySelector('.cards-container');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle containers
            if (view === 'table') {
                tableContainer.style.display = 'block';
                cardsContainer.style.display = 'none';
            } else if (view === 'cards') {
                tableContainer.style.display = 'none';
                cardsContainer.style.display = 'block';
            }
            
            console.log(`Switched to ${view} view`);
        });
    });
}

// Helper Functions for Menu Item Creation

// Collect form data from the modal
function collectFormData() {
    const modal = document.getElementById('menu-item-modal');
    
    // Name
    const nameInput = modal.querySelector('.form-input[placeholder="Spaghetti Bolognese"]');
    const name = nameInput ? nameInput.value.trim() : '';
    
    // Status
    const statusDropdown = modal.querySelector('.status-dropdown');
    const status = statusDropdown ? statusDropdown.dataset.value : 'online';
    
    // Tagline
    const taglineTextarea = modal.querySelector('.form-textarea[placeholder="Traditional Italian bolognese."]');
    const tagline = taglineTextarea ? taglineTextarea.value.trim() : '';
    
    // Description
    const descriptionTextarea = modal.querySelectorAll('.form-textarea')[1];
    const description = descriptionTextarea ? descriptionTextarea.value.trim() : '';
    
    // Online Category
    const onlineCategorySelect = modal.querySelectorAll('.form-select')[0];
    const category = onlineCategorySelect ? onlineCategorySelect.value : 'Courses';
    
    // Price
    const priceInput = modal.querySelector('.currency-prefix-input input[placeholder="3000"]');
    const price = priceInput ? priceInput.value.trim() : '';
    
    // Original Price
    const originalPriceInput = modal.querySelector('.currency-prefix-input input[placeholder="4000"]');
    const originalPrice = originalPriceInput ? originalPriceInput.value.trim() : '';
    
    // Show discount checkbox
    const showDiscountCheckbox = modal.querySelector('input[name="show-discount"]');
    const showDiscount = showDiscountCheckbox ? showDiscountCheckbox.checked : false;
    
    // Tax Type
    const taxTypeRadio = modal.querySelector('input[name="tax-type"]:checked');
    const taxType = taxTypeRadio ? taxTypeRadio.value : 'included';
    
    // Days availability
    const dayButtons = modal.querySelectorAll('.availability-toggle-btn[data-day]');
    const days = Array.from(dayButtons)
        .filter(btn => btn.classList.contains('active'))
        .map(btn => btn.dataset.day);
    
    // Meals availability
    const mealButtons = modal.querySelectorAll('.availability-toggle-btn[data-meal]');
    const meals = Array.from(mealButtons)
        .filter(btn => btn.classList.contains('active'))
        .map(btn => btn.dataset.meal);
    
    return {
        name,
        status,
        tagline,
        description,
        category,
        price,
        originalPrice,
        showDiscount,
        taxType,
        days: days.length > 0 ? days : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        meals: meals.length > 0 ? meals : ['lunch', 'dinner']
    };
}

// Create menu item object with unique ID
function createMenuItem(data) {
    // Generate unique ID
    const existingItems = document.querySelectorAll('.row-checkbox[data-item-id]');
    let maxId = 0;
    existingItems.forEach(item => {
        const id = parseInt(item.dataset.itemId);
        if (id > maxId) maxId = id;
    });
    const newId = maxId + 1;
    
    return {
        id: newId,
        name: data.name || 'New Menu Item',
        status: data.status,
        tagline: data.tagline,
        description: data.description,
        category: data.category,
        price: data.price,
        originalPrice: data.originalPrice,
        showDiscount: data.showDiscount,
        taxType: data.taxType,
        days: data.days,
        meals: data.meals
    };
}

// Add menu item to table view
function addMenuItemToTable(item) {
    const tableBody = document.querySelector('.menu-table tbody');
    if (!tableBody) return;
    
    // Find or create category section
    const categoryName = item.category;
    let categorySection = findCategoryInTable(categoryName);
    
    if (!categorySection) {
        categorySection = createCategoryInTable(categoryName);
    }
    
    // Create table row
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="checkbox" class="row-checkbox" data-item-id="${item.id}">
        </td>
        <td>
            <div class="menu-name">
                <strong>${item.name}</strong>
                <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=64&h=64&fit=crop" alt="${item.name}" class="menu-item-thumbnail">
            </div>
        </td>
        <td>
            <div class="price">${formatPrice(item.price)}</div>
        </td>
        <td>
            <div class="schedule-info">
                <div class="days-row">
                    ${item.days.map(day => `<span class="day-tag">${getDayAbbreviation(day)}</span>`).join('')}
                </div>
                <div class="periods-row">
                    ${item.meals.map(meal => `<span class="period-tag">${capitalize(meal)}</span>`).join('')}
                </div>
            </div>
        </td>
        <td>
            <span class="status-tag ${getStatusClass(item.status)}">
                ${capitalize(item.status)}
            </span>
        </td>
        <td>
            <div class="table-actions">
                <button class="more-options">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                </button>
            </div>
        </td>
    `;
    
    // Insert after category header
    const categoryHeader = categorySection.categoryHeader;
    categoryHeader.insertAdjacentElement('afterend', row);
    
    // Update category count
    updateCategoryCount(categoryName);
}

// Add menu item to card view
function addMenuItemToCards(item) {
    const cardsContainer = document.querySelector('.cards-container .menu-cards-grid');
    if (!cardsContainer) return;
    
    // Find or create category section
    const categoryName = item.category;
    let categorySection = findCategoryInCards(categoryName);
    
    if (!categorySection) {
        categorySection = createCategoryInCards(categoryName);
    }
    
    // Create card
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.itemId = item.id;
    card.innerHTML = `
        <div class="card-image">
            <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=640&h=400&fit=crop" alt="${item.name}">
            <span class="status-tag ${getStatusClass(item.status)}">${capitalize(item.status)}</span>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h4 class="card-title">${item.name}</h4>
                <div class="card-price">${formatPriceWithDiscount(item.price, item.originalPrice, item.showDiscount)}</div>
            </div>
            <p class="card-description">${item.tagline || item.description || ''}</p>
        </div>
    `;
    
    // Add to category's menu cards container
    const menuCards = categorySection.querySelector('.menu-cards');
    if (menuCards) {
        menuCards.appendChild(card);
    }
    
    // Update category count
    updateCategoryCountInCards(categoryName);
}

// Find category in table
function findCategoryInTable(categoryName) {
    const categoryHeaders = document.querySelectorAll('.menu-table .category-header');
    for (const header of categoryHeaders) {
        const categoryTag = header.querySelector('.category-tag');
        if (categoryTag && categoryTag.textContent === categoryName) {
            return { categoryHeader: header };
        }
    }
    return null;
}

// Create new category in table
function createCategoryInTable(categoryName) {
    const tableBody = document.querySelector('.menu-table tbody');
    if (!tableBody) return null;
    
    const categoryRow = document.createElement('tr');
    categoryRow.className = 'category-header';
    categoryRow.innerHTML = `
        <td>
            <input type="checkbox" class="category-checkbox" data-category="${categoryName.toLowerCase().replace(' ', '-')}">
        </td>
        <td colspan="5">
            <div class="category-header-content">
                <span class="category-tag">${categoryName}</span>
                <span class="category-count">0 items</span>
            </div>
        </td>
    `;
    
    tableBody.appendChild(categoryRow);
    
    return { categoryHeader: categoryRow };
}

// Find category in cards
function findCategoryInCards(categoryName) {
    const categorySections = document.querySelectorAll('.cards-container .category-section');
    for (const section of categorySections) {
        const categoryTitle = section.querySelector('.category-title');
        if (categoryTitle && categoryTitle.textContent === categoryName) {
            return section;
        }
    }
    return null;
}

// Create new category in cards
function createCategoryInCards(categoryName) {
    const cardsGrid = document.querySelector('.cards-container .menu-cards-grid');
    if (!cardsGrid) return null;
    
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section';
    categorySection.innerHTML = `
        <div class="category-header-card">
            <div class="category-info">
                <h3 class="category-title">${categoryName}</h3>
                <span class="category-count">0 items</span>
            </div>
            <input type="checkbox" class="category-checkbox" data-category="${categoryName.toLowerCase().replace(' ', '-')}">
        </div>
        <div class="menu-cards"></div>
    `;
    
    cardsGrid.appendChild(categorySection);
    
    return categorySection;
}

// Update category count in table
function updateCategoryCount(categoryName) {
    const categoryHeaders = document.querySelectorAll('.menu-table .category-header');
    for (const header of categoryHeaders) {
        const categoryTag = header.querySelector('.category-tag');
        if (categoryTag && categoryTag.textContent === categoryName) {
            // Count items in this category
            let count = 0;
            let nextRow = header.nextElementSibling;
            while (nextRow && !nextRow.classList.contains('category-header')) {
                count++;
                nextRow = nextRow.nextElementSibling;
            }
            
            const categoryCount = header.querySelector('.category-count');
            if (categoryCount) {
                categoryCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
            }
            break;
        }
    }
}

// Update category count in cards
function updateCategoryCountInCards(categoryName) {
    const categorySections = document.querySelectorAll('.cards-container .category-section');
    for (const section of categorySections) {
        const categoryTitle = section.querySelector('.category-title');
        if (categoryTitle && categoryTitle.textContent === categoryName) {
            const menuCards = section.querySelector('.menu-cards');
            const count = menuCards ? menuCards.querySelectorAll('.menu-card').length : 0;
            
            const categoryCount = section.querySelector('.category-count');
            if (categoryCount) {
                categoryCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
            }
            break;
        }
    }
}

// Format price with $ symbol or "No Price" tag
function formatPrice(value) {
    if (!value || value === '' || value === '0' || parseFloat(value) === 0) {
        return '<span class="tertiary-tag">No Price</span>';
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return '<span class="tertiary-tag">No Price</span>';
    }
    return `$${numValue.toFixed(2)}`;
}

// Format price with discount information for cards
function formatPriceWithDiscount(price, originalPrice, showDiscount) {
    if (!price || price === '' || price === '0' || parseFloat(price) === 0) {
        return '<span class="tertiary-tag">No Price</span>';
    }
    
    const numPrice = parseFloat(price);
    const numOriginalPrice = parseFloat(originalPrice);
    
    if (isNaN(numPrice)) {
        return '<span class="tertiary-tag">No Price</span>';
    }
    
    let priceHtml = `$${numPrice.toFixed(2)}`;
    
    // Show discount if original price exists and showDiscount is true
    if (originalPrice && originalPrice !== '' && numOriginalPrice > numPrice && showDiscount) {
        const discountPercent = Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100);
        priceHtml = `
            <span style="text-decoration: line-through; color: var(--text-subtle); margin-right: 8px;">$${numOriginalPrice.toFixed(2)}</span>
            <span style="color: var(--brand-primary);">$${numPrice.toFixed(2)}</span>
            <span style="background-color: var(--warning-surface); color: var(--warning-text); padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-left: 8px;">${discountPercent}% off</span>
        `;
    }
    
    return priceHtml;
}

// Get day abbreviation (Mo, Tu, We, etc.)
function getDayAbbreviation(day) {
    const abbr = {
        'monday': 'Mo',
        'tuesday': 'Tu',
        'wednesday': 'We',
        'thursday': 'Th',
        'friday': 'Fr',
        'saturday': 'Sa',
        'sunday': 'Su'
    };
    return abbr[day.toLowerCase()] || day.substring(0, 2);
}

// Get day initial (M, T, W, etc.) for cards
function getDayInitial(day) {
    const initial = {
        'monday': 'M',
        'tuesday': 'T',
        'wednesday': 'W',
        'thursday': 'T',
        'friday': 'F',
        'saturday': 'S',
        'sunday': 'S'
    };
    return initial[day.toLowerCase()] || day.substring(0, 1).toUpperCase();
}

// Capitalize first letter
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get status class for styling
function getStatusClass(status) {
    const validStatuses = ['online', 'hidden', 'manager', 'disabled'];
    const normalized = status.toLowerCase();
    return validStatuses.includes(normalized) ? `status-${normalized}` : 'status-disabled';
}

// Extract item data from DOM by ID
function extractItemDataFromDOM(itemId) {
    // Try to find in table first
    const tableRow = document.querySelector(`.menu-table tr .row-checkbox[data-item-id="${itemId}"]`)?.closest('tr');
    
    if (tableRow) {
        const name = tableRow.querySelector('.menu-name strong')?.textContent || '';
        const priceText = tableRow.querySelector('.price')?.textContent || '$0.00';
        const price = priceText.replace('$', '').trim();
        
        const statusTag = tableRow.querySelector('.status-tag');
        const statusClass = statusTag?.className.split(' ').find(c => ['online', 'hidden', 'manager', 'disabled'].includes(c)) || 'online';
        const status = statusClass;
        
        const dayTags = tableRow.querySelectorAll('.day-tag');
        const days = Array.from(dayTags).map(tag => getDayFromAbbr(tag.textContent));
        
        const periodTags = tableRow.querySelectorAll('.period-tag');
        const meals = Array.from(periodTags).map(tag => tag.textContent.toLowerCase());
        
        // Find category
        let category = 'Courses';
        let prevRow = tableRow.previousElementSibling;
        while (prevRow) {
            if (prevRow.classList.contains('category-header')) {
                category = prevRow.querySelector('.category-tag')?.textContent || 'Courses';
                break;
            }
            prevRow = prevRow.previousElementSibling;
        }
        
        return {
            id: itemId,
            name,
            price,
            originalPrice: '',
            status,
            category,
            days,
            meals,
            tagline: '',
            description: ''
        };
    }
    
    // Try to find in cards
    const card = document.querySelector(`.menu-card[data-item-id="${itemId}"]`);
    if (card) {
        const name = card.querySelector('.card-title')?.textContent || '';
        const priceText = card.querySelector('.card-price')?.textContent || '$0.00';
        const price = priceText.replace('$', '').trim();
        const description = card.querySelector('.card-description')?.textContent || '';
        
        const statusTag = card.querySelector('.status-tag');
        const statusClass = statusTag?.className.split(' ').find(c => ['online', 'hidden', 'manager', 'disabled'].includes(c)) || 'online';
        const status = statusClass;
        
        const dayTags = card.querySelectorAll('.schedule-days .day-tag');
        const days = Array.from(dayTags).map(tag => getDayFromInitial(tag.textContent));
        
        const periodTags = card.querySelectorAll('.schedule-periods .period-tag');
        const meals = Array.from(periodTags).map(tag => tag.textContent.toLowerCase());
        
        // Find category
        const categorySection = card.closest('.category-section');
        const category = categorySection?.querySelector('.category-title')?.textContent || 'Courses';
        
        return {
            id: itemId,
            name,
            price,
            originalPrice: '',
            status,
            category,
            days,
            meals,
            tagline: description,
            description
        };
    }
    
    return null;
}

// Populate modal with item data
function populateModalWithData(itemData) {
    if (!itemData) return;
    
    const modal = document.getElementById('menu-item-modal');
    if (!modal) return;
    
    // Name
    const nameInput = modal.querySelector('.form-input[placeholder="Spaghetti Bolognese"]');
    if (nameInput) nameInput.value = itemData.name;
    
    // Status
    const statusDropdown = modal.querySelector('.status-dropdown');
    if (statusDropdown && itemData.status) {
        statusDropdown.dataset.value = itemData.status;
        const statusLabel = statusDropdown.querySelector('.status-label');
        if (statusLabel) {
            // Capitalize first letter for display
            statusLabel.textContent = itemData.status.charAt(0).toUpperCase() + itemData.status.slice(1);
        }
        // Update colors
        updateStatusColors(statusDropdown, itemData.status);
    }
    
    // Category
    const categorySelect = modal.querySelectorAll('.form-select')[0];
    if (categorySelect) categorySelect.value = itemData.category;
    
    // Price
    const priceInput = modal.querySelector('.currency-prefix-input input[placeholder="3000"]');
    if (priceInput) priceInput.value = itemData.price;
    
    // Original Price
    const originalPriceInput = modal.querySelector('.currency-prefix-input input[placeholder="4000"]');
    if (originalPriceInput) originalPriceInput.value = itemData.originalPrice || '';
    
    // Tagline
    const taglineTextarea = modal.querySelector('.form-textarea[placeholder="Traditional Italian bolognese."]');
    if (taglineTextarea) taglineTextarea.value = itemData.tagline || '';
    
    // Description
    const descriptionTextarea = modal.querySelectorAll('.form-textarea')[1];
    if (descriptionTextarea) descriptionTextarea.value = itemData.description || '';
    
    // Days - activate appropriate buttons
    const dayButtons = modal.querySelectorAll('.availability-toggle-btn[data-day]');
    dayButtons.forEach(btn => {
        if (itemData.days && itemData.days.includes(btn.dataset.day)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Meals - activate appropriate buttons
    const mealButtons = modal.querySelectorAll('.availability-toggle-btn[data-meal]');
    mealButtons.forEach(btn => {
        if (itemData.meals && itemData.meals.includes(btn.dataset.meal)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Reset modal form for create mode
function resetModalForm() {
    const modal = document.getElementById('menu-item-modal');
    if (!modal) return;
    
    // Clear name
    const nameInput = modal.querySelector('.form-input[placeholder="Spaghetti Bolognese"]');
    if (nameInput) nameInput.value = '';
    
    // Reset status
    const statusDropdown = modal.querySelector('.status-dropdown');
    if (statusDropdown) {
        statusDropdown.dataset.value = 'online';
        const statusLabel = statusDropdown.querySelector('.status-label');
        if (statusLabel) {
            statusLabel.textContent = 'Online';
        }
        // Reset to online colors
        updateStatusColors(statusDropdown, 'online');
    }
    
    // Clear category
    const categorySelect = modal.querySelectorAll('.form-select')[0];
    if (categorySelect) categorySelect.selectedIndex = 0;
    
    // Clear price
    const priceInput = modal.querySelector('.currency-prefix-input input[placeholder="3000"]');
    if (priceInput) priceInput.value = '';
    
    // Clear original price
    const originalPriceInput = modal.querySelector('.currency-prefix-input input[placeholder="4000"]');
    if (originalPriceInput) originalPriceInput.value = '';
    
    // Clear tagline
    const taglineTextarea = modal.querySelector('.form-textarea[placeholder="Traditional Italian bolognese."]');
    if (taglineTextarea) taglineTextarea.value = '';
    
    // Clear description
    const descriptionTextarea = modal.querySelectorAll('.form-textarea')[1];
    if (descriptionTextarea) descriptionTextarea.value = '';
    
    // Clear show discount checkbox
    const showDiscountCheckbox = modal.querySelector('input[name="show-discount"]');
    if (showDiscountCheckbox) showDiscountCheckbox.checked = false;
    
    // Deactivate all day buttons
    const dayButtons = modal.querySelectorAll('.availability-toggle-btn[data-day]');
    dayButtons.forEach(btn => btn.classList.remove('active'));
    
    // Deactivate all meal buttons
    const mealButtons = modal.querySelectorAll('.availability-toggle-btn[data-meal]');
    mealButtons.forEach(btn => btn.classList.remove('active'));
}

// Update menu item in table
function updateMenuItemInTable(itemId, updatedData) {
    const tableBody = document.querySelector('.menu-table tbody');
    if (!tableBody) return;
    
    // Find the row
    const row = document.querySelector(`.menu-table tr .row-checkbox[data-item-id="${itemId}"]`)?.closest('tr');
    if (!row) return;
    
    // Get old category
    let oldCategory = null;
    let prevRow = row.previousElementSibling;
    while (prevRow) {
        if (prevRow.classList.contains('category-header')) {
            oldCategory = prevRow.querySelector('.category-tag')?.textContent;
            break;
        }
        prevRow = prevRow.previousElementSibling;
    }
    
    // Check if category changed
    if (oldCategory && oldCategory !== updatedData.category) {
        // Remove from old category
        row.remove();
        
        // Add to new category
        addMenuItemToTable(updatedData);
        
        // Update old category count
        updateCategoryCount(oldCategory);
    } else {
        // Update in place
        row.querySelector('.menu-name strong').textContent = updatedData.name;
        const thumbnail = row.querySelector('.menu-item-thumbnail');
        if (thumbnail) thumbnail.alt = updatedData.name;
        row.querySelector('.price').innerHTML = formatPrice(updatedData.price);
        
        // Update days
        const daysRow = row.querySelector('.days-row');
        if (daysRow) {
            daysRow.innerHTML = updatedData.days.map(day => `<span class="day-tag">${getDayAbbreviation(day)}</span>`).join('');
        }
        
        // Update meals
        const periodsRow = row.querySelector('.periods-row');
        if (periodsRow) {
            periodsRow.innerHTML = updatedData.meals.map(meal => `<span class="period-tag">${capitalize(meal)}</span>`).join('');
        }
        
        // Update status
        const statusTag = row.querySelector('.status-tag');
        if (statusTag) {
            statusTag.className = `status-tag ${getStatusClass(updatedData.status)}`;
            statusTag.textContent = capitalize(updatedData.status);
        }
    }
}

// Update menu item in cards
function updateMenuItemInCards(itemId, updatedData) {
    const cardsGrid = document.querySelector('.cards-container .menu-cards-grid');
    if (!cardsGrid) return;
    
    // Find the card
    const card = document.querySelector(`.menu-card[data-item-id="${itemId}"]`);
    if (!card) return;
    
    // Get old category
    const oldCategorySection = card.closest('.category-section');
    const oldCategory = oldCategorySection?.querySelector('.category-title')?.textContent;
    
    // Check if category changed
    if (oldCategory && oldCategory !== updatedData.category) {
        // Remove from old category
        card.remove();
        
        // Add to new category
        addMenuItemToCards(updatedData);
        
        // Update old category count
        updateCategoryCountInCards(oldCategory);
    } else {
        // Update in place
        card.querySelector('.card-title').textContent = updatedData.name;
        card.querySelector('.card-price').innerHTML = formatPriceWithDiscount(updatedData.price, updatedData.originalPrice, updatedData.showDiscount);
        card.querySelector('.card-description').textContent = updatedData.tagline || updatedData.description || '';
        
        // Update status
        const statusTag = card.querySelector('.card-image .status-tag');
        if (statusTag) {
            statusTag.className = `status-tag ${getStatusClass(updatedData.status)}`;
            statusTag.textContent = capitalize(updatedData.status);
        }
        
        // Update image alt text
        const img = card.querySelector('.card-image img');
        if (img) img.alt = updatedData.name;
    }
}

// Convert day abbreviation to full name
function getDayFromAbbr(abbr) {
    const dayMap = {
        'Mo': 'monday',
        'Tu': 'tuesday',
        'We': 'wednesday',
        'Th': 'thursday',
        'Fr': 'friday',
        'Sa': 'saturday',
        'Su': 'sunday'
    };
    return dayMap[abbr] || abbr.toLowerCase();
}

// Convert day initial to full name
function getDayFromInitial(initial) {
    const dayMap = {
        'M': 'monday',
        'T': 'tuesday',
        'W': 'wednesday',
        'F': 'friday',
        'S': 'saturday'
    };
    return dayMap[initial] || 'monday';
}

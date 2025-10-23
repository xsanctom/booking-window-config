// Booking Window Configuration JavaScript

// Global state for booking configuration
let bookingConfig = {
    furthest: {
        unlockType: 'days', // 'days' or 'months'
        number: 1,
        unit: 'months' // 'days' or 'months'
    },
    closest: {
        mode: 'same-day', // 'same-day' or 'advance'
        timeIncrement: 15, // minutes for same-day mode
        days: 1 // for advance mode
    }
};

// Debounce function for preview updates
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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Track current language
let currentLanguage = 'en'; // 'en' or 'ja'

function initializeApp() {
    setupModalHandlers();
    setupFormHandlers('en');
    setupFormHandlers('ja');
    setupConditionalFields('en');
    setupConditionalFields('ja');
    updatePreviews('en');
    updatePreviews('ja');
    console.log('Booking window configuration initialized');
}

// Modal Handlers
function setupModalHandlers() {
    // English modal
    const openButtonEN = document.getElementById('open-booking-modal-en');
    const closeButtonEN = document.getElementById('close-booking-modal');
    const cancelButtonEN = document.getElementById('cancel-booking-config');
    const saveButtonEN = document.getElementById('save-booking-config');
    const modalEN = document.getElementById('booking-window-modal');

    // Japanese modal
    const openButtonJA = document.getElementById('open-booking-modal-ja');
    const closeButtonJA = document.getElementById('close-booking-modal-ja');
    const cancelButtonJA = document.getElementById('cancel-booking-config-ja');
    const saveButtonJA = document.getElementById('save-booking-config-ja');
    const modalJA = document.getElementById('booking-window-modal-ja');

    // Open English modal
    if (openButtonEN) {
        openButtonEN.addEventListener('click', function() {
            openModal('en');
        });
    }

    // Open Japanese modal
    if (openButtonJA) {
        openButtonJA.addEventListener('click', function() {
            openModal('ja');
        });
    }

    // Close English modal
    if (closeButtonEN) {
        closeButtonEN.addEventListener('click', function() { closeModal('en'); });
    }
    if (cancelButtonEN) {
        cancelButtonEN.addEventListener('click', function() { closeModal('en'); });
    }

    // Close Japanese modal
    if (closeButtonJA) {
        closeButtonJA.addEventListener('click', function() { closeModal('ja'); });
    }
    if (cancelButtonJA) {
        cancelButtonJA.addEventListener('click', function() { closeModal('ja'); });
    }

    // Save configuration - English
    if (saveButtonEN) {
        saveButtonEN.addEventListener('click', function() {
            saveConfiguration('en');
        });
    }

    // Save configuration - Japanese
    if (saveButtonJA) {
        saveButtonJA.addEventListener('click', function() {
            saveConfiguration('ja');
        });
    }

    // Close on overlay click - English
    if (modalEN) {
        modalEN.addEventListener('click', function(e) {
            if (e.target === modalEN) {
                closeModal('en');
            }
        });
    }

    // Close on overlay click - Japanese
    if (modalJA) {
        modalJA.addEventListener('click', function(e) {
            if (e.target === modalJA) {
                closeModal('ja');
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modalEN && modalEN.classList.contains('show')) {
                closeModal('en');
            }
            if (modalJA && modalJA.classList.contains('show')) {
                closeModal('ja');
            }
        }
    });
}

function openModal(lang) {
    currentLanguage = lang;
    const modalId = lang === 'ja' ? 'booking-window-modal-ja' : 'booking-window-modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        updatePreviews(lang);
    }
}

function closeModal(lang) {
    const modalId = lang === 'ja' ? 'booking-window-modal-ja' : 'booking-window-modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function saveConfiguration(lang) {
    const message = lang === 'ja' ? '予約設定が保存されました！（デモ）' : 'Booking configuration saved! (This is a demo)';
    console.log('Saving booking configuration:', bookingConfig);
    // Here you would typically send the configuration to your backend
    alert(message);
    closeModal(lang);
}


// Form Handlers
function setupFormHandlers(lang) {
    const suffix = lang === 'ja' ? '-ja' : '';
    
    // Furthest booking inputs
    const unlockDaysBtn = document.getElementById('unlock-days' + suffix);
    const unlockMonthsBtn = document.getElementById('unlock-months' + suffix);
    const furthestNumber = document.getElementById('furthest-number' + suffix);
    const furthestUnit = document.getElementById('furthest-unit' + suffix);

    // Closest booking inputs
    const closestSameDayBtn = document.getElementById('closest-same-day' + suffix);
    const closestAdvanceBtn = document.getElementById('closest-advance' + suffix);
    const closestTimeIncrement = document.getElementById('closest-time-increment' + suffix);
    const closestDays = document.getElementById('closest-days' + suffix);

    // Add event listeners with debounced preview updates
    const debouncedUpdate = debounce(() => updatePreviews(lang), 300);

    // Furthest: Unlock type selector
    if (unlockDaysBtn) {
        unlockDaysBtn.addEventListener('click', function() {
            bookingConfig.furthest.unlockType = 'days';
            const modal = document.getElementById('booking-window-modal' + (lang === 'ja' ? '-ja' : ''));
            if (modal) {
                const furthestButtons = modal.querySelectorAll('#unlock-days' + suffix + ', #unlock-months' + suffix);
                furthestButtons.forEach(btn => btn.classList.remove('active'));
            }
            this.classList.add('active');
            updateConditionalFields(lang);
            debouncedUpdate();
        });
    }

    if (unlockMonthsBtn) {
        unlockMonthsBtn.addEventListener('click', function() {
            bookingConfig.furthest.unlockType = 'months';
            const modal = document.getElementById('booking-window-modal' + (lang === 'ja' ? '-ja' : ''));
            if (modal) {
                const furthestButtons = modal.querySelectorAll('#unlock-days' + suffix + ', #unlock-months' + suffix);
                furthestButtons.forEach(btn => btn.classList.remove('active'));
            }
            this.classList.add('active');
            updateConditionalFields(lang);
            debouncedUpdate();
        });
    }

    if (furthestNumber) {
        furthestNumber.addEventListener('input', function() {
            bookingConfig.furthest.number = parseInt(this.value) || 1;
            debouncedUpdate();
        });
    }

    if (furthestUnit) {
        furthestUnit.addEventListener('change', function() {
            bookingConfig.furthest.unit = this.value;
            debouncedUpdate();
        });
    }

    // Closest: Mode selector
    if (closestSameDayBtn) {
        closestSameDayBtn.addEventListener('click', function() {
            bookingConfig.closest.mode = 'same-day';
            const modal = document.getElementById('booking-window-modal' + (lang === 'ja' ? '-ja' : ''));
            if (modal) {
                const closestButtons = modal.querySelectorAll('#closest-same-day' + suffix + ', #closest-advance' + suffix);
                closestButtons.forEach(btn => btn.classList.remove('active'));
            }
            this.classList.add('active');
            updateConditionalFields(lang);
            debouncedUpdate();
        });
    }

    if (closestAdvanceBtn) {
        closestAdvanceBtn.addEventListener('click', function() {
            bookingConfig.closest.mode = 'advance';
            const modal = document.getElementById('booking-window-modal' + (lang === 'ja' ? '-ja' : ''));
            if (modal) {
                const closestButtons = modal.querySelectorAll('#closest-same-day' + suffix + ', #closest-advance' + suffix);
                closestButtons.forEach(btn => btn.classList.remove('active'));
            }
            this.classList.add('active');
            updateConditionalFields(lang);
            debouncedUpdate();
        });
    }

    if (closestTimeIncrement) {
        closestTimeIncrement.addEventListener('change', function() {
            bookingConfig.closest.timeIncrement = parseInt(this.value);
            debouncedUpdate();
        });
    }

    if (closestDays) {
        closestDays.addEventListener('input', function() {
            bookingConfig.closest.days = parseInt(this.value) || 1;
            debouncedUpdate();
        });
    }
}

// Conditional Field Visibility
function setupConditionalFields(lang) {
    updateConditionalFields(lang);
}

function updateConditionalFields(lang) {
    const suffix = lang === 'ja' ? '-ja' : '';
    
    // Furthest booking fields
    const furthestUnit = document.getElementById('furthest-unit' + suffix);
    const unlockType = bookingConfig.furthest.unlockType;
    
    if (furthestUnit) {
        // Clear all options
        furthestUnit.innerHTML = '';
        
        if (unlockType === 'days') {
            // Show both months and days options
            if (lang === 'ja') {
                furthestUnit.innerHTML = '<option value="months">月</option><option value="days">日</option>';
            } else {
                furthestUnit.innerHTML = '<option value="months">Months</option><option value="days">Days</option>';
            }
            // Restore selected unit if valid
            if (bookingConfig.furthest.unit === 'months' || bookingConfig.furthest.unit === 'days') {
                furthestUnit.value = bookingConfig.furthest.unit;
            }
        } else if (unlockType === 'months') {
            // Only show months option
            if (lang === 'ja') {
                furthestUnit.innerHTML = '<option value="months">月</option>';
            } else {
                furthestUnit.innerHTML = '<option value="months">Months</option>';
            }
            furthestUnit.value = 'months';
            bookingConfig.furthest.unit = 'months';
        }
    }
    
    // Closest booking fields
    const closestMode = bookingConfig.closest.mode;
    const sameDayControls = document.getElementById('closest-same-day-controls' + suffix);
    const advanceControls = document.getElementById('closest-advance-controls' + suffix);
    
    if (closestMode === 'same-day') {
        if (sameDayControls) sameDayControls.classList.remove('hidden');
        if (advanceControls) advanceControls.classList.add('hidden');
    } else if (closestMode === 'advance') {
        if (sameDayControls) sameDayControls.classList.add('hidden');
        if (advanceControls) advanceControls.classList.remove('hidden');
    }
}

// Booking Window Calculation Logic

function calculateEarliestBooking() {
    const now = new Date();
    const config = bookingConfig.closest;
    
    let earliestDate = new Date(now);
    
    if (config.mode === 'same-day') {
        // Add the time increment in minutes
        earliestDate.setTime(now.getTime() + (config.timeIncrement * 60 * 1000));
    } else if (config.mode === 'advance') {
        // Add the minimum days
        earliestDate.setDate(now.getDate() + config.days);
    }
    
    return earliestDate;
}

function calculateLatestBooking() {
    const now = new Date();
    const config = bookingConfig.furthest;
    let latestDate = new Date(now);
    
    if (config.unlockType === 'days') {
        // Unlock Days: Rolling window that advances daily
        if (config.unit === 'days') {
            // Simple: add number of days
            latestDate.setDate(now.getDate() + config.number);
        } else if (config.unit === 'months') {
            // Convert months to approximate days (30 days per month for rolling window)
            const daysToAdd = config.number * 30;
            latestDate.setDate(now.getDate() + daysToAdd);
        }
        // Set to end of day
        latestDate.setHours(23, 59, 59, 999);
        
    } else if (config.unlockType === 'months') {
        // Unlock Months: Full months unlock on 1st at midnight
        // Determine which months are currently unlocked
        
        // Get the 1st of current month at midnight
        const firstOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        
        // Calculate the target month (current + number of months)
        const targetMonth = new Date(firstOfCurrentMonth);
        targetMonth.setMonth(firstOfCurrentMonth.getMonth() + config.number);
        
        // The latest bookable date is the last day of the target month
        const lastDayOfTargetMonth = getDaysInMonth(targetMonth.getFullYear(), targetMonth.getMonth());
        latestDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), lastDayOfTargetMonth, 23, 59, 59, 999);
    }
    
    return latestDate;
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function formatDateTime(date) {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return date.toLocaleDateString('en-US', options);
}

function formatDate(date) {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return date.toLocaleTimeString('en-US', options);
}

// Preview Update Logic
function updatePreviews(lang) {
    try {
        const earliest = calculateEarliestBooking();
        const latest = calculateLatestBooking();
        
        // Update furthest preview
        updateFurthestPreview(latest, lang);
        
        // Update closest preview
        updateClosestPreview(earliest, lang);
        
    } catch (error) {
        console.error('Error updating preview:', error);
    }
}

function updateFurthestPreview(latestDate, lang) {
    const suffix = lang === 'ja' ? '-ja' : '';
    const preview = document.getElementById('furthest-preview' + suffix);
    if (!preview) return;

    const config = bookingConfig.furthest;
    const now = new Date();
    
    let previewText = '';
    let additionalText = '';
    
    if (config.unlockType === 'days') {
        // Unlock Days mode: Rolling window
        if (lang === 'ja') {
            const latestDateFormatted = latestDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
            previewText = `現在の最長予約可能日は<strong>${latestDateFormatted}</strong>です。`;
            additionalText = `<br>予約枠は毎日深夜0時に1日分ずつ追加されます。`;
        } else {
            const latestDateFormatted = latestDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            previewText = `Furthest booking right now would be <strong>${latestDateFormatted}</strong>.`;
            additionalText = `<br>The booking window advances by 1 day each day at midnight.`;
        }
        
    } else if (config.unlockType === 'months') {
        // Unlock Months mode: Full months on 1st
        const nextMonth = new Date(latestDate);
        nextMonth.setMonth(latestDate.getMonth() + 1);
        const firstOfFurthestMonth = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1);
        
        if (lang === 'ja') {
            const latestDateFormatted = latestDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
            previewText = `現在の最長予約可能日は<strong>${latestDateFormatted}</strong>です。`;
            
            const nextMonthName = nextMonth.toLocaleDateString('ja-JP', { month: 'long' });
            const unlockDate = firstOfFurthestMonth.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
            additionalText = `<br><strong>${nextMonthName}</strong>は<strong>${unlockDate}</strong>の深夜0時に予約可能になります。`;
        } else {
            const latestDateFormatted = latestDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            previewText = `Furthest booking right now would be <strong>${latestDateFormatted}</strong>.`;
            
            const nextMonthName = nextMonth.toLocaleDateString('en-US', { month: 'long' });
            const unlockDate = firstOfFurthestMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            additionalText = `<br><strong>${nextMonthName}</strong> will become available on <strong>${unlockDate}</strong> at midnight.`;
        }
    }
    
    preview.innerHTML = previewText + additionalText;
}

function roundToNext15Minutes(date) {
    const rounded = new Date(date);
    const minutes = rounded.getMinutes();
    const remainder = minutes % 15;
    
    if (remainder !== 0) {
        // Round up to next 15-minute mark
        rounded.setMinutes(minutes + (15 - remainder));
        rounded.setSeconds(0);
        rounded.setMilliseconds(0);
    }
    
    return rounded;
}

function updateClosestPreview(earliestDate, lang) {
    const suffix = lang === 'ja' ? '-ja' : '';
    const preview = document.getElementById('closest-preview' + suffix);
    if (!preview) return;

    const config = bookingConfig.closest;
    const now = new Date();
    
    // Round to next 15-minute increment
    const roundedDate = roundToNext15Minutes(earliestDate);
    
    let previewText = '';
    
    if (config.mode === 'same-day') {
        // Check if it's still same day or crosses to next day
        const isSameDay = roundedDate.getDate() === now.getDate() && 
                         roundedDate.getMonth() === now.getMonth() && 
                         roundedDate.getFullYear() === now.getFullYear();
        
        if (isSameDay) {
            // Show just the time
            const timeFormatted = roundedDate.toLocaleTimeString(lang === 'ja' ? 'ja-JP' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            if (lang === 'ja') {
                previewText = `現在の最短予約可能時刻は<strong>${timeFormatted}</strong>です。`;
            } else {
                previewText = `Earliest booking right now would be at <strong>${timeFormatted}</strong>.`;
            }
        } else {
            // Show date and time
            const dateTimeFormatted = roundedDate.toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US', { 
                weekday: 'long', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            });
            if (lang === 'ja') {
                previewText = `現在の最短予約可能時刻は<strong>${dateTimeFormatted}</strong>です。`;
            } else {
                previewText = `Earliest booking right now would be <strong>${dateTimeFormatted}</strong>.`;
            }
        }
    } else if (config.mode === 'advance') {
        // Show the date
        const dateFormatted = roundedDate.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        if (lang === 'ja') {
            previewText = `現在の最短予約可能日は<strong>${dateFormatted}</strong>です。`;
        } else {
            previewText = `Earliest booking right now would be <strong>${dateFormatted}</strong>.`;
        }
    }
    
    preview.innerHTML = previewText;
}

function getOrdinalSuffix(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

// Export configuration for external use
function getBookingConfiguration() {
    return {
        ...bookingConfig,
        calculated: {
            earliest: calculateEarliestBooking(),
            latest: calculateLatestBooking()
        }
    };
}

// Set configuration from external source
function setBookingConfiguration(config) {
    bookingConfig = { ...bookingConfig, ...config };
    updatePreviews();
}

// Make functions available globally for testing
window.bookingWindowConfig = {
    getConfiguration: getBookingConfiguration,
    setConfiguration: setBookingConfiguration,
    updatePreview: updatePreviews
};
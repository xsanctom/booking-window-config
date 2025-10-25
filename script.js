// Booking Window Configuration JavaScript

// Global state for booking configuration
let bookingConfig = {
    furthest: {
        type: 'daily', // 'daily' or 'monthly'
        number: 2,
        unit: 'months' // 'days' or 'months'
    },
    closest: {
        mode: 'same-day', // 'same-day' or 'advance'
        timeIncrement: 15, // minutes for same-day mode
        days: 1 // for advance mode
    },
    extendToMealEnd: true
};

// Current language state
let currentLanguage = 'en';

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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupModalHandlers();
    setupFurthestRadioHandlers();
    setupClosestRadioHandlers();
    setupFormHandlers();
    updateConditionalFields();
    updatePreviews();
});

// Modal Handlers
function setupModalHandlers() {
    // Language selection buttons
    const openEnButton = document.getElementById('open-booking-modal-en');
    const openJaButton = document.getElementById('open-booking-modal-ja');
    
    // Modal elements
    const enModal = document.getElementById('booking-window-modal');
    const jaModal = document.getElementById('booking-window-modal-ja');
    
    // Close buttons
    const closeEnButton = document.getElementById('close-booking-modal');
    const closeJaButton = document.getElementById('close-booking-modal-ja');
    
    // Cancel buttons
    const cancelEnButton = document.getElementById('cancel-booking-config');
    const cancelJaButton = document.getElementById('cancel-booking-config-ja');
    
    // Save buttons
    const saveEnButton = document.getElementById('save-booking-config');
    const saveJaButton = document.getElementById('save-booking-config-ja');
    
    // Open English modal
    if (openEnButton) {
        openEnButton.addEventListener('click', function() {
            currentLanguage = 'en';
            enModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Open Japanese modal
    if (openJaButton) {
        openJaButton.addEventListener('click', function() {
            currentLanguage = 'ja';
            jaModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close English modal
    if (closeEnButton) {
        closeEnButton.addEventListener('click', closeModal);
    }
    
    if (cancelEnButton) {
        cancelEnButton.addEventListener('click', closeModal);
    }
    
    // Close Japanese modal
    if (closeJaButton) {
        closeJaButton.addEventListener('click', closeModal);
    }
    
    if (cancelJaButton) {
        cancelJaButton.addEventListener('click', closeModal);
    }
    
    // Save buttons
    if (saveEnButton) {
        saveEnButton.addEventListener('click', function() {
            console.log('Saving booking configuration:', bookingConfig);
            alert('Configuration saved! (This is a demo)');
            closeModal();
        });
    }
    
    if (saveJaButton) {
        saveJaButton.addEventListener('click', function() {
            console.log('Saving booking configuration:', bookingConfig);
            alert('設定が保存されました！（これはデモです）');
            closeModal();
        });
    }
    
    // Close modal on overlay click
    if (enModal) {
        enModal.addEventListener('click', function(e) {
            if (e.target === enModal) {
                closeModal();
            }
        });
    }
    
    if (jaModal) {
        jaModal.addEventListener('click', function(e) {
            if (e.target === jaModal) {
                closeModal();
            }
        });
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const enModal = document.getElementById('booking-window-modal');
    const jaModal = document.getElementById('booking-window-modal-ja');
    
    if (enModal) enModal.classList.remove('active');
    if (jaModal) jaModal.classList.remove('active');
    
    document.body.style.overflow = '';
}

// Furthest Booking Radio Button Handlers
function setupFurthestRadioHandlers() {
    // English radio buttons
    const dailyOption = document.getElementById('daily-update-option');
    const monthlyOption = document.getElementById('monthly-update-option');
    const radioButtons = document.querySelectorAll('input[name="furthest-type"]');

    // Japanese radio buttons
    const dailyOptionJa = document.getElementById('daily-update-option-ja');
    const monthlyOptionJa = document.getElementById('monthly-update-option-ja');
    const radioButtonsJa = document.querySelectorAll('input[name="furthest-type-ja"]');

    // English handlers
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update active state
            dailyOption.classList.remove('active');
            monthlyOption.classList.remove('active');
            
            if (this.value === 'daily') {
                dailyOption.classList.add('active');
                bookingConfig.furthest.type = 'daily';
            } else if (this.value === 'monthly') {
                monthlyOption.classList.add('active');
                bookingConfig.furthest.type = 'monthly';
            }
            
            updateConditionalFields();
            updatePreviews();
        });
    });

    // Japanese handlers
    radioButtonsJa.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update active state
            dailyOptionJa.classList.remove('active');
            monthlyOptionJa.classList.remove('active');
            
            if (this.value === 'daily') {
                dailyOptionJa.classList.add('active');
                bookingConfig.furthest.type = 'daily';
            } else if (this.value === 'monthly') {
                monthlyOptionJa.classList.add('active');
                bookingConfig.furthest.type = 'monthly';
            }
            
            updateConditionalFields();
            updatePreviews();
        });
    });
}

// Closest Booking Radio Button Handlers
function setupClosestRadioHandlers() {
    // English radio buttons
    const sameDayOption = document.getElementById('same-day-option');
    const advanceOption = document.getElementById('advance-option');
    const radioButtons = document.querySelectorAll('input[name="closest-type"]');

    // Japanese radio buttons
    const sameDayOptionJa = document.getElementById('same-day-option-ja');
    const advanceOptionJa = document.getElementById('advance-option-ja');
    const radioButtonsJa = document.querySelectorAll('input[name="closest-type-ja"]');

    // English handlers
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update active state
            sameDayOption.classList.remove('active');
            advanceOption.classList.remove('active');
            
            if (this.value === 'same-day') {
                sameDayOption.classList.add('active');
                bookingConfig.closest.mode = 'same-day';
            } else if (this.value === 'advance') {
                advanceOption.classList.add('active');
                bookingConfig.closest.mode = 'advance';
            }
            
            updateConditionalFields();
            updatePreviews();
        });
    });

    // Japanese handlers
    radioButtonsJa.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update active state
            sameDayOptionJa.classList.remove('active');
            advanceOptionJa.classList.remove('active');
            
            if (this.value === 'same-day') {
                sameDayOptionJa.classList.add('active');
                bookingConfig.closest.mode = 'same-day';
            } else if (this.value === 'advance') {
                advanceOptionJa.classList.add('active');
                bookingConfig.closest.mode = 'advance';
            }
            
            updateConditionalFields();
            updatePreviews();
        });
    });
}

// Form Handlers
function setupFormHandlers() {
    // English form elements
    const furthestNumber = document.getElementById('furthest-number');
    const furthestNumberMonthly = document.getElementById('furthest-number-monthly');
    const furthestUnit = document.getElementById('furthest-unit');
    const closestTimeIncrement = document.getElementById('closest-time-increment');
    const closestDays = document.getElementById('closest-days');
    const extendToggle = document.getElementById('extend-bookings');

    // Japanese form elements
    const furthestNumberJa = document.getElementById('furthest-number-ja');
    const furthestNumberMonthlyJa = document.getElementById('furthest-number-monthly-ja');
    const furthestUnitJa = document.getElementById('furthest-unit-ja');
    const closestTimeIncrementJa = document.getElementById('closest-time-increment-ja');
    const closestDaysJa = document.getElementById('closest-days-ja');
    const extendToggleJa = document.getElementById('extend-bookings-ja');

    const debouncedUpdate = debounce(() => updatePreviews(), 300);

    // English handlers
    if (furthestNumber) {
        furthestNumber.addEventListener('input', function() {
            bookingConfig.furthest.number = parseInt(this.value) || 1;
            debouncedUpdate();
        });
    }

    if (furthestNumberMonthly) {
        furthestNumberMonthly.addEventListener('input', function() {
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

    if (extendToggle) {
        extendToggle.addEventListener('change', function() {
            bookingConfig.extendToMealEnd = this.checked;
        });
    }

    // Japanese handlers
    if (furthestNumberJa) {
        furthestNumberJa.addEventListener('input', function() {
            bookingConfig.furthest.number = parseInt(this.value) || 1;
            debouncedUpdate();
        });
    }

    if (furthestNumberMonthlyJa) {
        furthestNumberMonthlyJa.addEventListener('input', function() {
            bookingConfig.furthest.number = parseInt(this.value) || 1;
            debouncedUpdate();
        });
    }

    if (furthestUnitJa) {
        furthestUnitJa.addEventListener('change', function() {
            bookingConfig.furthest.unit = this.value;
            debouncedUpdate();
        });
    }

    if (closestTimeIncrementJa) {
        closestTimeIncrementJa.addEventListener('change', function() {
            bookingConfig.closest.timeIncrement = parseInt(this.value);
            debouncedUpdate();
        });
    }

    if (closestDaysJa) {
        closestDaysJa.addEventListener('input', function() {
            bookingConfig.closest.days = parseInt(this.value) || 1;
            debouncedUpdate();
        });
    }

    if (extendToggleJa) {
        extendToggleJa.addEventListener('change', function() {
            bookingConfig.extendToMealEnd = this.checked;
        });
    }
}


// Conditional Field Visibility
function updateConditionalFields() {
    // English elements
    const dailyControls = document.getElementById('daily-controls');
    const monthlyControls = document.getElementById('monthly-controls');
    const sameDayControls = document.getElementById('same-day-controls');
    const advanceControls = document.getElementById('advance-controls');
    
    // Japanese elements
    const dailyControlsJa = document.getElementById('daily-controls-ja');
    const monthlyControlsJa = document.getElementById('monthly-controls-ja');
    const sameDayControlsJa = document.getElementById('same-day-controls-ja');
    const advanceControlsJa = document.getElementById('advance-controls-ja');
    
    const furthestType = bookingConfig.furthest.type;
    const closestMode = bookingConfig.closest.mode;
    
    // Update English furthest booking controls
    if (furthestType === 'daily') {
        if (dailyControls) dailyControls.classList.remove('hidden');
        if (monthlyControls) monthlyControls.classList.add('hidden');
        // Sync value from monthly to daily input
        const monthlyInput = document.getElementById('furthest-number-monthly');
        const dailyInput = document.getElementById('furthest-number');
        if (monthlyInput && dailyInput && monthlyInput.value) {
            dailyInput.value = monthlyInput.value;
        }
    } else if (furthestType === 'monthly') {
        if (dailyControls) dailyControls.classList.add('hidden');
        if (monthlyControls) monthlyControls.classList.remove('hidden');
        bookingConfig.furthest.unit = 'months';
        // Sync value from daily to monthly input
        const dailyInput = document.getElementById('furthest-number');
        const monthlyInput = document.getElementById('furthest-number-monthly');
        if (dailyInput && monthlyInput && dailyInput.value) {
            monthlyInput.value = dailyInput.value;
        }
    }
    
    // Update Japanese furthest booking controls
    if (furthestType === 'daily') {
        if (dailyControlsJa) dailyControlsJa.classList.remove('hidden');
        if (monthlyControlsJa) monthlyControlsJa.classList.add('hidden');
        // Sync value from monthly to daily input
        const monthlyInputJa = document.getElementById('furthest-number-monthly-ja');
        const dailyInputJa = document.getElementById('furthest-number-ja');
        if (monthlyInputJa && dailyInputJa && monthlyInputJa.value) {
            dailyInputJa.value = monthlyInputJa.value;
        }
    } else if (furthestType === 'monthly') {
        if (dailyControlsJa) dailyControlsJa.classList.add('hidden');
        if (monthlyControlsJa) monthlyControlsJa.classList.remove('hidden');
        bookingConfig.furthest.unit = 'months';
        // Sync value from daily to monthly input
        const dailyInputJa = document.getElementById('furthest-number-ja');
        const monthlyInputJa = document.getElementById('furthest-number-monthly-ja');
        if (dailyInputJa && monthlyInputJa && dailyInputJa.value) {
            monthlyInputJa.value = dailyInputJa.value;
        }
    }
    
    // Update English closest booking controls
    if (closestMode === 'same-day') {
        if (sameDayControls) sameDayControls.classList.remove('hidden');
        if (advanceControls) advanceControls.classList.add('hidden');
    } else if (closestMode === 'advance') {
        if (sameDayControls) sameDayControls.classList.add('hidden');
        if (advanceControls) advanceControls.classList.remove('hidden');
    }
    
    // Update Japanese closest booking controls
    if (closestMode === 'same-day') {
        if (sameDayControlsJa) sameDayControlsJa.classList.remove('hidden');
        if (advanceControlsJa) advanceControlsJa.classList.add('hidden');
    } else if (closestMode === 'advance') {
        if (sameDayControlsJa) sameDayControlsJa.classList.add('hidden');
        if (advanceControlsJa) advanceControlsJa.classList.remove('hidden');
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
    
    if (config.type === 'daily') {
        // Rolling window - advances by 1 day each day
        if (config.unit === 'months') {
            latestDate.setMonth(now.getMonth() + config.number);
        } else if (config.unit === 'days') {
            latestDate.setDate(now.getDate() + config.number);
        }
    } else if (config.type === 'monthly') {
        // Batch release - full months unlock on the 1st
        const monthsAhead = config.number;
        const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthsAhead, 1);
        
        // Last day of the target month
        const lastDayOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);
        latestDate = lastDayOfMonth;
    }
    
    return latestDate;
}

function roundToNext15Minutes(date) {
    const rounded = new Date(date);
    const minutes = rounded.getMinutes();
    const remainder = minutes % 15;
    
    if (remainder !== 0) {
        rounded.setMinutes(minutes + (15 - remainder));
        rounded.setSeconds(0);
        rounded.setMilliseconds(0);
    }
    
    return rounded;
}

// Preview Updates
function updatePreviews() {
    const earliestDate = calculateEarliestBooking();
    const latestDate = calculateLatestBooking();
    
    updateFurthestPreview(latestDate, 'en');
    updateFurthestPreview(latestDate, 'ja');
    updateClosestPreview(earliestDate, 'en');
    updateClosestPreview(earliestDate, 'ja');
}

function updateFurthestPreview(latestDate, lang) {
    const suffix = lang === 'ja' ? '-ja' : '';
    const preview = document.getElementById('furthest-preview' + suffix);
    if (!preview) return;

    const config = bookingConfig.furthest;
    const now = new Date();
    
    let previewText = '';
    let additionalText = '';
    
    if (config.type === 'daily') {
        if (lang === 'ja') {
            const latestDateFormatted = latestDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
            previewText = `現在の最長予約可能日は<strong>${latestDateFormatted}</strong>です。`;
            additionalText = `<br>予約枠は毎日深夜0時に1日分ずつ追加されます。`;
        } else {
            const latestDateFormatted = latestDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            previewText = `Furthest booking right now would be <strong>${latestDateFormatted}</strong>.`;
            additionalText = `<br>The booking window advances by 1 day each day at midnight.`;
        }
        
    } else if (config.type === 'monthly') {
        if (lang === 'ja') {
            const latestDateFormatted = latestDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
            previewText = `現在の最長予約可能日は<strong>${latestDateFormatted}</strong>です。`;
            
            // Calculate next month that will unlock
            const nextMonth = new Date(latestDate);
            nextMonth.setMonth(latestDate.getMonth() + 1);
            const firstOfFurthestMonth = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1);
            
            const nextMonthName = nextMonth.toLocaleDateString('ja-JP', { month: 'long' });
            const unlockDate = firstOfFurthestMonth.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
            additionalText = `<br><strong>${nextMonthName}</strong>は<strong>${unlockDate}</strong>の深夜0時に利用可能になります。`;
        } else {
            const latestDateFormatted = latestDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            previewText = `Furthest booking right now would be <strong>${latestDateFormatted}</strong>.`;
            
            // Calculate next month that will unlock
            const nextMonth = new Date(latestDate);
            nextMonth.setMonth(latestDate.getMonth() + 1);
            const firstOfFurthestMonth = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1);
            
            const nextMonthName = nextMonth.toLocaleDateString('en-US', { month: 'long' });
            const unlockDate = firstOfFurthestMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            additionalText = `<br><strong>${nextMonthName}</strong> will become available on <strong>${unlockDate}</strong> at midnight.`;
        }
    }
    
    preview.innerHTML = previewText + additionalText;
}

function updateClosestPreview(earliestDate, lang) {
    const suffix = lang === 'ja' ? '-ja' : '';
    const preview = document.getElementById('closest-preview' + suffix);
    if (!preview) return;

    const config = bookingConfig.closest;
    const now = new Date();
    
    const roundedDate = roundToNext15Minutes(earliestDate);
    
    let previewText = '';
    
    if (config.mode === 'same-day') {
        // Check if it's still same day or crosses to next day
        const isSameDay = roundedDate.getDate() === now.getDate() && 
                         roundedDate.getMonth() === now.getMonth() && 
                         roundedDate.getFullYear() === now.getFullYear();
        
        if (isSameDay) {
            // Show just the time
            if (lang === 'ja') {
                const timeFormatted = roundedDate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
                previewText = `現在の最短予約可能時刻は<strong>${timeFormatted}</strong>です。`;
            } else {
                const timeFormatted = roundedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                previewText = `Earliest booking right now would be at <strong>${timeFormatted}</strong>.`;
            }
        } else {
            // Show date and time
            if (lang === 'ja') {
                const dateTimeFormatted = roundedDate.toLocaleString('ja-JP', { 
                    weekday: 'long', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: false 
                });
                previewText = `現在の最短予約可能日時は<strong>${dateTimeFormatted}</strong>です。`;
            } else {
                const dateTimeFormatted = roundedDate.toLocaleString('en-US', { 
                    weekday: 'long', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: false 
                });
                previewText = `Earliest booking right now would be <strong>${dateTimeFormatted}</strong>.`;
            }
        }
    } else if (config.mode === 'advance') {
        // Show the date
        if (lang === 'ja') {
            const dateFormatted = roundedDate.toLocaleDateString('ja-JP', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
            previewText = `現在の最短予約可能日は<strong>${dateFormatted}</strong>です。`;
        } else {
            const dateFormatted = roundedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
            previewText = `Earliest booking right now would be <strong>${dateFormatted}</strong>.`;
        }
    }
    
    preview.innerHTML = previewText;
}


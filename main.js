// Nexora Video Editor - Main JavaScript

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
    
    const icon = type === 'success' ? 'check_circle' : 'error';
    toast.innerHTML = `
        <span class="material-symbols-outlined text-${type === 'success' ? 'green' : 'red'}-500">${icon}</span>
        <span class="text-sm">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal Functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay') && !e.target.classList.contains('hidden')) {
        e.target.classList.add('hidden');
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});

// User Menu
function showUserMenu() {
    showToast('User menu', 'success');
}

// Notifications
function showNotifications() {
    showToast('No new notifications', 'success');
}

// Settings
function showSettings() {
    showToast('Settings', 'success');
}

// Timeline Functions
function skipToStart() {
    const timecode = document.getElementById('timecode');
    if (timecode) timecode.textContent = '00:00:00:00';
    updatePlayheadPosition(0);
}

function skipToEnd() {
    updatePlayheadPosition(100);
}

function stepBackward() {
    const timecode = document.getElementById('timecode');
    if (timecode) {
        const parts = timecode.textContent.split(':');
        let frames = parseInt(parts[3]) - 1;
        if (frames < 0) frames = 0;
        parts[3] = String(frames).padStart(2, '0');
        timecode.textContent = parts.join(':');
    }
}

function stepForward() {
    const timecode = document.getElementById('timecode');
    if (timecode) {
        const parts = timecode.textContent.split(':');
        let frames = parseInt(parts[3]) + 1;
        if (frames > 23) frames = 23;
        parts[3] = String(frames).padStart(2, '0');
        timecode.textContent = parts.join(':');
    }
}

function updatePlayheadPosition(percent) {
    const playhead = document.getElementById('playhead');
    if (playhead) {
        playhead.style.left = `calc(120px + ${percent}% - 1px)`;
    }
}

// Volume Control
function setVolume(value) {
    const slider = document.getElementById('volumeSlider');
    if (slider) {
        slider.value = value;
    }
}

// Loop Toggle
let isLooping = false;
function toggleLoop() {
    isLooping = !isLooping;
    const loopIcon = document.getElementById('loopIcon');
    if (loopIcon) {
        loopIcon.style.color = isLooping ? '#8a2ce2' : '';
    }
    showToast(isLooping ? 'Loop enabled' : 'Loop disabled', 'success');
}

// Fullscreen
function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            showToast('Error enabling fullscreen', 'error');
        });
    } else {
        document.exitFullscreen();
    }
}

// Track Functions
function toggleTrackVisibility(btn) {
    const icon = btn.querySelector('span');
    if (icon.textContent === 'visibility') {
        icon.textContent = 'visibility_off';
        btn.closest('.track').style.opacity = '0.5';
    } else {
        icon.textContent = 'visibility';
        btn.closest('.track').style.opacity = '1';
    }
}

function toggleTrackMute(btn) {
    btn.classList.toggle('text-primary');
    btn.classList.toggle('text-slate-500');
}

function toggleTrackSolo(btn) {
    btn.classList.toggle('text-primary');
    btn.classList.toggle('text-slate-500');
}

function addTrack() {
    showToast('Add new track', 'success');
}

// Panel Functions
function toggleSection(sectionId) {
    const section = document.getElementById('section' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
    if (section) {
        section.classList.toggle('hidden');
    }
}

function showPanel(panel) {
    showToast(`Showing ${panel} panel`, 'success');
}

// Color Correction
function selectColorWheel(wheel) {
    document.querySelectorAll('[onclick^="selectColorWheel"]').forEach(btn => {
        btn.classList.remove('bg-primary/20', 'text-white');
        btn.classList.add('bg-panel-dark');
    });
    event.target.closest('button').classList.add('bg-primary/20', 'text-white');
    event.target.closest('button').classList.remove('bg-panel-dark');
    showToast(`${wheel} color wheel selected`, 'success');
}

// Filter Functions
function showFiltersPanel() {
    showToast('Opening filters library', 'success');
}

function removeFilter(btn) {
    btn.closest('div.bg-panel-dark').remove();
    showToast('Filter removed', 'success');
}

function editFilter(btn) {
    showToast('Opening filter settings', 'success');
}

// Timeline Settings
function showTimelineSettings() {
    showToast('Timeline settings', 'success');
}

// Keyframe Functions
function selectKeyframe(element) {
    document.querySelectorAll('.keyframe').forEach(k => k.classList.remove('selected'));
    element.classList.add('selected');
}

// Playback Functions
function setEditorMode(mode) {
    // Implemented in editor.html
}

// Animation presets
function applyPreset(preset) {
    // Implemented in editor.html
}

// Export
function startExport() {
    // Implemented in editor.html
}

// Clip operations
function splitClip() {
    showToast('Clip split', 'success');
}

function deleteClip() {
    showToast('Clip deleted', 'success');
}

function duplicateClip() {
    showToast('Clip duplicated', 'success');
}

// Undo/Redo
let history = [];
let historyIndex = -1;

function addToHistory(action) {
    history = history.slice(0, historyIndex + 1);
    history.push(action);
    historyIndex++;
    
    // Limit history size
    if (history.length > 50) {
        history.shift();
        historyIndex--;
    }
}

function undo() {
    if (historyIndex >= 0) {
        showToast('Undo: ' + history[historyIndex], 'success');
        historyIndex--;
    } else {
        showToast('Nothing to undo', 'success');
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        showToast('Redo: ' + history[historyIndex], 'success');
    } else {
        showToast('Nothing to redo', 'success');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }
    
    // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
    }
    
    // Ctrl/Cmd + S for save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
    }
    
    // Delete for delete
    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            deleteClip();
        }
    }
    
    // Space for play/pause
    if (e.key === ' ' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlay();
    }
});

// Initialize common functions
function saveProject() {
    localStorage.setItem('nexoraLastSaved', new Date().toISOString());
    showToast('Project saved!', 'success');
}

// Canvas drawing (for preview)
function initCanvas() {
    const canvas = document.getElementById('previewCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1920;
        canvas.height = 1080;
        
        // Draw placeholder
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw text
        ctx.fillStyle = '#666';
        ctx.font = '48px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Preview', canvas.width / 2, canvas.height / 2);
    }
}

// Audio visualization
function updateAudioVisualization() {
    // Simulated VU meter animation
    const vuLeft = document.getElementById('vuLeft');
    const vuRight = document.getElementById('vuRight');
    
    if (vuLeft && vuRight) {
        const leftLevel = 30 + Math.random() * 40;
        const rightLevel = 30 + Math.random() * 40;
        
        vuLeft.style.height = leftLevel + '%';
        vuRight.style.height = rightLevel + '%';
    }
}

// Update VU meters periodically
setInterval(updateAudioVisualization, 100);

// Initialize canvas when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCanvas);
} else {
    initCanvas();
}

// Drag and drop for files
function initDragDrop() {
    const body = document.body;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        body.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    body.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            handleFiles(files);
        }
    }
    
    function handleFiles(files) {
        showToast(`${files.length} file(s) dropped`, 'success');
    }
}

initDragDrop();

// Storage utilities
const Storage = {
    get: function(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },
    
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    remove: function(key) {
        localStorage.removeItem(key);
    },
    
    clear: function() {
        localStorage.clear();
    }
};

// Project management
const ProjectManager = {
    current: null,
    
    create: function(name, settings = {}) {
        const project = {
            id: Date.now(),
            name: name,
            settings: {
                resolution: settings.resolution || '1920x1080',
                fps: settings.fps || 24,
                aspectRatio: settings.aspectRatio || '16:9'
            },
            timeline: {
                tracks: [],
                duration: 0
            },
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        };
        
        return project;
    },
    
    save: function(project) {
        const projects = Storage.get('nexoraProjects', []);
        const index = projects.findIndex(p => p.id === project.id);
        
        if (index >= 0) {
            projects[index] = project;
        } else {
            projects.push(project);
        }
        
        Storage.set('nexoraProjects', projects);
        return project;
    },
    
    load: function(id) {
        const projects = Storage.get('nexoraProjects', []);
        return projects.find(p => p.id === id);
    },
    
    delete: function(id) {
        let projects = Storage.get('nexoraProjects', []);
        projects = projects.filter(p => p.id !== id);
        Storage.set('nexoraProjects', projects);
    },
    
    list: function() {
        return Storage.get('nexoraProjects', []);
    }
};

// Utility functions
const Utils = {
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },
    
    formatDuration: function(frames, fps) {
        const totalSeconds = frames / fps;
        const hours = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = Math.floor(totalSeconds % 60);
        const f = frames % fps;
        
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
    },
    
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    
    lerp: function(start, end, t) {
        return start + (end - start) * t;
    }
};

// Clip helper
function createClip(type, name, startTime, duration, track = 0) {
    return {
        id: Utils.generateId(),
        type: type,
        name: name,
        startTime: startTime,
        duration: duration,
        endTime: startTime + duration,
        track: track,
        effects: [],
        keyframes: [],
        properties: {
            scale: 100,
            rotation: 0,
            opacity: 100,
            x: 0,
            y: 0
        }
    };
}

// Export helper
function exportProject(settings) {
    return new Promise((resolve, reject) => {
        showToast('Starting export...', 'success');
        
        // Simulate export process
        setTimeout(() => {
            resolve({
                success: true,
                file: 'export_' + Date.now() + '.mp4'
            });
        }, 2000);
    });
}

// Make functions globally available
window.showToast = showToast;
window.closeModal = closeModal;
window.openModal = openModal;
window.togglePlay = togglePlay;
window.saveProject = saveProject;
window.ProjectManager = ProjectManager;
window.Utils = Utils;
window.Storage = Storage;

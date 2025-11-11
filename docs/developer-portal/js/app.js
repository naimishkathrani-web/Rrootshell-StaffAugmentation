// Application State
let currentSection = 'home';
let currentMockupCategory = 'all';
let currentTaskFilter = 'all';
let tasks = [...tasksData];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadMockups();
    loadRequirements();
    loadTasks();
    initializeModals();
    initializeTaskForm();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            navigateToSection(targetSection);
        });
    });

    // Quick mockup access button
    const quickMockupBtn = document.getElementById('quickMockupBtn');
    quickMockupBtn.addEventListener('click', () => {
        navigateToSection('mockups');
    });
}

function navigateToSection(sectionId) {
    // Update active section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    currentSection = sectionId;
}

// Mockups Section
function loadMockups(category = 'all') {
    const gallery = document.getElementById('mockupGallery');
    gallery.innerHTML = '';

    const filteredMockups = category === 'all' 
        ? mockupsData 
        : mockupsData.filter(m => m.category === category);

    filteredMockups.forEach(mockup => {
        const mockupCard = createMockupCard(mockup);
        gallery.appendChild(mockupCard);
    });

    // Initialize category buttons
    if (category === currentMockupCategory) {
        initializeCategoryButtons();
    }
}

function createMockupCard(mockup) {
    const card = document.createElement('div');
    card.className = 'mockup-card';
    card.dataset.mockupId = mockup.id;
    
    card.innerHTML = `
        <div class="mockup-thumbnail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
        </div>
        <div class="mockup-info">
            <h3>${mockup.title}</h3>
            <p>${mockup.description}</p>
            <div class="mockup-meta">
                <span>Category: ${mockup.category}</span>
                <span>Updated: ${mockup.lastUpdated}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        openMockupModal(mockup);
    });

    return card;
}

function initializeCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            currentMockupCategory = category;
            loadMockups(category);
        });
    });
}

// Requirements Section
function loadRequirements() {
    const nav = document.getElementById('requirementsNav');
    const content = document.getElementById('requirementsContent');
    
    nav.innerHTML = '';
    
    Object.keys(requirementsData).forEach((key, index) => {
        const module = requirementsData[key];
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = module.title;
        link.dataset.moduleKey = key;
        
        if (index === 0) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#requirementsNav a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            displayRequirementModule(key);
        });
        
        li.appendChild(link);
        nav.appendChild(li);
    });
    
    // Display first module by default
    const firstKey = Object.keys(requirementsData)[0];
    displayRequirementModule(firstKey);
}

function displayRequirementModule(moduleKey) {
    const content = document.getElementById('requirementsContent');
    const module = requirementsData[moduleKey];
    
    let html = `<div class="requirement-module">
        <h3>${module.title}</h3>`;
    
    module.items.forEach(item => {
        html += `
            <div class="requirement-item">
                <h4>${item.id}: ${item.title}</h4>
                <p>${item.description}</p>
                <div class="requirement-details">
                    <strong>Implementation Details:</strong>
                    <ul>
                        ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
}

// Tasks Section
function loadTasks(filter = 'all') {
    const pending = document.getElementById('pendingTasks');
    const inProgress = document.getElementById('inProgressTasks');
    const completed = document.getElementById('completedTasks');
    
    pending.innerHTML = '';
    inProgress.innerHTML = '';
    completed.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'daily') {
        filteredTasks = tasks.filter(t => t.type === 'daily');
    } else if (filter === 'weekly') {
        filteredTasks = tasks.filter(t => t.type === 'weekly');
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.status === 'completed');
    }
    
    filteredTasks.forEach(task => {
        const taskCard = createTaskCard(task);
        
        if (task.status === 'pending') {
            pending.appendChild(taskCard);
        } else if (task.status === 'in-progress') {
            inProgress.appendChild(taskCard);
        } else if (task.status === 'completed') {
            completed.appendChild(taskCard);
        }
    });
    
    initializeTaskFilters();
    initializeDragAndDrop();
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card ${task.type} ${task.status}`;
    card.dataset.taskId = task.id;
    card.draggable = true;
    
    card.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <span class="task-type-badge ${task.type}">${task.type}</span>
        </div>
        <div class="task-description">${task.description}</div>
        <div class="task-meta">
            <span class="task-assignee">👤 ${task.assignee}</span>
            <span class="task-due-date">📅 ${task.dueDate}</span>
        </div>
    `;
    
    return card;
}

function initializeTaskFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            currentTaskFilter = filter;
            loadTasks(filter);
        });
    });
}

function initializeDragAndDrop() {
    const taskCards = document.querySelectorAll('.task-card');
    const taskLists = document.querySelectorAll('.task-list');
    
    taskCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', card.innerHTML);
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', (e) => {
            card.classList.remove('dragging');
        });
    });
    
    taskLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        list.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            if (draggingCard) {
                const taskId = parseInt(draggingCard.dataset.taskId);
                const newStatus = list.id === 'pendingTasks' ? 'pending' 
                               : list.id === 'inProgressTasks' ? 'in-progress' 
                               : 'completed';
                
                updateTaskStatus(taskId, newStatus);
                loadTasks(currentTaskFilter);
            }
        });
    });
}

function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
    }
}

// Modal Management
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

function openMockupModal(mockup) {
    const modal = document.getElementById('mockupModal');
    const image = document.getElementById('modalMockupImage');
    const title = document.getElementById('modalMockupTitle');
    const desc = document.getElementById('modalMockupDesc');
    
    // Since we don't have actual images, we'll show a placeholder
    image.src = '';
    image.alt = mockup.title;
    image.style.display = 'none';
    
    title.textContent = mockup.title;
    desc.textContent = `${mockup.description}\n\nCategory: ${mockup.category}\nLast Updated: ${mockup.lastUpdated}\n\nNote: This is a placeholder. In production, actual mockup images will be displayed here from ${mockup.imageUrl}`;
    
    modal.classList.add('active');
}

// Task Form
function initializeTaskForm() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const taskForm = document.getElementById('taskForm');
    const cancelBtn = document.getElementById('cancelTaskBtn');
    
    addTaskBtn.addEventListener('click', () => {
        taskModal.classList.add('active');
    });
    
    cancelBtn.addEventListener('click', () => {
        taskModal.classList.remove('active');
        taskForm.reset();
    });
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newTask = {
            id: tasks.length + 1,
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            assignee: document.getElementById('taskAssignee').value,
            type: document.getElementById('taskType').value,
            status: 'pending',
            dueDate: document.getElementById('taskDueDate').value
        };
        
        tasks.push(newTask);
        loadTasks(currentTaskFilter);
        
        taskModal.classList.remove('active');
        taskForm.reset();
    });
}

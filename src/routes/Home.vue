<script setup>
import { ref, computed, onMounted } from 'vue';
import { contacts as initialContacts } from '../data';
import ContactCard from '../components/ContactCard.vue';


const search = ref('');

const contacts = ref([]);

onMounted(() => {
    const stored = JSON.parse(localStorage.getItem('contacts'));
    if (stored && stored.length > 0) {
        contacts.value = stored;
    } else {
        contacts.value = initialContacts;
        localStorage.setItem('contacts', JSON.stringify(initialContacts));
    }
});


const filteredContacts = computed(() => {
    if (!search.value) {
        return contacts.value.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }
    
    const searchTerm = search.value.toLowerCase();
    return contacts.value
        .filter(contact => {
           
            return (
                `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                (contact.company && contact.company.toLowerCase().includes(searchTerm)) ||
                (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (contact.title && contact.title.toLowerCase().includes(searchTerm))
            );
        })
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
});


const totalContacts = computed(() => contacts.value.length);
const companiesCount = computed(() => {
    const companies = contacts.value.map(c => c.company).filter(Boolean);
    return new Set(companies).size;
});


const recentContacts = computed(() => {
    return [...contacts.value]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
});
</script>

<template>
    <div class="home-page dashboard">
        
        <div class="dashboard-header mb-5">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h1 class="display-5 fw-bold text-white mb-2">Contact Dashboard</h1>
                    <p class="lead mb-0 text-light">
                        Welcome to your digital contact manager. Organize, search, and manage all your professional connections in one place.
                    </p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <router-link to="/new" class="btn btn-light btn-lg rounded-pill px-4 shadow-sm">
                        <i class="bi bi-plus-circle me-2"></i>Add New Contact
                    </router-link>
                </div>
            </div>
        </div>

       
        <div class="row mb-4 g-4">
            <div class="col-md-4">
                <div class="card stat-card bg-primary text-white shadow-sm border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase opacity-75 mb-1">Total Contacts</h6>
                                <h2 class="display-4 fw-bold mb-0">{{ totalContacts }}</h2>
                            </div>
                            <i class="bi bi-people display-4 opacity-75"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card stat-card bg-dark text-white shadow-sm border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase opacity-75 mb-1">Companies</h6>
                                <h2 class="display-4 fw-bold mb-0">{{ companiesCount }}</h2>
                            </div>
                            <i class="bi bi-building display-4 opacity-75"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card stat-card bg-success text-white shadow-sm border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase opacity-75 mb-1">Filtered</h6>
                                <h2 class="display-4 fw-bold mb-0">{{ filteredContacts.length }}</h2>
                            </div>
                            <i class="bi bi-eye display-4 opacity-75"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="card search-section shadow-sm border-0 mb-4">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-12">
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="bi bi-search text-primary"></i>
                            </span>
                            <input 
                                type="text" 
                                class="form-control border-start-0 ps-0" 
                                v-model="search" 
                                placeholder="Search by name, email, company, tags, or job title..."
                            />
                        </div>
                        <div class="mt-2">
                            <small class="text-muted">
                                <i class="bi bi-info-circle me-1"></i>
                                Search through all contact fields including tags 
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
        <div class="row mb-4 g-3">
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="mb-3"><i class="bi bi-clock-history text-primary me-2"></i>Recently Added</h5>
                        <div v-if="recentContacts.length > 0">
                            <div v-for="contact in recentContacts" :key="contact.id" 
                                 class="d-flex align-items-center mb-3 pb-2 border-bottom">
                                <div class="avatar-sm me-3">
                                    <div class="avatar-initials bg-light text-dark rounded-circle d-flex align-items-center justify-content-center">
                                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-0">{{ contact.lastName }} {{ contact.firstName }}</h6>
                                    <small class="text-muted">{{ contact.email }}</small>
                                </div>
                                <router-link :to="`/contact/${contact.id}`" class="btn btn-sm btn-outline-primary">
                                    View
                                </router-link>
                            </div>
                        </div>
                        <div v-else class="text-center py-3">
                            <p class="text-muted mb-0">No recent contacts</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="mb-3"><i class="bi bi-stars text-warning me-2"></i>Quick Actions</h5>
                        <div class="d-grid gap-2">
                            <router-link to="/new" class="btn btn-primary btn-lg rounded-pill">
                                <i class="bi bi-plus-circle me-2"></i>Add New Contact
                            </router-link>
                            <button @click="search = ''" class="btn btn-outline-secondary btn-lg rounded-pill">
                                <i class="bi bi-x-circle me-2"></i>Clear Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="row g-4">
            <div 
                v-for="contact in filteredContacts" 
                :key="contact.id" 
                class="col-lg-6"
            >
                <ContactCard :contact="contact" />
            </div>
        </div>

       
        <div v-if="filteredContacts.length === 0" class="text-center py-5">
            <div class="empty-state">
                <i class="bi bi-person-x display-1 text-muted mb-4"></i>
                <h3 class="mb-3">No contacts found</h3>
                <p class="text-muted mb-4">
                    {{ search ? 'No contacts match your search criteria. Try different keywords.' : 'Start building your network by adding your first contact!' }}
                </p>
                <div class="d-flex justify-content-center gap-3">
                    <button v-if="search" @click="search = ''" class="btn btn-outline-primary rounded-pill px-4">
                        Clear Search
                    </button>
                    <router-link to="/new" class="btn btn-primary rounded-pill px-4">
                        <i class="bi bi-plus-circle me-2"></i>Add Your First Contact
                    </router-link>
                </div>
            </div>
        </div>

       
        <footer class="mt-5 pt-4 border-top">
            <div class="row">
                <div class="col-md-6">
                    <p class="text-muted mb-0">
                        <i class="bi bi-c-circle me-1"></i> 
                        2025 Faozee Contact Book App. All rights reserved.
                    </p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="text-muted mb-0">
                        Made with <i class="bi bi-heart-fill text-danger"></i> using Vue.js
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.home-page {
    padding: 1rem 0;
}

.dashboard-header {
    padding: 2rem;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    border-radius: 15px;
    margin-bottom: 2rem !important;
}

.dashboard-header .lead {
    color: rgba(255, 255, 255, 0.9);
}

.text-light {
    color: #f8f9fa !important;
}

.stat-card {
    border-radius: 15px;
    transition: transform 0.3s ease;
    height: 100%;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.search-section {
    border-radius: 15px;
    background: #fff;
}

.search-section .input-group {
    border-radius: 12px;
    overflow: hidden;
}

.input-group-lg .form-control,
.input-group-lg .input-group-text {
    padding: 1rem 1.25rem;
    font-size: 1rem;
}

.form-control:focus {
    box-shadow: none;
    border-color: #3498db;
}

.empty-state {
    padding: 3rem 0;
}

.avatar-sm {
    width: 40px;
    height: 40px;
}

.avatar-initials {
    width: 40px;
    height: 40px;
    font-weight: bold;
    background-color: #e3f2fd;
    color: #1976d2;
}

footer {
    font-size: 0.9rem;
}


@media (max-width: 768px) {
    .dashboard-header {
        padding: 1.5rem;
        border-radius: 15px;
    }
    
    .display-5 {
        font-size: 2.2rem;
    }
    
    .display-4 {
        font-size: 2.5rem;
    }
    
    .stat-card {
        margin-bottom: 1rem;
    }
}
</style>
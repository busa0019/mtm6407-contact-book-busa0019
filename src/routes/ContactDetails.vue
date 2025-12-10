<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id; 
const contact = ref(null);


const load = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contact.value = contacts.find(c => c.id === id);
};

load();


const deleteContact = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts = contacts.filter(c => c.id !== id);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        router.push('/');
    }
};
</script>

<template>

<div v-if="contact" class="contact-details">
    <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/" class="text-decoration-none">
                            <i class="bi bi-house-door"></i> Home
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Contact Details</li>
                </ol>
            </nav>
            <h1 class="display-5 fw-bold mb-3">
                {{ contact.firstName }} {{ contact.lastName }}
                <span v-if="contact.title" class="text-muted fs-4"> | {{ contact.title }}</span>
            </h1>
            <p v-if="contact.company" class="text-muted mb-0">
                <i class="bi bi-building me-1"></i>{{ contact.company }}
            </p>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-header bg-white py-3">
                    <h5 class="mb-0">
                        <i class="bi bi-info-circle me-2 text-primary"></i>Contact Information
                    </h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="text-muted small">Email</label>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-envelope me-2 text-primary"></i>
                                <a :href="`mailto:${contact.email}`" class="text-decoration-none">
                                    {{ contact.email }}
                                </a>
                            </div>
                        </div>
                        <div v-if="contact.phone" class="col-md-6 mb-3">
                            <label class="text-muted small">Phone</label>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-telephone me-2 text-primary"></i>
                                <a :href="`tel:${contact.phone}`" class="text-decoration-none">
                                    {{ contact.phone }}
                                </a>
                            </div>
                        </div>
                        <div v-if="contact.company" class="col-md-6 mb-3">
                            <label class="text-muted small">Company</label>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-building me-2 text-primary"></i>
                                {{ contact.company }}
                            </div>
                        </div>
                        <div v-if="contact.location" class="col-md-6 mb-3">
                            <label class="text-muted small">Location</label>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-geo-alt me-2 text-primary"></i>
                                {{ contact.location }}
                            </div>
                        </div>
                        <div v-if="contact.website" class="col-md-6 mb-3">
                            <label class="text-muted small">Website</label>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-link-45deg me-2 text-primary"></i>
                                <a :href="contact.website" target="_blank" class="text-decoration-none">
                                    {{ contact.website }}
                                </a>
                            </div>
                        </div>
                        <div v-if="contact.createdAt" class="col-md-6 mb-3">
                            <label class="text-muted small">Added On</label>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-calendar me-2 text-primary"></i>
                                {{ new Date(contact.createdAt).toLocaleDateString() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="contact.notes" class="card shadow-sm border-0">
                <div class="card-header bg-white py-3">
                    <h5 class="mb-0">
                        <i class="bi bi-journal-text me-2 text-primary"></i>Notes
                    </h5>
                </div>
                <div class="card-body">
                    <p class="mb-0">{{ contact.notes }}</p>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-body">
                    <h6 class="mb-3">Quick Actions</h6>
                    <div class="d-grid gap-2">
                        <router-link 
                            :to="`/edit/${contact.id}`" 
                            class="btn btn-primary btn-lg rounded-pill"
                        >
                            <i class="bi bi-pencil me-2"></i>Edit Contact
                        </router-link>
                        <button 
                            @click="deleteContact" 
                            class="btn btn-outline-danger btn-lg rounded-pill"
                        >
                            <i class="bi bi-trash me-2"></i>Delete Contact
                        </button>
                        <router-link to="/" class="btn btn-outline-secondary btn-lg rounded-pill">
                            <i class="bi bi-arrow-left me-2"></i>Back to List
                        </router-link>
                    </div>
                </div>
            </div>

            <div v-if="contact.tags && contact.tags.length > 0" class="card shadow-sm border-0">
                <div class="card-header bg-white py-3">
                    <h6 class="mb-0">
                        <i class="bi bi-tags me-2 text-primary"></i>Tags
                    </h6>
                </div>
                <div class="card-body">
                    <div class="d-flex flex-wrap gap-2">
                        <span 
                            v-for="tag in contact.tags" 
                            :key="tag"
                            class="badge bg-primary bg-opacity-10 text-primary px-3 py-2"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-else class="text-center py-5">
    <i class="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
    <h3>Contact not found</h3>
    <p class="text-muted">The contact you're looking for doesn't exist.</p>
    <router-link to="/" class="btn btn-primary rounded-pill px-4">
        <i class="bi bi-arrow-left me-2"></i>Back to Home
    </router-link>
</div>
</template>

<style scoped>
.contact-details {
    padding: 1rem 0;
}

.breadcrumb {
    background-color: transparent;
    padding: 0;
}

.card {
    border-radius: 12px;
    overflow: hidden;
}

.badge {
    border-radius: 20px;
    font-weight: 500;
}

.contact-banner .banner-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
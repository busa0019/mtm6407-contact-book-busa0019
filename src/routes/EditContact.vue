<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const contact = ref(null);


const load = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const foundContact = contacts.find(c => c.id === id);
    if (foundContact) {
    
        contact.value = {
            ...foundContact,
            tags: foundContact.tags ? foundContact.tags.join(', ') : ''
        };
    }
};

load();

const updateContact = () => {

    const tagsArray = contact.value.tags 
        ? contact.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];
    
    const contactToSave = {
        ...contact.value,
        tags: tagsArray
    };

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts[index] = contactToSave;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        router.push(`/contact/${id}`);
    }
};
</script>

<template>
<div class="edit-contact-page">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none">
                    <i class="bi bi-house-door"></i> Home
                </router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link :to="`/contact/${id}`" class="text-decoration-none">
                    Contact Details
                </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Edit Contact</li>
        </ol>
    </nav>

    <div v-if="contact" class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-4">
                    <h1 class="h3 mb-0">
                        <i class="bi bi-pencil-square me-2 text-primary"></i>
                        Edit Contact
                    </h1>
                    <p class="text-muted mb-0 mt-2">Update the contact information below</p>
                </div>
                <div class="card-body p-4">
                    <form @submit.prevent="updateContact" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-person me-1"></i>First Name *
                            </label>
                            <input 
                                class="form-control form-control-lg" 
                                v-model="contact.firstName" 
                                required 
                                placeholder="John"
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-person me-1"></i>Last Name *
                            </label>
                            <input 
                                class="form-control form-control-lg" 
                                v-model="contact.lastName" 
                                required 
                                placeholder="Doe"
                            />
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-envelope me-1"></i>Email *
                            </label>
                            <input 
                                class="form-control form-control-lg" 
                                type="email" 
                                v-model="contact.email" 
                                required 
                                placeholder="john@example.com"
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-telephone me-1"></i>Phone
                            </label>
                            <input 
                                class="form-control form-control-lg" 
                                v-model="contact.phone" 
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-briefcase me-1"></i>Title
                            </label>
                            <input 
                                class="form-control" 
                                v-model="contact.title" 
                                placeholder="Senior Developer"
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-building me-1"></i>Company
                            </label>
                            <input 
                                class="form-control" 
                                v-model="contact.company" 
                                placeholder="TechCorp Inc."
                            />
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-geo-alt me-1"></i>Location
                            </label>
                            <input 
                                class="form-control" 
                                v-model="contact.location" 
                                placeholder="San Francisco, CA"
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-link-45deg me-1"></i>Website
                            </label>
                            <input 
                                class="form-control" 
                                v-model="contact.website" 
                                type="url"
                                placeholder="https://example.com"
                            />
                        </div>
                        
                        <div class="col-12">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-tags me-1"></i>Tags
                            </label>
                            <input 
                                class="form-control" 
                                v-model="contact.tags" 
                                placeholder="work, developer, tech (comma separated)"
                            />
                            <small class="text-muted">Enter tags separated by commas</small>
                        </div>
                        
                        <div class="col-12">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-journal-text me-1"></i>Notes
                            </label>
                            <textarea 
                                class="form-control" 
                                v-model="contact.notes" 
                                rows="4" 
                                placeholder="Add any notes about this contact..."
                            ></textarea>
                        </div>
                        
                        <div class="col-12 mt-4">
                            <div class="d-flex gap-3">
                                <button type="submit" class="btn btn-primary btn-lg rounded-pill px-5">
                                    <i class="bi bi-check-circle me-2"></i>Save Changes
                                </button>
                                <router-link 
                                    :to="`/contact/${id}`" 
                                    class="btn btn-outline-secondary btn-lg rounded-pill px-5"
                                >
                                    Cancel
                                </router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <div v-else class="text-center py-5">
        <i class="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
        <h3>Contact not found</h3>
        <p class="text-muted">The contact you're trying to edit doesn't exist.</p>
        <router-link to="/" class="btn btn-primary rounded-pill px-4">
            <i class="bi bi-arrow-left me-2"></i>Back to Home
        </router-link>
    </div>
</div>
</template>

<style scoped>
.edit-contact-page {
    padding: 1rem 0;
}

.form-control-lg {
    border-radius: 10px;
    padding: 0.75rem 1rem;
}

.form-control:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}

.card {
    border-radius: 15px;
}
</style>
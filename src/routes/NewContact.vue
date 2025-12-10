<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const title = ref('');
const company = ref('');
const location = ref('');
const website = ref('');
const tags = ref('');
const notes = ref('');


const saveContact = () => {

    const tagsArray = tags.value 
        ? tags.value.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

    const newContact = {
        id: Date.now().toString(), 
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        title: title.value,
        company: company.value,
        location: location.value,
        website: website.value,
        tags: tagsArray,
        notes: notes.value,
        createdAt: new Date().toISOString()
    };

 
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    router.push(`/contact/${newContact.id}`);
}
</script>

<template>
<div class="new-contact-page">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none">
                    <i class="bi bi-house-door"></i> Home
                </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Add New Contact</li>
        </ol>
    </nav>

    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-4">
                    <h1 class="h3 mb-0">
                        <i class="bi bi-person-plus me-2 text-success"></i>
                        Add New Contact
                    </h1>
                    <p class="text-muted mb-0 mt-2">Fill in the contact information below</p>
                </div>
                <div class="card-body p-4">
                    <form @submit.prevent="saveContact" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-person me-1"></i>First Name *
                            </label>
                            <input 
                                class="form-control form-control-lg" 
                                v-model="firstName" 
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
                                v-model="lastName" 
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
                                v-model="email" 
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
                                v-model="phone" 
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-briefcase me-1"></i>Title
                            </label>
                            <input 
                                class="form-control" 
                                v-model="title" 
                                placeholder="Senior Developer"
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-building me-1"></i>Company
                            </label>
                            <input 
                                class="form-control" 
                                v-model="company" 
                                placeholder="TechCorp Inc."
                            />
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-geo-alt me-1"></i>Location
                            </label>
                            <input 
                                class="form-control" 
                                v-model="location" 
                                placeholder="San Francisco, CA"
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-link-45deg me-1"></i>Website
                            </label>
                            <input 
                                class="form-control" 
                                v-model="website" 
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
                                v-model="tags" 
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
                                v-model="notes" 
                                rows="4" 
                                placeholder="Add any notes about this contact..."
                            ></textarea>
                        </div>
                        
                        <div class="col-12 mt-4">
                            <div class="d-flex gap-3">
                                <button type="submit" class="btn btn-success btn-lg rounded-pill px-5">
                                    <i class="bi bi-plus-circle me-2"></i>Create Contact
                                </button>
                                <router-link to="/" class="btn btn-outline-secondary btn-lg rounded-pill px-5">
                                    Cancel
                                </router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.new-contact-page {
    padding: 1rem 0;
}

.form-control-lg {
    border-radius: 10px;
    padding: 0.75rem 1rem;
}

.form-control:focus {
    border-color: var(--bs-success);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
}

.card {
    border-radius: 15px;
}
</style>
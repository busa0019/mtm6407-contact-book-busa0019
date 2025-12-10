<script setup>
defineProps(['contact']);
</script>

<template>
  <div class="contact-card card border-0 shadow-sm h-100 transition-all">
    <div class="card-body p-4 d-flex flex-column">
      <!-- Contact Header -->
      <div class="d-flex align-items-start mb-3">
        <!-- Avatar with Better Contrast -->
        <div class="contact-avatar me-3">
          <div class="avatar-placeholder" :class="getAvatarColor(contact.firstName)">
            {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
          </div>
        </div>
        
        <!-- Contact Info -->
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="mb-1 fw-bold text-dark">
                {{ contact.lastName }}, {{ contact.firstName }}
              </h5>
              <p v-if="contact.title" class="text-muted small mb-2">
                <i class="bi bi-briefcase me-1"></i>{{ contact.title }}
              </p>
            </div>
            <router-link 
              :to="`/contact/${contact.id}`" 
              class="btn btn-sm btn-light rounded-circle shadow-sm"
              title="View Details"
            >
              <i class="bi bi-arrow-right text-primary"></i>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Contact Details -->
      <div class="contact-details mb-3">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-envelope me-2 text-primary"></i>
          <a :href="`mailto:${contact.email}`" class="text-decoration-none text-dark small">
            {{ contact.email }}
          </a>
        </div>
        
        <div v-if="contact.phone" class="d-flex align-items-center mb-2">
          <i class="bi bi-telephone me-2 text-success"></i>
          <a :href="`tel:${contact.phone}`" class="text-decoration-none text-dark small">
            {{ contact.phone }}
          </a>
        </div>
        
        <div v-if="contact.company" class="d-flex align-items-center mb-2">
          <i class="bi bi-building me-2 text-info"></i>
          <span class="text-dark small">{{ contact.company }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="contact.tags && contact.tags.length > 0" class="mt-auto">
        <div class="d-flex flex-wrap gap-1">
          <span 
            v-for="tag in contact.tags.slice(0, 3)" 
            :key="tag"
            class="badge bg-light text-dark px-2 py-1 small border"
          >
            #{{ tag }}
          </span>
          <span v-if="contact.tags.length > 3" class="badge bg-light text-muted px-2 py-1 small border">
            +{{ contact.tags.length - 3 }}
          </span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
        <small class="text-muted">
          <i class="bi bi-calendar me-1"></i>
          {{ new Date(contact.createdAt).toLocaleDateString('short') }}
        </small>
        <div class="btn-group">
          <router-link 
            :to="`/edit/${contact.id}`" 
            class="btn btn-sm btn-outline-primary rounded"
            title="Edit Contact"
          >
            <i class="bi bi-pencil"></i>
          </router-link>
          <router-link 
            :to="`/contact/${contact.id}`" 
            class="btn btn-sm btn-outline-success rounded ms-1"
            title="View Details"
          >
            <i class="bi bi-eye"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getAvatarColor(firstName) {
      const colors = [
        'bg-primary text-white',
        'bg-success text-white',
        'bg-info text-white',
        'bg-warning text-dark',
        'bg-danger text-white',
        'bg-secondary text-white',
        'bg-dark text-white'
      ];
      
      const index = firstName.charCodeAt(0) % colors.length;
      return colors[index];
    }
  }
}
</script>

<style scoped>
.contact-card {
  border-radius: 15px;
  border-left: 4px solid var(--bs-primary);
  transition: all 0.3s ease;
  background: white;
  position: relative;
  overflow: hidden;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-avatar .avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.contact-details a:hover {
  color: #1976d2 !important;
}

.badge {
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.badge:hover {
  transform: translateY(-1px);
}

.btn-outline-primary, .btn-outline-success {
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
}

.btn-outline-primary:hover {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.btn-outline-success:hover {
  background: #388e3c;
  border-color: #388e3c;
  color: white;
}

.btn-light {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.btn-light:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}
</style>
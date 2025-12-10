<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container-fluid px-4">
      <RouterLink class="navbar-brand fw-bold d-flex align-items-center" to="/">
        <div class="brand-logo me-2">
          <div class="logo-icon">
            <i class="bi bi-journal-text"></i>
          </div>
        </div>
        <span class="brand-text">Contact<span class="text-primary">Hub</span></span>
      </RouterLink>
      
      <button 
        class="navbar-toggler border-0" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item mx-2">
            <RouterLink class="nav-link d-flex align-items-center py-3" to="/">
              <i class="bi bi-grid-1x2 me-2"></i>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li class="nav-item mx-2">
            <RouterLink class="nav-link d-flex align-items-center py-3" to="/new">
              <i class="bi bi-person-plus me-2"></i>
              <span>New Contact</span>
            </RouterLink>
          </li>
          <li class="nav-item mx-2">
            <div class="user-profile">
              <div class="profile-avatar bg-primary bg-opacity-10 text-primary">
                <i class="bi bi-person"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0.5rem 0;
  background: white !important;
}

.brand-logo .logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.nav-link {
  color: #666 !important;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #764ba2 !important;
  background: rgba(118, 75, 162, 0.05);
}

.nav-link.router-link-exact-active {
  color: #764ba2 !important;
  font-weight: 600;
  background: rgba(118, 75, 162, 0.1);
}

.user-profile .profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-profile .profile-avatar:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.05);
}

/* Responsive navbar */
@media (max-width: 992px) {
  .navbar-nav {
    padding: 1rem 0;
  }
  
  .nav-item {
    margin: 0.5rem 0;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
  }
}
</style>
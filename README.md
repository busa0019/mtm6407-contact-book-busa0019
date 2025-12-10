# 📒 Contact Book Application

A modern, responsive contact management application built with **Vue.js
3**, featuring full **CRUD** operations, **local storage** persistence,
and a beautiful dashboard interface.

## 🚀 Live Demo

[View Live Application](https://grand-gnome-999645.netlify.app/)

## 📋 Features

### ✅ Core Requirements Met

-   **View Contacts:** Display all contacts alphabetically by last name
-   **Search & Filter:** Search contacts by name, email, company, or
    tags
-   **Contact Details:** View complete contact information
-   **Add Contacts:** Create new contacts with comprehensive forms
-   **Edit Contacts:** Update existing contact information
-   **Delete Contacts:** Remove contacts with confirmation
-   **Local Storage:** All data persists in browser storage
-   **Vue Router:** Smooth navigation between views

### 🎨 Enhanced Features

-   **Dashboard Layout:** Modern dashboard with statistics cards
-   **Responsive Design:** Works perfectly on mobile, tablet, and
    desktop
-   **Advanced Search:** Search across all contact fields (name, email,
    company, tags, title)
-   **Tag System:** Organize contacts with customizable tags
-   **Recent Contacts:** Quick access to recently added contacts
-   **Visual Feedback:** Toast notifications and loading states
-   **Professional UI:** Bootstrap 5 with custom styling

## 🛠️ Technologies Used

-   **Vue.js 3** - Frontend framework
-   **Vue Router 4** - Client-side routing
-   **Vite** - Build tool
-   **Bootstrap 5** - Responsive CSS framework
-   **Bootstrap Icons** - Icon library
-   **Local Storage API** - Persistence layer

## 📁 Project Structure

``` text
src/
├── components/           
│   ├── ContactCard.vue   
│   └── Header.vue        
├── routes/               
│   ├── Home.vue          
│   ├── NewContact.vue    
│   ├── EditContact.vue   
│   └── ContactDetails.vue
├── utils/
│   └── router.js         
├── data/
│   └── index.js          
├── css/
│   └── main.css          
├── App.vue               
└── main.js               
```

## ⚡ Quick Start

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    `bash    git clone https://github.com/busa0019/mtm6407-contact-book-busa0019.git                                                                   cd mtm6407-contact-book-busa0019`
    
3.  **Install dependencies** `bash     npm install`
4.  **Run development server** `bash     npm run dev`

Open in browser:

    http://localhost:5173

### Building for Production

``` bash
npm run build
```

## 📱 How to Use

### **1. Viewing Contacts**

-   Contacts appear on the home dashboard
-   Sorted alphabetically by last name
-   Use search bar to filter contacts

### **2. Adding a Contact**

-   Navigate to **Add Contact**\
-   Fill required fields (First Name, Last Name, Email)
-   Add optional fields (Phone, Company, Tags, etc.)
-   Click **Create Contact**

### **3. Editing a Contact**

-   Open a contact
-   Click **Edit**
-   Modify details
-   Click **Save Changes**

### **4. Deleting a Contact**

-   Open a contact
-   Click **Delete**
-   Confirm removal

### **5. Searching Contacts**

-   Search by: Name, Email, Company, Tags, Job Title
-   Clear search with **X button** or "Clear Search" button

## 💾 Data Persistence

-   **Local Storage**: All contacts are automatically saved to your browser's local storage
-   **Sample Data**: On the first visit, 5 sample contacts are loaded
-   **Persistence**: Contacts remain even after closing the browser

## 🎨 Design Features

### **Dashboard**

-   Stats cards (Total Contacts, Companies)
-   Recent contacts preview
-   Modern grid layout

### **Contact Cards**

-   Initials-based avatars
-   Quick action buttons
-   Tag badges
-   Responsive grid layout

### **Contact Details**

-   Full information display
-   Tags with badges
-   Clean header section

## 🔧 Technical Implementation

### Vue 3 Composition API

-   `ref`, `computed`, `onMounted`
-   Component-based structure
-   Props + event communication

### Vue Router 4

-   Routes: `/`, `/new`, `/edit/:id`, `/contact/:id`
-   Dynamic routing with params

### Local Storage Usage

``` javascript
localStorage.setItem('contacts', JSON.stringify(contacts));
const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
```

### Responsive Design

-   Bootstrap grid
-   Mobile-first layouts
-   Collapsible navigation

## 🧪 Testing the Application

To confirm everything works:

-   Add a new contact
-   Search for it
-   Edit and update fields
-   Delete a contact
-   Refresh page → Data should persist
-   Resize browser → Responsive behavior

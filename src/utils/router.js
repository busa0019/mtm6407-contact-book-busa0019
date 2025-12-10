import { createRouter, createWebHistory } from 'vue-router';

import Home from '../routes/Home.vue';
import NewContact from '../routes/NewContact.vue';
import EditContact from '../routes/EditContact.vue';
import ContactDetails from '../routes/ContactDetails.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            component: Home
        },
        {
            path: '/new', 
            component: NewContact
        },
        {
            path: '/edit/:id', 
            component: EditContact
        },
        {
            path: '/contact/:id', 
            component: ContactDetails
        }
    ]
})

export default router;
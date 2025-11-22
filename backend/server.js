const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Pre-set admin credentials
const ADMIN_CREDENTIALS = {
    email: "admin@kk.com",
    password: "admin123"
};

// Projects storage
const PROJECTS_FILE = path.join(__dirname, 'projects.json');

// Initialize projects file if it doesn't exist
if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify([]));
}

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        res.json({ 
            success: true, 
            message: "Login successful!",
            redirectUrl: "/admin.html"
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Invalid email or password" 
        });
    }
});

// Get all projects
app.get('/api/projects', (req, res) => {
    try {
        const projectsData = fs.readFileSync(PROJECTS_FILE, 'utf8');
        const projects = JSON.parse(projectsData);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error reading projects" });
    }
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
    try {
        const projectId = req.params.id;
        const projectsData = fs.readFileSync(PROJECTS_FILE, 'utf8');
        let projects = JSON.parse(projectsData);
        
        projects = projects.filter(project => project.id !== projectId);
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error deleting project" });
    }
});

// Add new project
app.post('/api/projects', (req, res) => {
    try {
        const { title, description, imageUrl, projectLink, githubLink, category } = req.body;
        
        const projectsData = fs.readFileSync(PROJECTS_FILE, 'utf8');
        const projects = JSON.parse(projectsData);
        
        const newProject = {
            id: Date.now().toString(),
            title,
            description,
            imageUrl,
            projectLink,
            githubLink: githubLink || '', // Ensure githubLink is always present
            category,
            createdAt: new Date().toISOString()
        };
        
        projects.push(newProject);
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
        
        res.json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ error: "Error saving project" });
    }
});

// Contact storage
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Initialize contacts file if it doesn't exist
if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]));
}

// Handle contact form submission (SINGLE ENDPOINT - REMOVED DUPLICATE)
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        console.log('Received contact form submission:', { name, email, subject, message });
        
        const contactsData = fs.readFileSync(CONTACTS_FILE, 'utf8');
        const contacts = JSON.parse(contactsData);
        
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            subject,
            message,
            createdAt: new Date().toISOString(),
            read: false
        };
        
        contacts.push(newContact);
        fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
        
        console.log('Contact message saved successfully');
        
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: "Error sending message" });
    }
});

// Get all contact messages
app.get('/api/contacts', (req, res) => {
    try {
        const contactsData = fs.readFileSync(CONTACTS_FILE, 'utf8');
        const contacts = JSON.parse(contactsData);
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Error reading contacts" });
    }
});

// Mark message as read
app.put('/api/contacts/:id/read', (req, res) => {
    try {
        const contactId = req.params.id;
        const contactsData = fs.readFileSync(CONTACTS_FILE, 'utf8');
        let contacts = JSON.parse(contactsData);
        
        contacts = contacts.map(contact => 
            contact.id === contactId ? { ...contact, read: true } : contact
        );
        
        fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ error: "Error updating contact" });
    }
});

// Delete contact message
app.delete('/api/contacts/:id', (req, res) => {
    try {
        const contactId = req.params.id;
        const contactsData = fs.readFileSync(CONTACTS_FILE, 'utf8');
        let contacts = JSON.parse(contactsData);
        
        contacts = contacts.filter(contact => contact.id !== contactId);
        fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error deleting contact" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
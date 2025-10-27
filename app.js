// --- ALL IMPORTS ARE AT THE TOP ---
import { auth, db } from "./firebaseauth.js"; // Import the initialized instances
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { 
    getAllItemsFromFirestore, 
    getUserItemsFromFirestore, 
    saveItemToFirestore,
    softDeleteItemInFirestore
} from "./firebaseauth.js";

// --- Image Local Storage Helpers ---
function saveImageToLocal(itemId, base64Data) {
    if (!itemId || !base64Data) return;
    try {
        localStorage.setItem(`img_${itemId}`, base64Data);
    } catch (e) {
        console.error("Failed to save image to localStorage (quota exceeded?):", e);
    }
}

function getImageFromLocal(itemId) {
    if (!itemId) return null;
    return localStorage.getItem(`img_${itemId}`);
}

function removeImageFromLocal(itemId) {
    if (!itemId) return;
    localStorage.removeItem(`img_${itemId}`);
}
// --- End of Helpers ---

const studentDatabase = [
    {enrollment: '231130146001', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146002', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146003', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146004', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146005', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146006', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146007', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146008', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146009', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146010', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146011', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146012', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146013', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146014', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146015', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146016', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146017', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146018', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146019', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146020', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146021', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146022', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146023', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146024', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146025', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146026', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146027', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146028', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146001', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146002', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146003', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146004', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146005', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146006', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146007', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146008', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146009', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146010', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146011', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146012', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146013', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146014', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146015', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146016', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146017', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146018', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146019', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146020', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146021', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146022', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146023', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146024', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146025', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146026', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146027', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146028', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'}
];

let currentUser = null; // Removed the localStorage logic, onAuthStateChanged will handle this.

// This master listener controls the entire application flow
onAuthStateChanged(auth, async (user) => {
    if (user) { // User is logged in
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists() && docSnap.data().enrollmentId) {
            // User is enrolled, show the main app
            currentUser = { uid: user.uid, ...docSnap.data() };
            // Save to local storage for other functions
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('currentUserEmail', currentUser.email);
            
            document.getElementById('enrollment-page').classList.add('hidden');
            document.getElementById('navbar').classList.remove('hidden');
            // This 'main-content' ID might not exist in your HTML, but keeping it just in case
            const mainContent = document.getElementById('main-content');
            if (mainContent) mainContent.classList.remove('hidden');

            showPage('home');
            updateProfile();
        } else {
            // User is logged in but must enroll
            currentUser = { uid: user.uid, email: user.email, ...docSnap.data() };
            // Save to local storage for enrollment process
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('currentUserEmail', user.email);

            document.getElementById('enrollment-page').classList.remove('hidden');
            document.getElementById('navbar').classList.add('hidden');
            const mainContent = document.getElementById('main-content');
            if (mainContent) mainContent.classList.add('hidden');
        }
    } else { // User is logged out
        currentUser = null;
        localStorage.clear();
        if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
            window.location.href = 'index.html';
        }
    }
});

async function debugFirestoreItems() {
    try {
        const allItems = await getAllItemsFromFirestore();
        
        console.log('🔍 ALL FIRESTORE ITEMS:');
        allItems.forEach(item => {
            console.log('📄 Item:', {
                id: item.firestoreId, // Use the correct ID
                name: item.name,
                type: item.type,
                status: item.status,
                userId: item.userId,
                reporter: item.reporter
            });
        });
        
        // Also show current user info
        console.log('👤 Current User:', currentUser);
        console.log('🔑 Logged in User ID:', localStorage.getItem('loggedInUserId'));
        
        return allItems;
    } catch (error) {
        console.error('❌ Debug error:', error);
    }
}

// Make it available globally
window.debugFirestoreItems = debugFirestoreItems;

function checkEnrollmentEmailConflict(enrollmentId, userEmail) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    
    if (storedEnrollments[enrollmentId] && storedEnrollments[enrollmentId] !== userEmail) {
        return {
            conflict: true,
            existingEmail: storedEnrollments[enrollmentId]
        };
    }
    
    if (storedEnrollments[enrollmentId] === userEmail) {
        return { conflict: false };
    }
    
    return { conflict: false };
}

function saveEnrollmentEmail(enrollmentId, userEmail) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    storedEnrollments[enrollmentId] = userEmail;
    localStorage.setItem('enrollmentEmails', JSON.stringify(storedEnrollments));
}


function verifyEnrollment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const enrollmentId = formData.get('enrollmentId');
    const studentName = formData.get('studentName');

    const studentRecord = studentDatabase.find(student => student.enrollment === enrollmentId);
    
    if (studentRecord) {
        document.getElementById('branch').value = studentRecord.branch;
        document.getElementById('college').value = studentRecord.college;
        document.getElementById('semester').value = studentRecord.sem;
        
        const userEmail = localStorage.getItem('currentUserEmail');
        
        if (!userEmail) {
            alert('Error: User email not found. Please sign in again.');
            return;
        }
        
        window.tempUserEmail = userEmail;
        
        document.getElementById('verifyBtn').classList.add('hidden');
        document.getElementById('verificationButtons').classList.remove('hidden');
        
        window.tempUserData = {
            enrollmentId,
            name: studentName,
            branch: studentRecord.branch,
            college: studentRecord.college,
            semester: studentRecord.sem,
            email: userEmail
        };
    } else {
        alert('Enrollment ID not found. Please contact the administrator.');
    }
}

async function confirmDetails(isCorrect) {
    if (isCorrect) {
        const userId = localStorage.getItem('loggedInUserId');
        if (!userId) {
            alert("Critical Error: User ID not found. Please log in again.");
            logout();
            return;
        }

        try {
            // Show a loading state on the button
            const verifyButton = document.querySelector('#verificationButtons button:first-child');
            verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
            verifyButton.disabled = true;
            document.querySelector('#verificationButtons button:last-child').disabled = true;

            // Prepare user data from the temporary object created during verification
            const userDataToSave = {
                enrollmentId: window.tempUserData.enrollmentId,
                firstName: window.tempUserData.name, 
                branch: window.tempUserData.branch,
                college: window.tempUserData.college,
                semester: window.tempUserData.semester,
                lastUpdated: new Date().toISOString()
            };

            // Save the enrollment data to Firestore
            const userDocRef = doc(db, "users", userId);
            await setDoc(userDocRef, userDataToSave, { merge: true });

            // Also update the local enrollment-email mapping
            saveEnrollmentEmail(window.tempUserData.enrollmentId, window.tempUserData.email);

            // Reload the page to force onAuthStateChanged to run again
            window.location.reload();

        } catch (error) {
            console.error("Failed to save enrollment details:", error);
            alert("Error saving your details. Please try again. Error: " + error.message);
            // Re-enable buttons if saving fails
            const verifyButton = document.querySelector('#verificationButtons button:first-child');
            verifyButton.innerHTML = '<i class="fas fa-check mr-2"></i>Yes, these are my details';
            verifyButton.disabled = false;
            document.querySelector('#verificationButtons button:last-child').disabled = false;
        }

    } else {
        alert('Please contact:\nHOD: hod.cse@salcollege.edu\nCoordinator: coordinator.cse@salcollege.edu\nPhone: +91-XXXXXXXXXX');
    }
}

async function updateUserDataInFirestore() {
    try {
        const userId = localStorage.getItem('loggedInUserId');
        
        if (userId && currentUser) {
            const userDocRef = doc(db, "users", userId); 
            await setDoc(userDocRef, {
                email: currentUser.email,
                firstName: currentUser.name,
                enrollmentId: currentUser.enrollmentId,
                branch: currentUser.branch,
                college: currentUser.college,
                semester: currentUser.semester,
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

function showEmailConflictModal(existingEmail) {
    document.getElementById('existingEmail').textContent = existingEmail;
    document.getElementById('emailConflictModal').classList.remove('hidden');
    document.getElementById('emailConflictModal').classList.add('flex');
}

function closeEmailConflictModal() {
    document.getElementById('emailConflictModal').classList.add('hidden');
    document.getElementById('emailConflictModal').classList.remove('flex');
    document.getElementById('enrollmentForm').reset();
    document.getElementById('verifyBtn').classList.remove('hidden');
    document.getElementById('verificationButtons').classList.add('hidden');
}

function redirectToLogin() {
    closeEmailConflictModal();
    logout();
}

function showPage(pageId) {
    // Hide all main pages first
    const pages = ['home-page', 'report-found-page', 'report-lost-page', 'search-page', 'profile-page'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    // Show the target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Close the profile dropdown menu if it's open
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.add('hidden');
    }

    // Always fetch fresh data when navigating to a specific page
    if (pageId === 'home') {
        updateStatistics();
    } else if (pageId === 'search') {
        searchItems(); // This will load all items
    } else if (pageId === 'profile') {
        loadUserItems(); // This ensures the user's item list is always fresh
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function updateProfile() {
    if (currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEnrollment = document.getElementById('profileEnrollment');
        const profileDepartment = document.getElementById('profileDepartment');
        
        if (profileName) profileName.textContent = currentUser.name || currentUser.firstName; // Handle both name properties
        if (profileEnrollment) profileEnrollment.textContent = `Enrollment ID: ${currentUser.enrollmentId}`;
        if (profileDepartment) profileDepartment.textContent = `Branch: ${currentUser.branch} | Semester: ${currentUser.semester}`;
        
        loadUserItems();
    }
}

async function updateStatistics() {
    try {
        const allItems = await getAllItemsFromFirestore();
        
        const totalSubmissions = allItems.length;
        const totalFound = allItems.filter(item => item.type === 'found').length;
        const totalLost = allItems.filter(item => item.type === 'lost').length;
        const totalReturned = allItems.filter(item => item.status === 'returned').length;
        
        const totalSubmissionsEl = document.getElementById('totalSubmissions');
        const totalFoundEl = document.getElementById('totalFound');
        const totalLostEl = document.getElementById('totalLost');
        const totalReturnedEl = document.getElementById('totalReturned');
        
        if (totalSubmissionsEl) totalSubmissionsEl.textContent = totalSubmissions;
        if (totalFoundEl) totalFoundEl.textContent = totalFound;
        if (totalLostEl) totalLostEl.textContent = totalLost;
        if (totalReturnedEl) totalReturnedEl.textContent = totalReturned;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}
function previewImage(input, previewId) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    
    if (!file) return;

    // Size check
    if (file.size > 5 * 1024 * 1024) {
        alert('Image too large! Please use images smaller than 5MB.');
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        // Store base64 data directly on the input
        input._base64Data = e.target.result;
        
        // Update preview
        const img = preview.querySelector('img');
        if (img) {
            img.src = e.target.result;
        }
        preview.classList.remove('hidden');
        
        // Hide placeholder
        let placeholderId = '';
        if (inputId === 'foundItemImage') {
            placeholderId = 'foundImagePlaceholder';
        } else if (inputId === 'lostItemImage') {
            placeholderId = 'lostItemImagePlaceholder';
        }
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            placeholder.classList.add('hidden');
        }
    };
    reader.onerror = function() {
        alert('Error loading image. Please try a different image.');
        input.value = '';
    };
    reader.readAsDataURL(file);
}

function removeImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (input) {
        input.value = '';
        if (input._base64Data) {
            input._base64Data = null;
        }
    }
    
    if (preview) {
        preview.classList.add('hidden');
    }
    
    // Safely find and show the correct placeholder
    let placeholderId = '';
    if (inputId === 'foundItemImage') {
        placeholderId = 'foundImagePlaceholder';
    } else if (inputId === 'lostItemImage') {
        placeholderId = 'lostItemImagePlaceholder';
    }

    if (placeholderId) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            placeholder.classList.remove('hidden');
        } else {
            console.warn(`Warning: Placeholder element with ID '${placeholderId}' not found.`);
        }
    }
}

async function submitFoundItem(event) {
    event.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
        showErrorModal('You must be logged in to report an item.');
        return;
    }

    const formData = new FormData(event.target);
    const imageInput = document.getElementById('foundItemImage');
    const imageBase64Data = imageInput?._base64Data || null;

    // 1. Create item object WITHOUT imageBase64
    const item = {
        type: 'found',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateFound'),
        contact: formData.get('contactInfo'),
        userId: user.uid,
        reporter: currentUser?.name || currentUser?.firstName || 'User',
        reporterId: currentUser?.enrollmentId || 'N/A',
        status: 'active'
    };

    try {
        // 2. Save to Firestore, which returns the REAL Firestore-generated ID
        const firestoreId = await saveItemToFirestore(item);

        // 3. Use the REAL ID to save the image locally
        if (firestoreId && imageBase64Data) {
            saveImageToLocal(firestoreId, imageBase64Data);
        }

        showSuccessModal('Found item reported successfully!');
        updateStatistics();
        event.target.reset();
        removeImage('foundItemImage', 'foundImagePreview');
    } catch (error) {
        showErrorModal('Error saving item: ' + error.message);
    }
}


async function submitLostItem(event) {
    event.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
        showErrorModal('You must be logged in to report an item.');
        return;
    }

    const formData = new FormData(event.target);
    const imageInput = document.getElementById('lostItemImage');
    const imageBase64Data = imageInput?._base64Data || null;
    
    // 1. Create item object WITHOUT imageBase64
    const item = {
        type: 'lost',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateLost'),
        contact: formData.get('contactInfo'),
        userId: user.uid,
        reporter: currentUser?.name || currentUser?.firstName || 'User',
        reporterId: currentUser?.enrollmentId || 'N/A',
        status: 'active'
    };

    try {
        // 2. Save to Firestore, which returns the REAL Firestore-generated ID
        const firestoreId = await saveItemToFirestore(item);

        // 3. Use the REAL ID to save the image locally
        if (firestoreId && imageBase64Data) {
            saveImageToLocal(firestoreId, imageBase64Data);
        }
        
        showSuccessModal('Lost item reported successfully!');
        updateStatistics();
        event.target.reset();
        removeImage('lostItemImage', 'lostImagePreview');
    } catch (error) {
        showErrorModal('Error saving item: ' + error.message);
    }
}
function debugAuth() {
    console.log('🔐 AUTH DEBUG INFO:');
    console.log('LoggedInUserId:', localStorage.getItem('loggedInUserId'));
    console.log('CurrentUserEmail:', localStorage.getItem('currentUserEmail'));
    console.log('CurrentUser:', currentUser);
}

// Call this in your browser console to check status
window.debugAuth = debugAuth;

async function searchItems() {
    const query = document.getElementById('searchQuery')?.value.toLowerCase() || '';
    const category = document.getElementById('searchCategory')?.value || '';
    const type = document.getElementById('searchType')?.value || '';
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i><p class="text-gray-600 mt-2">Loading...</p></div>';
    }
    try {
        let allItems = await getAllItemsFromFirestore();

        if (query) {
            allItems = allItems.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );
        }

        if (category) {
            allItems = allItems.filter(item => item.category === category);
        }

        if (type) {
            allItems = allItems.filter(item => item.type === type);
        }

        displaySearchResults(allItems, query);
    } catch (error) {
        console.error('Error fetching items:', error);
        displaySearchResults([], query);
    }
}

// --- THIS FUNCTION IS NOW FIXED TO USE LOCALSTORAGE IMAGES ---
function displaySearchResults(items, query = '') {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (items.length === 0) {
        resultsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No items found matching your search criteria.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = items.map(item => {
        // --- IMAGE FIX: Get image from localStorage using the REAL Firestore ID ---
        const localImage = getImageFromLocal(item.firestoreId);

        return `
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium ${
                    item.type === 'found' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }">
                    ${item.type === 'found' ? 'Found' : 'Lost'}
                </span>
                <span class="text-sm text-gray-500">${item.category}</span>
            </div>
            
            <div class="mb-4">
                ${localImage ? // --- IMAGE FIX: Use 'localImage' variable ---
    `<img src="${localImage}" alt="${item.name}" 
          class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer"
          onclick="openImageModal('${localImage}')">` :
    `<div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
        <i class="fas fa-image text-4xl text-gray-400"></i>
    </div>`
}
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-2">${highlightText(item.name, query)}</h3>
            <p class="text-gray-600 mb-4">${highlightText(item.description, query)}</p>
            
            <div class="space-y-2 text-sm text-gray-500">
                <div><i class="fas fa-user mr-2"></i><strong>Uploaded by:</strong> ${item.reporter}</div>
                <div><i class="fas fa-id-card mr-2"></i><strong>Enrollment:</strong> ${item.reporterId}</div>
                <div><i class="fas fa-map-marker-alt mr-2"></i><strong>Location:</strong> ${item.location}</div>
                <div><i class="fas fa-calendar mr-2"></i><strong>Date:</strong> ${new Date(item.date).toLocaleDateString()}</div>
            </div>
            
            <button onclick="contactReporter('${item.contact}')" 
                    class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-envelope mr-2"></i>Contact Reporter
            </button>
        </div>
    `}).join('');
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

async function loadUserItems() {
    console.log('👤 Loading user items...');
    
    if (!currentUser) {
        console.log('❌ No current user');
        return;
    }
    
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
        console.log('❌ No user ID found');
        return;
    }

    try {
        const userItems = await getUserItemsFromFirestore(userId);
        const container = document.getElementById('userItems');
        
        if (!container) {
            console.log('❌ User items container not found');
            return;
        }
        
        if (userItems.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">You haven't reported any items yet.</p>
                </div>
            `;
            console.log('ℹ️ No items to display');
        } else {
            const activeItems = userItems.filter(item => item.status !== 'archived');
            console.log('📋 Active items:', activeItems.length);
            
            container.innerHTML = activeItems.map(item => {
                
                const localImage = getImageFromLocal(item.firestoreId);

                return `
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200" data-item-id="${item.firestoreId}">
        <div class="flex items-center justify-between mb-2">
            <span class="px-3 py-1 rounded-full text-sm font-medium ${
                item.type === 'found' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
            }">
                ${item.type === 'found' ? 'Found' : 'Lost'}
            </span>
            <div class="flex space-x-2">
                ${item.status !== 'returned' ? `
                    <button onclick="markAsReturned('${item.firestoreId}')"
                        class="text-green-600 hover:text-green-800 transition-colors p-2 rounded-full hover:bg-green-50" 
                        title="Mark as Returned">
                        <i class="fas fa-check-circle"></i>
                    </button>
                ` : ''}
                <button onclick="softDeleteItem('${item.firestoreId}')"
                    class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-50" 
                    title="Delete Item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        
        <div class="mb-3">
            ${localImage ? 
                `<img src="${localImage}" alt="${item.name}" 
                      class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer"
                      onclick="openImageModal('${localImage}')">` :
                `<div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <i class="fas fa-image text-4xl text-gray-400"></i>
                </div>`
            }
        </div>
        
        <h4 class="font-semibold text-gray-800 text-lg">${item.name}</h4>
        <p class="text-sm text-gray-600 mb-2">${item.description}</p>
        <div class="text-xs text-gray-500 flex justify-between">
            <span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>
            <span><i class="fas fa-calendar mr-1"></i>${new Date(item.date).toLocaleDateString()}</span>
        </div>
        ${item.status === 'returned' ? `
            <div class="mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded text-center">
                <i class="fas fa-check mr-1"></i>Returned
            </div>
        ` : ''}
    </div>
`}).join('');
            
            console.log('✅ User items displayed');
        }
        
    } catch (error) {
        console.error('❌ Error loading user items:', error);
        const container = document.getElementById('userItems');
        if (container) {
            container.innerHTML = `
                <div class="text-center py-8 text-red-600">
                    <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                    <p>Error loading items: ${error.message}</p>
                </div>
            `;
        }
    }
}

function openImageModal(imageData) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="max-w-4xl max-h-full p-4">
            <div class="bg-white rounded-lg p-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Item Image</h3>
                    <button onclick="this.closest('.fixed').remove()" 
                            class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <img src="${imageData}" alt="Item Image" class="max-w-full max-h-96 object-contain rounded">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function contactReporter(contact) {
    alert(`Contact the reporter at: ${contact}`);
}

function showSuccessModal(message) {
    const successMessage = document.getElementById('successMessage');
    const successModal = document.getElementById('successModal');
    
    if (successMessage) successMessage.textContent = message;
    if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    }
}

function showErrorModal(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorModal = document.getElementById('errorModal');
    
    if (errorMessage) errorMessage.textContent = message;
    if (errorModal) {
        errorModal.classList.remove('hidden');
        errorModal.classList.add('flex');
    }
}

function closeErrorModal() {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
        errorModal.classList.add('hidden');
        errorModal.classList.remove('flex');
    }
}

async function logout() {
    try {
        await signOut(auth); // ✅ Properly sign out of Firebase session
        localStorage.clear(); // ✅ Clear all local data
        sessionStorage.clear();
        console.log("✅ Logged out successfully");
    } catch (error) {
        console.error("❌ Logout error:", error);
    } finally {
        // Redirect back to sign-in page
        window.location.href = "index.html";
    }
}
async function markAsReturned(itemId) {
    if (!confirm("Mark this item as returned?")) {
        return; 
    }

    try {
        const itemRef = doc(db, "lostFoundItems", itemId);
        
        await updateDoc(itemRef, {
            status: 'returned',
            returnedDate: new Date().toISOString()
        });
        
        removeImageFromLocal(itemId);
        showSuccessModal('Item has been marked as returned!');
        await loadUserItems(); 
        
    } catch (error) {
        console.error('Error marking as returned:', error);
        showErrorModal('Failed to update the item. Please try again.'); 
    }
}

async function deleteItem(itemId) {
    // This is a wrapper for soft-delete
    try {
        await softDeleteItemInFirestore(itemId); // Assumes this is in firebaseauth.js
        removeImageFromLocal(itemId);
        showSuccessModal('Item deleted successfully!');
        loadUserItems();
    } catch (error) {
        console.error('❌ Error deleting item:', error);
        showErrorModal(`Error deleting item: ${error.message}`);
    }
}

async function softDeleteItem(itemId) {
    if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
        return; // Stop if the user clicks cancel
    }
    
    try {
        const itemRef = doc(db, "lostFoundItems", itemId);
        
        await updateDoc(itemRef, {
            status: 'archived',
            archivedAt: new Date().toISOString()
        });
        
        removeImageFromLocal(itemId);
        showSuccessModal('Item deleted successfully!');
        await loadUserItems();
        
    } catch (error) {
        console.error('Error deleting item:', error);
        showErrorModal('Failed to delete the item. Please try again.');
    }
}

async function debugSubmission() {
    const user = auth.currentUser;
    console.log('🔍 DEBUG SUBMISSION:');
    console.log('Current User:', user);
    console.log('Local Storage User ID:', localStorage.getItem('loggedInUserId'));
    console.log('Current User Data:', currentUser);
    
    // Test Firestore connection
    const items = await getAllItemsFromFirestore();
    console.log('Total items in Firestore:', items.length);
}

// Call this in browser console to check status
window.debugSubmission = debugSubmission;

async function debugItemIds() {
    try {
        const allItems = await getAllItemsFromFirestore();
        
        console.log('🔍 ALL ITEM IDs IN DATABASE:');
        allItems.forEach(item => {
            console.log('📄 Item:', {
                id: item.firestoreId,
                name: item.name,
                type: item.type,
                status: item.status
            });
        });
        
        // Also check what IDs are in the current user's profile
        const userItemsContainer = document.getElementById('userItems');
        if (userItemsContainer) {
            const itemElements = userItemsContainer.querySelectorAll('[data-item-id]');
            console.log('🖥️ ITEM IDs IN UI:');
            itemElements.forEach(el => {
                console.log('UI Item ID:', el.getAttribute('data-item-id'));
            });
        }
        
    } catch (error) {
        console.error('❌ Debug error:', error);
    }
}

// Call this in browser console
window.debugItemIds = debugItemIds;

// --- MAKE SURE ALL FUNCTIONS ARE AVAILABLE GLOBALLY ---
// This exposes functions called by 'onclick' in your HTML
window.verifyEnrollment = verifyEnrollment;
window.confirmDetails = confirmDetails;
window.showPage = showPage;
window.toggleProfileMenu = toggleProfileMenu;
window.logout = logout;
window.previewImage = previewImage;
window.removeImage = removeImage;
window.submitFoundItem = submitFoundItem;
window.submitLostItem = submitLostItem;
window.searchItems = searchItems;
window.openImageModal = openImageModal;
window.contactReporter = contactReporter;
window.closeSuccessModal = closeSuccessModal;
window.closeErrorModal = closeErrorModal;
window.closeEmailConflictModal = closeEmailConflictModal;
window.redirectToLogin = redirectToLogin;
window.markAsReturned = markAsReturned;
window.softDeleteItem = softDeleteItem;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    // The onAuthStateChanged listener will handle the rest.
});

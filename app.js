
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


let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

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

function init() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => input.value = today);
    
    if (currentUser) {
        document.getElementById('enrollment-page').classList.add('hidden');
        document.getElementById('navbar').classList.remove('hidden');
        showPage('home');
        updateProfile();
        updateStatistics();
    }
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

function confirmDetails(isCorrect) {
    if (isCorrect) {
        const userEmail = localStorage.getItem('currentUserEmail');
        const enrollmentId = window.tempUserData.enrollmentId;
        
        if (!userEmail) {
            alert('Error: User email not found. Please sign in again.');
            return;
        }
        
        const conflictCheck = checkEnrollmentEmailConflict(enrollmentId, userEmail);
        
        if (conflictCheck.conflict) {
            showEmailConflictModal(conflictCheck.existingEmail);
            return;
        }
        
        currentUser = window.tempUserData;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        saveEnrollmentEmail(enrollmentId, userEmail);
        
        updateUserDataInFirestore();
        
        const buttons = document.querySelectorAll('#verificationButtons button');
        buttons[0].innerHTML = '<i class="fas fa-check mr-2"></i>Verified!';
        buttons[0].classList.add('success-animation');
        buttons[0].disabled = true;
        buttons[1].disabled = true;

        setTimeout(() => {
            document.getElementById('enrollment-page').classList.add('hidden');
            document.getElementById('navbar').classList.remove('hidden');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                showPage('home');
                updateProfile();
                updateStatistics();
                showSuccessModal('🎉 Welcome to SAL College Lost & Found System!');
            }, 300);
        }, 1000);
    } else {
        alert('Please contact:\nHOD: hod.cse@salcollege.edu\nCoordinator: coordinator.cse@salcollege.edu\nPhone: +91-XXXXXXXXXX');
    }
}

async function updateUserDataInFirestore() {
    try {
        const { getFirestore, doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js");
        const db = getFirestore();
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
    const pages = ['home-page', 'report-found-page', 'report-lost-page', 'search-page', 'profile-page'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.add('hidden');
    }

    if (pageId === 'home') {
        updateStatistics();
    } else if (pageId === 'search') {
        searchItems();
    } else if (pageId === 'profile') {
        loadUserItems();
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
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEnrollment) profileEnrollment.textContent = `Enrollment ID: ${currentUser.enrollmentId}`;
        if (profileDepartment) profileDepartment.textContent = `Branch: ${currentUser.branch} | Semester: ${currentUser.semester}`;
        
        loadUserItems();
    }
}

async function updateStatistics() {
    try {
        const { getAllItemsFromFirestore } = await import("./firebaseauth.js");
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
    const placeholder = document.getElementById(input.id.replace('Image', 'ImagePlaceholder'));
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            
            img.onload = function() {
                // Create canvas for compression
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set maximum dimensions (800x600 max)
                let width = img.width;
                let height = img.height;
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                
                // Calculate new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round((width * MAX_HEIGHT) / height);
                        height = MAX_HEIGHT;
                    }
                }
                
                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;
                
                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to compressed base64 (70% quality)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                
                // Show preview
                const previewImg = preview.querySelector('img');
                previewImg.src = compressedBase64;
                preview.classList.remove('hidden');
                placeholder.classList.add('hidden');
                
                // Store compressed image (now it's small KB size)
                input._base64Data = compressedBase64;
                
                console.log('Original size:', (file.size / 1024).toFixed(2), 'KB');
                console.log('Compressed size:', (compressedBase64.length / 1024).toFixed(2), 'KB');
            };
        };
        reader.readAsDataURL(file);
    }
}
function removeImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(inputId.replace('Image', 'ImagePlaceholder'));
    
    input.value = '';
    input._base64Data = null;
    preview.classList.add('hidden');
    placeholder.classList.remove('hidden');
}

async function submitFoundItem(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const imageInput = document.getElementById('foundItemImage');
    
    if (!currentUser) {
        showSuccessModal('Please log in again.');
        return;
    }

    const itemId = Date.now().toString();
    let imageBase64 = null;

    // Store image as base64 for immediate display
    if (imageInput._base64Data) {
        imageBase64 = imageInput._base64Data;
    }

    const item = {
        id: itemId,
        type: 'found',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateFound'),
        contact: formData.get('contactInfo'),
        reporter: currentUser.name,
        reporterId: currentUser.enrollmentId,
        reporterEmail: currentUser.email || localStorage.getItem('currentUserEmail'),
        imageBase64: imageBase64, // This will be visible to everyone
        timestamp: new Date().toISOString(),
        userId: localStorage.getItem('loggedInUserId'),
        status: 'active',
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    };

    try {
        const { saveItemToFirestore } = await import("./firebaseauth.js");
        await saveItemToFirestore(item);
        showSuccessModal('Found item reported successfully! Visible to all users.');
        updateStatistics(); // Refresh stats
    } catch (error) {
        console.error('Error saving to Firestore:', error);
        showSuccessModal('Error saving item. Please try again.');
    }
    
    event.target.reset();
    removeImage('foundItemImage', 'foundImagePreview');
}

async function submitLostItem(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const imageInput = document.getElementById('lostItemImage');
    
    if (!currentUser) {
        showSuccessModal('Please log in again.');
        return;
    }

    const itemId = Date.now().toString();
    let imageBase64 = null;

    // Store image as base64 for immediate display
    if (imageInput._base64Data) {
        imageBase64 = imageInput._base64Data;
    }

    const item = {
        id: itemId,
        type: 'lost',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateLost'),
        contact: formData.get('contactInfo'),
        reporter: currentUser.name,
        reporterId: currentUser.enrollmentId,
        reporterEmail: currentUser.email || localStorage.getItem('currentUserEmail'),
        imageBase64: imageBase64, // This will be visible to everyone
        timestamp: new Date().toISOString(),
        userId: localStorage.getItem('loggedInUserId'),
        status: 'active',
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    };

    try {
        const { saveItemToFirestore } = await import("./firebaseauth.js");
        await saveItemToFirestore(item);
        showSuccessModal('Lost item reported successfully! Visible to all users.');
        updateStatistics(); // Refresh stats
    } catch (error) {
        console.error('Error saving to Firestore:', error);
        showSuccessModal('Error saving item. Please try again.');
    }
    
    event.target.reset();
    removeImage('lostItemImage', 'lostImagePreview');
}

async function searchItems() {
    const query = document.getElementById('searchQuery')?.value.toLowerCase() || '';
    const category = document.getElementById('searchCategory')?.value || '';
    const type = document.getElementById('searchType')?.value || '';

    try {
        const { getAllItemsFromFirestore } = await import("./firebaseauth.js");
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

    resultsContainer.innerHTML = items.map(item => `
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
                ${item.imageBase64 ? 
                    `<img src="${item.imageBase64}" alt="${item.name}" 
                          class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer"
                          onclick="openImageModal('${item.imageBase64}')">` :
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
    `).join('');
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

async function loadUserItems() {
    if (!currentUser) return;
    
    try {
        const { getUserItemsFromFirestore } = await import("./firebaseauth.js");
        const userItems = await getUserItemsFromFirestore(localStorage.getItem('loggedInUserId'));
        
        const container = document.getElementById('userItems');
        
        if (!container) return;
        
        if (userItems.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">You haven't reported any items yet.</p>
                </div>
            `;
        } else {
            container.innerHTML = userItems.map(item => `
                <div class="bg-gray-50 rounded-lg p-4 border">
                    <div class="flex items-center justify-between mb-2">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${
                            item.type === 'found' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }">
                            ${item.type === 'found' ? 'Found' : 'Lost'}
                        </span>
                        <div class="flex space-x-2">
                            <button onclick="markAsReturned('${item.id}')" 
                                    class="text-green-600 hover:text-green-800 transition-colors" title="Mark as Returned">
                                <i class="fas fa-check-circle"></i>
                            </button>
                            <button onclick="deleteItem('${item.id}')" 
                                    class="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        ${item.imageBase64 ? 
                            `<img src="${item.imageBase64}" alt="${item.name}" 
                                  class="w-full h-32 object-cover rounded-lg cursor-pointer"
                                  onclick="openImageModal('${item.imageBase64}')">` :
                            `<div class="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                <i class="fas fa-image text-2xl text-gray-400"></i>
                            </div>`
                        }
                    </div>
                    
                    <h4 class="font-semibold text-gray-800">${item.name}</h4>
                    <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                    <div class="text-xs text-gray-500">
                        <span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>
                        <span class="ml-4"><i class="fas fa-calendar mr-1"></i>${new Date(item.date).toLocaleDateString()}</span>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading user items:', error);
    }
}

async function markAsReturned(itemId) {
    if (confirm('🎉 Mark this item as returned?')) {
        try {
            const { markAsReturnedInFirestore } = await import("./firebaseauth.js");
            await markAsReturnedInFirestore(itemId, currentUser.enrollmentId);
            showSuccessModal('Item marked as returned!');
            loadUserItems();
            updateStatistics();
        } catch (error) {
            console.error('Error marking as returned:', error);
            showSuccessModal('Error updating item.');
        }
    }
}

async function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const { deleteItemFromFirestore } = await import("./firebaseauth.js");
            await deleteItemFromFirestore(itemId);
            showSuccessModal('Item deleted successfully!');
            loadUserItems();
            updateStatistics();
        } catch (error) {
            console.error('Error deleting item:', error);
            showSuccessModal('Error deleting item.');
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

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('currentUserEmail');
    window.location.href = 'index.html';
}

document.addEventListener('click', function(event) {
    const profileMenu = document.getElementById('profileMenu');
    const profileButton = event.target.closest('button[onclick="toggleProfileMenu()"]');
    
    if (profileMenu && !profileButton && !profileMenu.contains(event.target)) {
        profileMenu.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    init();
});

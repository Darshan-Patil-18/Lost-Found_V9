import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { 
    getFirestore, 
    setDoc, 
    doc, 
    getDoc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDou7GDvqdibgfEdr53wgSSgd_QNaclhQc",
    authDomain: "lost-found-8d42f.firebaseapp.com",
    projectId: "lost-found-8d42f",
    storageBucket: "lost-found-8d42f.firebasestorage.app",
    messagingSenderId: "123518611655",
    appId: "1:123518611655:web:4ad9cda0e3b62c575d0ee2"
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(function() {
            messageDiv.style.opacity = 0;
        }, 5000);
    }
}

// SIGN UP
const signUp = document.getElementById('submitSignUp');
if (signUp) {
    signUp.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('rEmail').value;
        const password = document.getElementById('rPassword').value;
        const name = document.getElementById('fName').value;

        const auth = getAuth();
        const db = getFirestore();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: name,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            showMessage('Account Created Successfully!', 'signUpMessage');
            
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
            .then(() => {
                localStorage.setItem('currentUserEmail', email);
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'main.html';
            })
            .catch((error) => {
                console.error("Error writing document", error);
            });
        })
        .catch((error) => {
            showMessage('Email already exists! Please sign in instead.', 'signUpMessage');
        });
    });
}

// SIGN IN
const signIn = document.getElementById('submitSignIn');
if (signIn) {
    signIn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login successful!', 'signInMessage');
            const user = userCredential.user;
            
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('currentUserEmail', email);
            
            const db = getFirestore();
            const userDocRef = doc(db, "users", user.uid);
            getDoc(userDocRef)
            .then((docSnap) => {
                if (!docSnap.exists()) {
                    const userData = {
                        email: email,
                        firstName: 'User',
                        lastLogin: new Date().toISOString()
                    };
                    setDoc(userDocRef, userData);
                }
            });
            
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        })
        .catch((error) => {
            showMessage('Wrong email or password!', 'signInMessage');
        });
    });
}

// Firestore Functions (KEEP THESE)
export async function saveItemToFirestore(item) {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const docRef = await addDoc(itemsRef, {
        ...item,
        createdAt: new Date().toISOString()
    });
    return docRef.id;
}

export async function getAllItemsFromFirestore() {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const q = query(itemsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
}

export async function getUserItemsFromFirestore(userId) {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const q = query(itemsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
}

export async function deleteItemFromFirestore(itemId) {
    const db = getFirestore();
    const itemRef = doc(db, "lostFoundItems", itemId);
    await deleteDoc(itemRef);
}

export async function markAsReturnedInFirestore(itemId, userEnrollment) {
    const db = getFirestore();
    const itemRef = doc(db, "lostFoundItems", itemId);
    await updateDoc(itemRef, {
        status: 'returned',
        returnedDate: new Date().toISOString(),
        markedReturnedBy: userEnrollment
    });
}

// Add these imports at the top if missing
import { 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc,
    query, 
    orderBy,
    where 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

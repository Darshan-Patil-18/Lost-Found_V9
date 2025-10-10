import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { 
    getFirestore, 
    setDoc, 
    doc, 
    getDoc,
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc,
    query, 
    orderBy,
    where
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
const provider = new GoogleAuthProvider();

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
                lastName: '',
                createdAt: new Date().toISOString(),
                providers: ['email'],
                lastLogin: new Date().toISOString(),
                enrollmentId: '',
                status: 'active',
                role: 'user'
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
                showMessage('Account created but profile setup failed. Please contact support.', 'signUpMessage');
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                fetchSignInMethodsForEmail(auth, email)
                .then((signInMethods) => {
                    if (signInMethods.includes('google.com')) {
                        showMessage('This email is already registered with Google. Please sign in with Google instead.', 'signUpMessage');
                    } else {
                        showMessage('Email Address Already Exists! Please sign in instead.', 'signUpMessage');
                    }
                })
                .catch(() => {
                    showMessage('Email Address Already Exists!', 'signUpMessage');
                });
            } else {
                showMessage('Unable to create user. Please try again.', 'signUpMessage');
            }
        });
    });
}

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
                        firstName: user.displayName ? user.displayName.split(' ')[0] : 'User',
                        lastName: '',
                        lastLogin: new Date().toISOString(),
                        providers: ['email']
                    };
                    setDoc(userDocRef, userData);
                } else {
                    const userData = {
                        ...docSnap.data(),
                        lastLogin: new Date().toISOString()
                    };
                    if (!userData.providers || !userData.providers.includes('email')) {
                        userData.providers = userData.providers ? [...userData.providers, 'email'] : ['email'];
                    }
                    setDoc(userDocRef, userData, { merge: true });
                }
            });
            
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log('Sign in error:', errorCode, error.message);
            
            if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
                fetchSignInMethodsForEmail(auth, email)
                .then((signInMethods) => {
                    console.log('Sign in methods for', email, ':', signInMethods);
                    if (signInMethods.includes('google.com')) {
                        showMessage('This account was created using Google Sign-In. Please sign in with Google.', 'signInMessage');
                    } else {
                        showMessage('Incorrect Email or Password', 'signInMessage');
                    }
                })
                .catch((fetchError) => {
                    console.error('Error fetching sign-in methods:', fetchError);
                    showMessage('Incorrect Email or Password', 'signInMessage');
                });
            } else if (errorCode === 'auth/user-not-found') {
                fetchSignInMethodsForEmail(auth, email)
                .then((signInMethods) => {
                    if (signInMethods.length > 0) {
                        if (signInMethods.includes('google.com')) {
                            showMessage('This account was created using Google Sign-In. Please sign in with Google.', 'signInMessage');
                        } else {
                            showMessage('Account does not exist. Please sign up first.', 'signInMessage');
                        }
                    } else {
                        showMessage('Account does not exist. Please sign up first.', 'signInMessage');
                    }
                })
                .catch((fetchError) => {
                    showMessage('Account does not exist. Please sign up first.', 'signInMessage');
                });
            } else {
                showMessage('Login failed. Please try again.', 'signInMessage');
            }
        });
    });
}

function handleGoogleSignIn() {
    const auth = getAuth();
    const db = getFirestore();

    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        const userEmail = user.email;
        
        localStorage.setItem('loggedInUserId', user.uid);
        localStorage.setItem('currentUserEmail', userEmail);
        
        const userDocRef = doc(db, "users", user.uid);
        
        getDoc(userDocRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = {
                    ...docSnap.data(),
                    lastLogin: new Date().toISOString(),
                    photoURL: user.photoURL,
                    displayName: user.displayName
                };
                if (!userData.providers || !userData.providers.includes('google')) {
                    userData.providers = userData.providers ? [...userData.providers, 'google'] : ['google'];
                }
                return setDoc(userDocRef, userData, { merge: true });
            } else {
                const userData = {
                    email: userEmail,
                    firstName: user.displayName ? user.displayName.split(' ')[0] : 'User',
                    lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    providers: ['google'],
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };
                return setDoc(userDocRef, userData);
            }
        })
        .then(() => {
            showMessage('Google Sign In Successful!', 'signInMessage');
            
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        })
        .catch((error) => {
            console.error("Error handling user data:", error);
            showMessage('Sign in successful but profile setup failed.', 'signInMessage');
        });
    })
    .catch((error) => {
        console.error('Google Sign In Error:', error);
        const errorCode = error.code;
        const errorEmail = error.customData?.email;
        
        if (errorCode === 'auth/account-exists-with-different-credential') {
            handleAccountLinking(error, errorEmail);
        } else if (errorCode === 'auth/popup-closed-by-user') {
        } else {
            showMessage('Google Sign In failed. Please try again.', 'signInMessage');
        }
    });
}

function handleAccountLinking(error, email) {
    const auth = getAuth();
    const db = getFirestore();
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    if (!credential) {
        showMessage('Unable to link accounts. Please try signing in with email/password first.', 'signInMessage');
        return;
    }

    showMessage('This email is already registered. Please enter your password to link accounts.', 'signInMessage');
    
    const password = prompt(`Please enter your password for ${email} to link with Google account:`);
    
    if (!password) {
        showMessage('Account linking cancelled.', 'signInMessage');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const existingUser = userCredential.user;
        
        return linkWithCredential(existingUser, credential)
        .then((linkResult) => {
            const user = linkResult.user;
            
            const userDocRef = doc(db, "users", user.uid);
            return getDoc(userDocRef)
            .then((docSnap) => {
                const userData = {
                    ...docSnap.data(),
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    lastLogin: new Date().toISOString()
                };
                if (!userData.providers || !userData.providers.includes('google')) {
                    userData.providers = userData.providers ? [...userData.providers, 'google'] : ['google'];
                }
                return setDoc(userDocRef, userData, { merge: true });
            })
            .then(() => {
                localStorage.setItem('loggedInUserId', user.uid);
                localStorage.setItem('currentUserEmail', email);
                
                showMessage('✅ Success! Your Google account has been linked to your existing account.', 'signInMessage');
                
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 1500);
            });
        });
    })
    .catch((linkError) => {
        console.error('Account linking error:', linkError);
        if (linkError.code === 'auth/wrong-password') {
            showMessage('Incorrect password. Please try again.', 'signInMessage');
        } else {
            showMessage('Failed to link accounts. Please try signing in with email/password.', 'signInMessage');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const googleButtons = document.querySelectorAll('.btn-google');
    googleButtons.forEach(button => {
        button.addEventListener('click', handleGoogleSignIn);
    });
    
    console.log('Authentication system initialized');
});

// FIRESTORE FUNCTIONS FOR LOST & FOUND ITEMS
export async function saveItemToFirestore(item) {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const docRef = await addDoc(itemsRef, {
        ...item,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
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

export async function getUsersFromFirestore() {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
    });
    return users;
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

export async function cleanupOldItems() {
    const db = getFirestore();
    const itemsRef = collection(db, "lostFoundItems");
    const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const q = query(itemsRef, where("createdAt", "<", cutoffDate.toISOString()));
    const querySnapshot = await getDocs(q);
    
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
    console.log(`Cleaned up ${deletePromises.length} old items`);
}
// ADD these functions to firebaseauth.js (after existing functions)

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

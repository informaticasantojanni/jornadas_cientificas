import { db } from "../config/firebase.config";
import {
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    query,
    where
} from "firebase/firestore";


export const COLLECTIONS = {
    USERS: "users",
    EVENTS: "events",
    REGISTRATION: "registration"
};

export const DOCUMENTS = {
    JORNADAS2024: "jornadas_cientificas_2024"
}


/**GET_DOCUMENTS 
 * recibe como argumento el nombre de la collection y retorna todos los documentos
*/
export const getDocuments = async (name) => {
    const querySnapshot = await getDocs(collection(db, name));
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data
};

/*CREATE_DOCUMENT 
* recibe como argumento el nombre de la collection y retorna todos los documentos
*/
export const createDocument = async (name, data) => {
    const refDoc = await addDoc(collection(db, name), data);
    return refDoc;
};

/*SET_DOCUMENT
* recibe como argumento el nombre de la colection y retorna todos los documentos
*/
export const setDocument = async (name, data, id) => {
    const response = {
        status: null,
        error: null
    }

    try {
        await setDoc(doc(db, name, id), data)
        response.status = true;

    } catch (error) {
        response.error = error;
        response.status = false;
    }

    return response;
}

/*GET_DOCUMENT_BY_ID
* recibe como argumento el nombre de la collection y el id del documento
*/
export const getDocumentById = async (id, name) => {
    const docRef = doc(db, name, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
};


// GET_DOCUMENT_BY_FIELD
export const getDocumentByField = async (collectionName, field, value) => {
    const response = {
        status: null,
        error: null,
        data: []
    };

    try {
        // Reference to the Firestore collection
        const docsRef = collection(db, collectionName);
        
        // Create a query where the specified field matches the given value
        const docsQuery = query(docsRef, where(field, '==', value));
        
        // Execute the query
        const querySnapshot = await getDocs(docsQuery);
        
        // Map through the query results and construct the data array
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // If documents are found, return them in the response
        response.status = true;
        response.data = documents;
        
    } catch (error) {
        // Handle any errors that occur during the query
        response.status = false;
        response.error = error;
    }

    return response;
};




/*GET_DOCUMENTS_BY_ID_FROM_SUBCOLLECTION
* recibe como argumentos:
parentCollection and parentDocId
childCollection and childDoc Id
*/
export const getDocumentByIdFromSubcollection = async (data) => {
    const response = {
        status: null,
        error: null
    }

    try {
        // Construct the path to the specific user's registration document within the event
        const path = `${data.parentCollection}/${data.parentDocId}/${data.childCollection}/${data.childDocId}`;
        const childDocRef = doc(db, path);

        // Retrieve the document
        const childDoc = await getDoc(childDocRef)

        if (childDoc.exists()) {
            response.status = true;
            response.data = { id: childDoc.id, ...childDoc.data() }
        } else {
            response.status = true;
            response.data = null
        }
    } catch (error) {
        response.status = false;
        response.error = error
    }

    return response;
}



export const addSubcollectionDocument = async (parentCollection, docId, childSubcollection, docData) => {
    const response = {
        status: null,
        error: null
    }

    try {
        // Reference to the event document
        const parentDocRef = doc(db, parentCollection, docId);

        // Reference to the 'registrations' subcollection within the event document
        const childCollectionReference = collection(parentDocRef, childSubcollection);

        // Create a new document in the 'registrations' subcollection
        await addDoc(childCollectionReference, docData)

        response.status = true;
    } catch (error) {
        response.status = false;
        response.error = error;
    }

    return response;
}

export const setSubcollectionDocument = async (data) => {
    const response = {
        status: null,
        error: null
    }

    try {
        // Get a reference to parents collection
        const path = `${data.parentCollection}/${data.parentDocId}/${data.childCollection}`;
        const parentDocRef = collection(db, path);

        // Create a document reference with a custom ID
        const childDocRef = doc(parentDocRef, data.childDocId)

        // Set the data for the document
        await setDoc(childDocRef, data.persistData);
        response.status = true;
    } catch (error) {
        response.status = false;
        response.error = error;
    }

    return response;
}


export const updateDocument = async (data) => {
    const response = {
        status: null,
        error: null
    }

    try {
        // Create a reference to the document in the subcollection
        const docRef = doc(db, data.collection, data.docId);

        await updateDoc(docRef, data.userData);
        response.status = true;
    } catch (error) {
        response.status = false;
        response.error = error;
    }
    return response;
}


export const updateSubcollectionDocument = async (data) => {
    const response = {
        status: null,
        error: null
    }

    try {
        // Create a reference to the document in the subcollection
        const docRef = doc(db, data.parentCollection, data.parentDocId, data.childCollection, data.childDocId);
        // Update the specific field in the document
        const updateData = {
            [data.field]: data.value
        }
        await updateDoc(docRef, updateData);
        response.status = true;
    } catch (error) {
        response.status = false;
        response.error = error;
    }
    return response;
}

//Función para obtener documentos de una subcolección

export const getDocumentsFromSubcollection = async (parentCollection, parentDocId, childCollection) => {

    const response = {
        status: null,
        error: null,
        data: []
    }

    try {
        //Referencia al documento principal
        const parentDocRef = doc(db, parentCollection, parentDocId);

        //Referencia a la subcolleción
        const childCollectionRef = collection(parentDocRef, childCollection);

        //Obtener documentos de la subcollección
        const querySnapshot = await getDocs(childCollectionRef);
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        response.status = true;
        response.data = documents;

    } catch (error) {
        response.status = false;
        response.error = error;
    }

    return response;
}

//Función para obtener documentos de una subcolección

export const getDocumentsByIdsFromCollection = async (docsCollection, docIds) => {

    const response = {
        status: null,
        error: null,
        data: []
    }

    try {
        //Referencia al documento principal
        const docsRef = collection(db, docsCollection);
        const docsQuery = query(docsRef, where('__name__', 'in', docIds))
        const querySnapshot = await getDocs(docsQuery);
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        response.status = true;
        response.data = documents;

    } catch (error) {
        response.status = false;
        response.error = error;
    }

    return response;
}


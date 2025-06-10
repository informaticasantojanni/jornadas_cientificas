import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../core/config/firebase.config";

import {
  COLLECTIONS,
  getDocuments,
  setDocument,
  getDocumentById,
  getDocumentByField,
  getDocumentByIdFromSubcollection,
  addSubcollectionDocument,
  setSubcollectionDocument,
  updateDocument,
  updateSubcollectionDocument,
  getDocumentsFromSubcollection,
  getDocumentsByIdsFromCollection,
} from "../core/db/firestore.db";
import { collection } from "firebase/firestore";

// Authentication Functions
export const signUpWithEmail = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  // await sendEmailVerification(auth.currentUser);
  return response;
};

export const signInWithEmail = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const signOut = async () => {
  await auth.signOut();
};

// Firestore Functions
export const saveUserInDB = async (uid, user) => {
  const res = await setDocument(COLLECTIONS.USERS, user, uid);
  return res;
};

export const getUserById = async (id) => {
  const res = await getDocumentById(id, COLLECTIONS.USERS);
  return res;
};

export const getUserByDni = async (dni) => {
  const field = "dni";
  const res = await getDocumentByField(COLLECTIONS.USERS, field, dni);
  return res;
};

export const getUserRegistrationByDni = async (eventId, dni) => {
  const res = {
    status: false,
    error: null,
    data: [],  // Initialize data as an array
  };

  try {
    // Fetch the user document by DNI
    const field = "dni";
    const userRes = await getDocumentByField(COLLECTIONS.USERS, field, dni);

    // Ensure user was found
    if (!userRes.status || !userRes.data || userRes.data.length === 0) {
      throw new Error(`User with DNI ${dni} not found`);
    }

    // Iterate over the found users (if there are multiple)
    for (const user of userRes.data) {
      // Fetch the registration for the event for each user
      const registrationRes = await getRegistration(eventId, user.id);

      // Combine user data with registration data
      const userWithRegistration = {
        ...user,  // Spread user data
        ...(registrationRes.status && registrationRes.data ? registrationRes.data : {}),  // Merge registration data if available
      };

      // Add the combined object to the res.data array
      res.data.push(userWithRegistration);
    }

    // Set status to true when successful
    res.status = true;

  } catch (error) {
    // Handle errors
    res.status = false;
    res.error = error.message;
  }

  return res;
};



export const getAllUsers = async () => {
  const res = await getDocuments(COLLECTIONS.USERS);
  return res;
};

export const getAllEvents = async () => {
  const res = await getDocuments(COLLECTIONS.EVENTS);
  return res;
};

export const addRegistration = async (userId, eventId) => {
  const docData = {
    userId: userId,
    registrationTime: new Date(),
    status: "registered",
    payment: "pending",
  };

  const res = await addSubcollectionDocument(
    COLLECTIONS.EVENTS,
    eventId,
    COLLECTIONS.REGISTRATION,
    docData
  );
  return res;
};

export const setRegistration = async (eventId, userData) => {
  const registrationData = {
    parentDocId: eventId,
    childDocId: userData.id,
    parentCollection: COLLECTIONS.EVENTS,
    childCollection: COLLECTIONS.REGISTRATION,
    persistData: {
      registrationTime: new Date(),
      status: "registered",
      payment: userData.category == "estudiante" ? "exento" : "pending",
    },
  };
  const res = await setSubcollectionDocument(registrationData);
  return res;
};

export const getRegistration = async (eventId, userId) => {
  const data = {
    parentDocId: eventId,
    childDocId: userId,
    parentCollection: COLLECTIONS.EVENTS,
    childCollection: COLLECTIONS.REGISTRATION,
  };
  const res = await getDocumentByIdFromSubcollection(data);
  return res;
};

export const updateUserData = async (userId, formData) => {
  const data = {
    collection: COLLECTIONS.USERS,
    docId: userId,
    userData: formData,
  };
  const res = updateDocument(data);
  return res;
};

export const updatePayment = async (eventId, userId) => {
  const data = {
    parentDocId: eventId,
    childDocId: userId,
    parentCollection: COLLECTIONS.EVENTS,
    childCollection: COLLECTIONS.REGISTRATION,
    field: "payment",
    value: "paid",
  };
  const res = await updateSubcollectionDocument(data);
  return res;
};

// Servicio para obtener de fireStore documentos de una subcolección

export const getEventRegistrationsWithUserData = async (eventId) => {
  try {
    //Llamo a la ufuncion getDocumentsFromSubcollection de firebase.services que retorna todos los documentos de una dada subcollection
    const res = await getDocumentsFromSubcollection(
      COLLECTIONS.EVENTS,
      eventId,
      COLLECTIONS.REGISTRATION
    );
    if (res.status) {
      //si se encontraron documentos, extraigo del array de objetos solo los ids de los documentos
      const usersIds = res.data.map((user) => user.id);

      if (usersIds.length > 0) {
        const usersDocs = await getDocumentsByIdsFromCollection(
          COLLECTIONS.USERS,
          usersIds
        );
        if (usersDocs.status) {
          //retorna los documentos encontrados

          // Combine the registration data with the corresponding user data
          const combinedData = res.data.map((registration) => {
            const userData = usersDocs.data.find(
              (user) => user.id === registration.id
            );
            return {
              ...registration,
              user: userData, // Attach the user data to the registration data
            };
          });

          // Return the combined data
          return combinedData;

          // return usersDocs.data;
        } else {
          console.log("usersDocs returned error ", usersDocs.error);
          throw new Error(usersDocs.error);
        }
      } else {
        return [];
      }
      //llamo a la funcion getDocumentsByIdsFromCollection de firestore.db que retorna el match de ids para una dada collection
    } else {
      throw new Error(res.error);
    }
  } catch (error) {
    console.error("Error fetching registrations", error);
  }
};

export const recoverPassword = async (email) => {
  const response = {
    status: false,
    error: null,
  };

  try {
    const resetPassResponse = sendPasswordResetEmail(auth, email);
    response.status = true;
  } catch (error) {
    response.error = error;
  }

  return response;
};
// Servicio para obtener datos del evento con usuarios y su estado de pago

// export const getEventRegistrationsWithUserData = async (eventId) => {

//     const registrations = await getRegistrationForEvent(eventId);
//     const usersData = await Promise.all(
//         registrations.map(async (registration) => {
//           const userData = await getUserById(registration.id);
//           return {
//             ...userData,
//             payment: registration.payment,
//           };
//         })
//       );
//     return usersData;
// };

// Servicio para obtener datos del evento con usuarios y su estado de pago

// Servicio para obtener de fireStore documentos de una subcolección

// export const getRegistrationForEvent = async (eventId) => {
//   try {
//     const res = await getDocumentsFromSubcollection(
//       COLLECTIONS.EVENTS,
//       eventId,
//       COLLECTIONS.REGISTRATION
//     );
//     if (res.status) {
//       return res.data;
//     } else {
//       throw new Error(res.error);
//     }
//   } catch (error) {
//     console.log("Error fetching registrations", error);
//   }
// };

const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7UEKG0qsW81lVPB8Cx7rG96bGSqW9lsS5GQdKZTXLwh-0XJCUtnUOJQB0mwJtgI4FPA/exec";

exports.recoverPasswordByDni = onCall({ cors: ["http://localhost:5173", "https://jornadascientificassantojanni.com"] }, async (request) => {
  try {
    const { dni } = request.data;

    if (!dni) {
      throw new Error("Datos incompletos");
    }

    const snap = await admin
      .firestore()
      .collection("users")
      .where("dni", "==", dni)
      .limit(1)
      .get();

    if (snap.empty) {
      return {
        ok: true,
        message:
          "Si los datos coinciden con una cuenta registrada, recibirás un email.",
      };
    }

    const user = snap.docs[0].data();
    const email = user.email;

    const link = await admin.auth().generatePasswordResetLink(email);

    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({
        userData: { email, name: user.name, lastName: user.lastName, link },
        action: "recover_password",
      }),
    });

    return {
      ok: true,
      message: `Revisa tu casilla de correo electrónico ${email} (no olvides revisar también en Spam o Correo no deseado).`,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error interno");
  }
});
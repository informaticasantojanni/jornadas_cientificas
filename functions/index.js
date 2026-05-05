const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.recoverPasswordByDni = onCall(async (request) => {
  try {
    const { dni } = request.data;

    if (!dni ) {
      throw new Error("Datos incompletos");
    }

    // 🔎 Buscar usuario
    const snap = await admin
      .firestore()
      .collection("users")
      .where("dni", "==", dni)
      .limit(1)
      .get();

    // ⚠️ Siempre responder genérico (seguridad)
    if (snap.empty) {
      return {
        ok: true,
        message:
          "Si los datos coinciden con una cuenta registrada, recibirás un email.",
      };
    }

    const user = snap.docs[0].data();
    const email = user.email;

    // 🔗 Generar link de reset
    const link = await admin.auth().generatePasswordResetLink(email);

    console.log("Reset link:", link);

    // 📧 Acá podrías enviar email con SendGrid / Brevo / etc.

    return {
      ok: true,
      message:
        "Si los datos coinciden con una cuenta registrada, recibirás un email.",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error interno");
  }
});
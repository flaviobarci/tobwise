import * as functions from "firebase-functions";
import msgServer from "./msg";
import hookServer from "./hook";

export const msg = functions.https.onRequest(msgServer);
export const hook = functions.https.onRequest(hookServer);

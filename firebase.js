import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyDumBkCNSX0uOk3lrFCqJyTgdQyRX0U2Dg",
	authDomain: "rpmt-af.firebaseapp.com",
	projectId: "rpmt-af",
	storageBucket: "rpmt-af.appspot.com",
	messagingSenderId: "402204375715",
	appId: "1:402204375715:web:af9d715a9772b570b05d16",
	measurementId: "G-TWGXF0CJDT",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

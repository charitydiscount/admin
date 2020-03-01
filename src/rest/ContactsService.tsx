import { DB } from "../index";
import { FirebaseTable } from "../Helper";
import { firestore } from "firebase";

export interface MessageDto {
    createdAt: firestore.Timestamp
    email: string,
    message: string,
    name: string,
    subject: string,
    userId: string
}

export function getMessages() {
    return new Promise((resolve, reject) => {
        DB.collection(FirebaseTable.CONTACT)
            .get()
            .then(
                querySnapshot => {
                    let data = [] as MessageDto[];
                    querySnapshot.docs.forEach(value => {
                        data.push(value.data() as MessageDto)
                    });
                    data.sort((p1, p2) => {
                        if (p1.createdAt > p2.createdAt) return -1;
                        else return 1;
                    });
                    resolve(data);
                }
            ).catch(() => reject());
    });
}
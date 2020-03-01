import { DB } from "../index";
import { FirebaseTable } from "../Helper";

export interface MessageDto {
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
                    resolve(data);
                }
            ).catch(() => reject());
    });
}
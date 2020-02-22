import { FirebaseTable, TableDocument } from "../Helper";
import { DB } from "../index";

export interface CategoryDto {
    category: string
}

export interface CategoriesDBWrapper {
    categories: string[]
}


export function getCategories() {
    return DB.collection(FirebaseTable.META).doc(TableDocument.PROGRAMS).get()
        .then(doc => {
            if (doc.exists) {
                let data = [] as CategoryDto[];
                let categories = doc.data() as CategoriesDBWrapper;
                categories.categories.forEach(value => data.push({category: value}));
                return data;
            } else {
                return [];
            }
        })
        .catch(() => {
            return []
        })
}

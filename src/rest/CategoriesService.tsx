import { ExpressLink, FirebaseTable, TableDocument } from "../Helper";
import { auth, DB } from "../index";
import axios from "axios";
import { expressUrl } from "./_Connection";

export interface CategoryDto {
    category: string
}

export interface CategoriesDBWrapper {
    categories: string[]
}

export interface ImportantCategoryDto {
    name: string,
    photoName: string
}

export interface ImportantCategoriesWrapper {
    categories: ImportantCategoryDto[]
}

export function getImportantCategories() {
    return DB.collection(FirebaseTable.META).doc(TableDocument.IMPORTANT_CATEGORIES).get()
        .then(doc => {
            if (doc.exists) {
                let data = [] as ImportantCategoryDto[];
                let categories = doc.data() as ImportantCategoriesWrapper;

                for (let i in categories.categories) {
                    data.push(categories.categories[i])
                }
                return data;
            } else {
                return [];
            }
        })
        .catch(() => {
            return []
        })
}

export async function updateImportantCategories(importantCategories: ImportantCategoryDto[]) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.IMPORTANT_CATEGORIES;

    let response = await axios.put(url, {
        categories: importantCategories
    }, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
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

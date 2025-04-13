
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuddhistWisdom } from './wisdom';

export interface Bookmark {
    id: string,
    ts: string,
    wisdom: BuddhistWisdom,
    intent: {
        value: string,
        label: string,
        emoji: string,
    }
}

export class WisdomRepository {
    // static simpleDict: Map<string, string> = new Map();
    static kBookmarkKey: string = 'saved_wisdoms'

    constructor() {

    }

    private static async setItem(key: string, value: string): Promise<void> {
        AsyncStorage.setItem(key, value)
    }

    private static async getItem(key: string): Promise<string | null> {
        return AsyncStorage.getItem(key)
    }

    static async getBookmarks(): Promise<[Bookmark]> {
        const bookmarkStrings = await this.getItem(this.kBookmarkKey) || "[]";
        const bookmarks = JSON.parse(bookmarkStrings)
            .map((aBookmarkString: string) => {
                return JSON.parse(aBookmarkString)
            });
        return bookmarks.reverse();
    }

    static async bookmarkWisdom(
        wisdom: BuddhistWisdom,
        intent: object
    ): Promise<void> {
        const ts = new Date().toISOString();
        this.addItemToKey(
            this.kBookmarkKey, JSON.stringify({
                'id': ts,
                'ts': ts,
                'wisdom': wisdom,
                'intent': intent
            })
        )
    }

    static async deleteBookmark(
        bookmark: Bookmark
    ): Promise<[Bookmark]> {
        const bookmarkStrings = await this.getItem(this.kBookmarkKey) || "[]";
        const bookmarks = JSON.parse(bookmarkStrings)
        .map((aBookmarkString: string) => {
            return JSON.parse(aBookmarkString)
        })
        .filter((aBookmark: Bookmark) => {
            aBookmark.id != bookmark.id
        });
        await this.setItem(this.kBookmarkKey, JSON.stringify(bookmarks))

        return bookmarks;
    }

    private static async addItemToKey(key: string, value: string): Promise<void> {
        const currentValues = await this.getItem(key) || '[]';
        const parsedValues = JSON.parse(currentValues);
        parsedValues.push(value);
        await this.setItem(key, JSON.stringify(parsedValues));
    }
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuddhistWisdom, Bookmark, Intent } from './DomainModels';

// TODO: Rename to BookmarkRepository
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
            })
            .reverse();

        const results: [Bookmark] = [];
        const setQuote = new Set<string>();
        bookmarks.filter((bkMark: Bookmark) => {
            if (!setQuote.has(bkMark.wisdom.quote)) {
                setQuote.add(bkMark.wisdom.quote);
                results.push(bkMark)
            }
        })

        await this.setItem(
            this.kBookmarkKey,
            JSON.stringify(results.map((aBookmarkObj: Bookmark) => {
                return JSON.stringify(aBookmarkObj);
            }))
        );

        return results;
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
            return aBookmark.id !== bookmark.id
        });

        await this.setItem(
            this.kBookmarkKey,
            JSON.stringify(bookmarks.map((aBookmarkObj: Bookmark) => {
                return JSON.stringify(aBookmarkObj);
            }))
        );

        return bookmarks;
    }

    private static async addItemToKey(key: string, value: string): Promise<void> {
        const currentValues = await this.getItem(key) || '[]';
        const parsedValues = JSON.parse(currentValues);
        parsedValues.push(value);
        await this.setItem(key, JSON.stringify(parsedValues));
    }
}
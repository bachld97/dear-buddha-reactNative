
export type IntentType = 'calm' | 'insight' | 'gratitude' | 'confusion';

export interface Author  {
    slug: string // short name
    fullName: string
    portraitUrl: string
}

export interface Intent {
    intentType: IntentType // ID
    label: string
    emoji: string
}

export interface BuddhistWisdom {
    id: string
    quote: string
    author: Author
    reflection: string
}

export interface Bookmark {
    id: string
    ts: string
    wisdom: BuddhistWisdom
    intent: Intent
}
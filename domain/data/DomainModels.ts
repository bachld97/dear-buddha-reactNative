
export type IntentType = 'calm' | 'insight' | 'gratitude' | 'confusion';

export interface Intent {
    intentType: IntentType, // ID
    label: string,
    emoji: string,
}

export interface BuddhistWisdom {
    id: String
    quote: string;
    author: string;
    reflection: string;
}

export interface Bookmark {
    id: string,
    ts: string,
    wisdom: BuddhistWisdom,
    intent: Intent
}
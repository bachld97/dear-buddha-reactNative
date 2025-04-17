import {
    firebase
} from "@react-native-firebase/analytics"
import { BuddhistWisdom } from "../data/DomainModels"

export namespace AppEvent {

    export const selectIntent = "select_intent" 

    export const createWisdom = "generate_wisdom"

    export const showWisdom = "show_wisdom"

    export const bookmarkWisdom = "bookmark_wisdom"

    export const openBookmark = "open_bookmark"

    export const selectFeedback = "select_feedback"

    export const askAgain = "ask_again"

    export const feedbackCTA = "feedback_cta"

    export const completeTeachingFlow = "complete_teaching_flow"

}


export class AppEventTracker {
    private static eventLogger = (
        name: string,
        params?: { [key: string]: any }
    ) => {
        firebase.analytics().logEvent(name, params);
    } 

    private static screenViewLogger = async (
        name: string,
    ) => {
        firebase.analytics().logScreenView({
            screen_name: name
        })
    } 

    static logEvent(
        name: string,
        params?: { [key: string]: any }
    ): void {
        AppEventTracker.eventLogger(name, params);
        console.debug("event log", name, params);
    }

    static async logScreenView(name: string) {
        const hScrName = this.mapRouteNameIntoHumanName(name);
        await this.screenViewLogger(hScrName);
    }

    static mapRouteNameIntoHumanName(routeName: string) {
        const mapping: Record<string, string> = {
            "/": "Home",
            "/wisdomDetail": "WisdomDetail",
            "/wisdomBookmark": "WisdomBookmark"
        }
        return routeName in mapping
            ? mapping[routeName]
            : routeName;
    }

    static createWisdomTracker(): WisdomDetailTracker {
        return new WisdomDetailTracker();
    }
}

export class WisdomDetailTracker {

    wisdom: BuddhistWisdom | null = null
    lastSelectedFeedback: string | null = null
    didSubmit: boolean = false

    logShowWisdom(wisdom: BuddhistWisdom) {
        this.wisdom = wisdom;
        AppEventTracker.logEvent(AppEvent.showWisdom, {
            id: wisdom.id,
            author: wisdom.author
        });
    }
    
    logFeedback(value: string) {
        this.lastSelectedFeedback = value;
        AppEventTracker.logEvent(AppEvent.selectFeedback, {
            feedback: value
        });
    }

    logBookmark(wisdom: BuddhistWisdom) {
        AppEventTracker.logEvent(AppEvent.bookmarkWisdom, {
            author: wisdom.id
        });
        this.checkLogCompleteTeaching();
    }

    logAskAgain() {
        AppEventTracker.logEvent(AppEvent.askAgain);;
        this.checkLogCompleteTeaching();
    }

    private checkLogCompleteTeaching() {
        if (!this.didSubmit && this.lastSelectedFeedback && this.wisdom) {
            this.logCompleteTeaching();
            this.didSubmit = true;
        }
    }

    logCompleteTeaching() {
        if (this.wisdom) {
            AppEventTracker.logEvent(AppEvent.completeTeachingFlow, {
                feedback: this.lastSelectedFeedback,
                wisdom: this.wisdom.id
            });
        }
    }

}
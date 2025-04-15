import {
    firebase
} from "@react-native-firebase/analytics"

export namespace AppEvent {

    export const selectIntent = "select_intent" 

    export const createWisdom = "generate_wisdom"

    export const bookmarkWisdom = "bookmark_wisdom"

    export const openBookmark = "open_bookmark"

    export const selectFeedback = "select_feedback"

    export const askAgain = "ask_again"

    export const feedbackCTA = "feedback_cta"

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
}
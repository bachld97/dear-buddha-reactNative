import {
    firebase
} from "@react-native-firebase/analytics"

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
    }

    static async logScreenView(name: string) {
        await this.screenViewLogger(name)
    }

}
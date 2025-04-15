import {
    firebase
} from "@react-native-firebase/analytics"

export class AppEventTracker {
    static eventLogger = (
        name: string,
        params?: { [key: string]: any }
    ) => {
        firebase.analytics().logEvent(name, params);
    } 

    static logEvent(
        name: string,
        params?: { [key: string]: any }
    ): void {
        AppEventTracker.eventLogger(name, params);
    }

    static regsiterScreenChange(): void {

    }

}
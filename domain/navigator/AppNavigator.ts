import { Router } from "expo-router";
import { BuddhistWisdom, Intent } from "@/domain/data/DomainModels"

export namespace AppNavigator {

    export const openMoodInput = (router: Router) => {
        router.replace('/moodInput');
    };

    export const openBookmark = (router: Router) => {
        router.navigate('/wisdomBookmark');
    };

    // Wisdom / Teaching
    export const openWisdomScreenByIntent = (
        router: Router, intent: Intent | null
    ) => {
        router.navigate({
            pathname: "/wisdomDetailNew",
            params: { selectedIntentJSON: JSON.stringify(intent) }
        });
    }

    export const openWisdomScreenByWisdom = (
        router: Router, wisdom: BuddhistWisdom
    ) => {
        router.replace({
            pathname: "/wisdomDetailNew",
            params: { wisdomInputJSON: JSON.stringify(wisdom) }
        });
    }

    export const openWisdomScreenLegacy = (router: Router, intent: Intent | null) => {
        router.navigate({
            pathname: "/wisdomDetail",
            params: { selectedIntentJSON: JSON.stringify(intent) }
        });
    }

}
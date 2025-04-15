import { Router } from "expo-router";
import { Intent } from "@/domain/data/DomainModels"

export namespace AppNavigator {

    export const openBookmark = (router: Router) => {
        router.navigate('/wisdomBookmark');
    };

    export const openWisdomScreen = (router: Router, intent: Intent | null) => {
        router.navigate({
            pathname: "/wisdomDetail",
            params: { selectedIntentJSON: JSON.stringify(intent) }
        });
    }

}
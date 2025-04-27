import { BuddhistWisdom, Intent, IntentType, Author } from "./DomainModels";

export class WisdomRepository {

    static async getIntents(): Promise<[Intent]> {

        return new Promise((resolve) => {
            const intents = [
                { intentType: "calm", label: "Bình yên", emoji: "😌" },
                { intentType: "insight", label: "Hiểu biết", emoji: "💡" },
                { intentType: "gratitude", label: "Biết ơn", emoji: "🙏" },
                { intentType: "confusion", label: "Hoang mang", emoji: "😕" },
              ];
            resolve(intents);
        })

    }

    static defaultIntent(): Intent {
        return { intentType: "calm", label: "Bình yên", emoji: "😌" }
    }

    static async getWisdom(
        intent: Intent | null
    ): Promise<BuddhistWisdom> {
        const intentType = (intent != null)
            ? intent.intentType
            : WisdomRepository.defaultIntent().intentType;

        return new Promise((resolve) => {
            // Default to calm if intent is not recognized
            const safeIntent = (intentType in wisdomCollection)
                ? intentType
                : 'calm';

            // Get the collection for the specified intent
            const collection = wisdomCollection[safeIntent];

            // Randomly select a wisdom
            const randomIndex = Math.floor(Math.random() * collection.length);

            const result = collection[randomIndex];
            result.intent = intent;

            // Simulate a small delay to make it feel more natural
            setTimeout(() => {
                resolve(result);
            }, 100);
        });

    }

}

const authorCollection: Record<string, Author> = {
    'tnh': {
        slug: 'tnh',
        fullName: 'Thiền Sư Thích Nhất Hạnh',
        portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Thich_Nhat_Hanh_12_%28cropped%29.jpg/500px-Thich_Nhat_Hanh_12_%28cropped%29.jpg'
    },
    'dptc': {
        slug: 'dptc',
        fullName: 'Đức Phật Thích Ca',
        portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Gandhara_Buddha_%28tnm%29.jpeg/500px-Gandhara_Buddha_%28tnm%29.jpeg'
    },
    'dllm': {
        slug: 'dllm',
        fullName: 'Đức Đạt Lai Lạt Ma',
        portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Dalailama1_20121014_4639.jpg/500px-Dalailama1_20121014_4639.jpg'
    },
    'aj_cha': {
        slug: 'aj_cha',
        fullName: 'Thiền Sư Ajahn Chah',
        portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/AJiang_Cha.jpg'
    },
    'dogen': {
        slug: 'dogen',
        fullName: 'Thiền Sư Dogen',
        portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Dogen.jpg/500px-Dogen.jpg'
    },
    'shu_su': {
        slug: 'shu_su',
        fullName: 'Thiền Sư Shunryu Suzuki',
        portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Shunryu_Suzuki_by_Robert_Boni.jpg'
    }
}

const wisdomCollection: Record<IntentType, BuddhistWisdom[]> = {
    calm: [
        {
            id: "c1",
            quote: "Bạn không thể đi hết con đường cho đến khi bạn trở thành con đường đó.",
            author: authorCollection.dptc,
            reflection: "Hãy trở thành sự bình yên mà bạn tìm kiếm. Thực hành chánh niệm trong từng hành động, từ hơi thở đến bước chân."
        },
        {
            id: "c2",
            quote: "Nếu chúng ta có thể thấy con đường trước mặt, chúng ta không còn trên con đường nữa.",
            author: authorCollection.tnh,
            reflection: "Đừng lo lắng về tương lai hay tiếc nuối quá khứ. Hãy tập trung vào giây phút hiện tại, nơi bình yên thực sự tồn tại."
        },
        {
            id: "c3",
            quote: "Hãy để mọi thứ trôi qua, giống như nước chảy qua tay bạn.",
            author: authorCollection.aj_cha,
            reflection: "Đừng nắm giữ, đừng chống cự. Hãy quan sát những cảm xúc và suy nghĩ đến rồi đi, như những đám mây trôi qua bầu trời."
        }
    ],
    insight: [
        {
            id: "i1",
            quote: "Trong vòng luân hồi vô tận, tại sao chúng ta lại xem nhẹ người khác để tự tôn mình?",
            author: authorCollection.dllm,
            reflection: "Mọi chúng sinh đều bình đẳng trong khát vọng tìm kiếm hạnh phúc và tránh khổ đau. Hãy nhìn thế giới bằng con mắt của lòng từ bi."
        },
        {
            id: "i2",
            quote: "Nếu bạn muốn biết quá khứ của mình, hãy nhìn vào hoàn cảnh hiện tại. Nếu bạn muốn biết tương lai, hãy nhìn vào hành động hôm nay.",
            author: authorCollection.dptc,
            reflection: "Nhân quả là quy luật không thể tránh khỏi. Mỗi hành động đều tạo ra hạt giống cho tương lai. Hãy gieo những hạt giống tốt đẹp."
        },
        {
            id: "i3",
            quote: "Hiểu biết là quá trình dần dần, từng bước một.",
            author: authorCollection.shu_su,
            reflection: "Đừng vội vàng trên con đường tìm kiếm trí tuệ. Chậm rãi và kiên nhẫn, ánh sáng sẽ dần hiện ra trong tâm bạn."
        }
    ],
    gratitude: [
        {
            id: "g1",
            quote: "Hãy nhìn sâu vào lòng biết ơn, và bạn sẽ tìm thấy sức mạnh.",
            author: authorCollection.tnh,
            reflection: "Lòng biết ơn là cánh cửa mở ra hạnh phúc. Mỗi ngày, hãy dành thời gian để cảm nhận biết ơn về những điều đơn giản nhất."
        },
        {
            id: "g2",
            quote: "Cho đi không chỉ là điều nên làm, mà còn là nguồn hạnh phúc.",
            author: authorCollection.dllm,
            reflection: "Khi ta cho đi với tâm biết ơn, ta không chỉ làm phong phú cuộc sống người khác, mà còn tạo nên niềm vui trong chính mình."
        },
        {
            id: "g3",
            quote: "Mỗi buổi sáng, khi thức dậy, tôi biết ơn vì có ngày mới để thực hành.",
            author: authorCollection.dogen,
            reflection: "Mỗi ngày là món quà quý giá. Hãy sống trọn vẹn và trân trọng từng khoảnh khắc, dù là trong niềm vui hay thử thách."
        }
    ],
    confusion: [
        {
            id: "co1",
            quote: "Khi tâm như nước đục, hãy để nó lắng xuống. Đừng cố nhìn xuyên qua màn sương mù.",
            author: authorCollection.tnh,
            reflection: "Trong những lúc hoang mang, hãy ngừng tìm kiếm câu trả lời. Chỉ cần an trú trong hơi thở, để tâm được nghỉ ngơi."
        },
        {
            id: "co2",
            quote: "Hỗn loạn không nằm trong thế giới, mà nằm trong tâm chúng ta.",
            author: authorCollection.dptc,
            reflection: "Sự hoang mang xuất phát từ cách ta nhìn nhận vấn đề. Hãy thay đổi góc nhìn, và con đường sẽ dần sáng tỏ."
        },
        {
            id: "co3",
            quote: "Không biết là bước đầu tiên để biết.",
            author: authorCollection.shu_su,
            reflection: "Chấp nhận sự không biết là dấu hiệu của trí tuệ. Đừng sợ hãi trước những câu hỏi chưa có lời đáp, hãy ôm lấy chúng."
        }
    ]
};
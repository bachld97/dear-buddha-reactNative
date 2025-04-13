export interface BuddhistWisdom {
    quote: string;
    author: string;
    reflection: string;
}

type Intent = 'calm' | 'insight' | 'gratitude' | 'confusion';

// A collection of Buddhist wisdom quotes and reflections
const wisdomCollection: Record<Intent, BuddhistWisdom[]> = {
    calm: [
        {
            quote: "Bạn không thể đi hết con đường cho đến khi bạn trở thành con đường đó.",
            author: "Đức Phật Thích Ca",
            reflection: "Hãy trở thành sự bình yên mà bạn tìm kiếm. Thực hành chánh niệm trong từng hành động, từ hơi thở đến bước chân."
        },
        {
            quote: "Nếu chúng ta có thể thấy con đường trước mặt, chúng ta không còn trên con đường nữa.",
            author: "Thiền sư Thích Nhất Hạnh",
            reflection: "Đừng lo lắng về tương lai hay tiếc nuối quá khứ. Hãy tập trung vào giây phút hiện tại, nơi bình yên thực sự tồn tại."
        },
        {
            quote: "Hãy để mọi thứ trôi qua, giống như nước chảy qua tay bạn.",
            author: "Thiền sư Ajahn Chah",
            reflection: "Đừng nắm giữ, đừng chống cự. Hãy quan sát những cảm xúc và suy nghĩ đến rồi đi, như những đám mây trôi qua bầu trời."
        }
    ],
    insight: [
        {
            quote: "Trong vòng luân hồi vô tận, tại sao chúng ta lại xem nhẹ người khác để tự tôn mình?",
            author: "Đức Đạt Lai Lạt Ma",
            reflection: "Mọi chúng sinh đều bình đẳng trong khát vọng tìm kiếm hạnh phúc và tránh khổ đau. Hãy nhìn thế giới bằng con mắt của lòng từ bi."
        },
        {
            quote: "Nếu bạn muốn biết quá khứ của mình, hãy nhìn vào hoàn cảnh hiện tại. Nếu bạn muốn biết tương lai, hãy nhìn vào hành động hôm nay.",
            author: "Đức Phật Thích Ca",
            reflection: "Nhân quả là quy luật không thể tránh khỏi. Mỗi hành động đều tạo ra hạt giống cho tương lai. Hãy gieo những hạt giống tốt đẹp."
        },
        {
            quote: "Hiểu biết là quá trình dần dần, từng bước một.",
            author: "Thiền sư Shunryu Suzuki",
            reflection: "Đừng vội vàng trên con đường tìm kiếm trí tuệ. Chậm rãi và kiên nhẫn, ánh sáng sẽ dần hiện ra trong tâm bạn."
        }
    ],
    gratitude: [
        {
            quote: "Hãy nhìn sâu vào lòng biết ơn, và bạn sẽ tìm thấy sức mạnh.",
            author: "Thiền sư Thích Nhất Hạnh",
            reflection: "Lòng biết ơn là cánh cửa mở ra hạnh phúc. Mỗi ngày, hãy dành thời gian để cảm nhận biết ơn về những điều đơn giản nhất."
        },
        {
            quote: "Cho đi không chỉ là điều nên làm, mà còn là nguồn hạnh phúc.",
            author: "Đức Đạt Lai Lạt Ma",
            reflection: "Khi ta cho đi với tâm biết ơn, ta không chỉ làm phong phú cuộc sống người khác, mà còn tạo nên niềm vui trong chính mình."
        },
        {
            quote: "Mỗi buổi sáng, khi thức dậy, tôi biết ơn vì có ngày mới để thực hành.",
            author: "Thiền sư Dogen",
            reflection: "Mỗi ngày là món quà quý giá. Hãy sống trọn vẹn và trân trọng từng khoảnh khắc, dù là trong niềm vui hay thử thách."
        }
    ],
    confusion: [
        {
            quote: "Khi tâm như nước đục, hãy để nó lắng xuống. Đừng cố nhìn xuyên qua màn sương mù.",
            author: "Thiền sư Thích Nhất Hạnh",
            reflection: "Trong những lúc hoang mang, hãy ngừng tìm kiếm câu trả lời. Chỉ cần an trú trong hơi thở, để tâm được nghỉ ngơi."
        },
        {
            quote: "Hỗn loạn không nằm trong thế giới, mà nằm trong tâm chúng ta.",
            author: "Đức Phật Thích Ca",
            reflection: "Sự hoang mang xuất phát từ cách ta nhìn nhận vấn đề. Hãy thay đổi góc nhìn, và con đường sẽ dần sáng tỏ."
        },
        {
            quote: "Không biết là bước đầu tiên để biết.",
            author: "Thiền sư Shunryu Suzuki",
            reflection: "Chấp nhận sự không biết là dấu hiệu của trí tuệ. Đừng sợ hãi trước những câu hỏi chưa có lời đáp, hãy ôm lấy chúng."
        }
    ]
};

export const generateBuddhistWisdom =
    async (intent: string): Promise<BuddhistWisdom> => {
        return new Promise((resolve) => {
            // Default to calm if intent is not recognized
            const safeIntent = (intent in wisdomCollection) ? intent as Intent : 'calm';

            // Get the collection for the specified intent
            const collection = wisdomCollection[safeIntent];

            // Randomly select a wisdom
            const randomIndex = Math.floor(Math.random() * collection.length);

            // Simulate a small delay to make it feel more natural
            setTimeout(() => {
                resolve(collection[randomIndex]);
            }, 500);
        });
    };


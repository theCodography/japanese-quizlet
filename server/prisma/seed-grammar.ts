import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

interface GrammarEntry {
  title: string;
  structure: string;
  meaning: string;
  explanation?: string;
  example: string;
  example2?: string;
  example3?: string;
  level: string;
  textbook: string;
  lesson?: number;
  order: number;
}

// =============================================
// N5 - Minna no Nihongo 1 (Bài 1-25)
// =============================================
const n5Grammar: GrammarEntry[] = [
  // Bài 1
  {
    title: '～は～です',
    structure: 'N1 は N2 です',
    meaning: 'N1 là N2',
    explanation: 'Dùng để giới thiệu, định nghĩa hoặc khẳng định chủ ngữ là gì. は (wa) là trợ từ chủ đề, です là trợ động từ lịch sự.',
    example: '私は学生です。(Tôi là sinh viên.)',
    example2: '田中さんは先生です。(Anh Tanaka là giáo viên.)',
    example3: 'これは本です。(Đây là quyển sách.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 1, order: 1
  },
  {
    title: '～は～じゃありません',
    structure: 'N1 は N2 じゃありません',
    meaning: 'N1 không phải là N2',
    explanation: 'Thể phủ định của ～は～です. じゃありません là dạng phủ định lịch sự. Dạng trang trọng hơn: ではありません.',
    example: '私は先生じゃありません。(Tôi không phải là giáo viên.)',
    example2: 'これはペンじゃありません。(Đây không phải là bút.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 1, order: 2
  },
  {
    title: '～は～ですか',
    structure: 'N1 は N2 ですか',
    meaning: 'N1 có phải là N2 không?',
    explanation: 'Thêm か vào cuối câu để tạo câu hỏi Yes/No. Ngữ điệu lên ở cuối câu.',
    example: 'あなたは日本人ですか。(Bạn có phải là người Nhật không?)',
    example2: 'ミラーさんはアメリカ人ですか。(Anh Miller có phải người Mỹ không?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 1, order: 3
  },
  {
    title: 'も (trợ từ)',
    structure: 'N1 も N2 です',
    meaning: 'N1 cũng là N2',
    explanation: 'Trợ từ も thay thế は để biểu thị ý "cũng". Dùng khi muốn nói thêm một đối tượng tương tự.',
    example: 'ミラーさんも学生です。(Anh Miller cũng là sinh viên.)',
    example2: '私もベトナム人です。(Tôi cũng là người Việt Nam.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 1, order: 4
  },
  // Bài 2
  {
    title: 'これ／それ／あれ',
    structure: 'これ／それ／あれ は N です',
    meaning: 'Cái này / Cái đó / Cái kia là N',
    explanation: 'これ: gần người nói. それ: gần người nghe. あれ: xa cả hai. Là đại từ chỉ vật.',
    example: 'これは辞書です。(Đây là từ điển.)',
    example2: 'それは何ですか。(Đó là cái gì?)',
    example3: 'あれは病院です。(Kia là bệnh viện.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 2, order: 5
  },
  {
    title: 'この／その／あの + N',
    structure: 'この／その／あの + N',
    meaning: 'N này / N đó / N kia',
    explanation: 'Khác với これ/それ/あれ (đại từ đứng một mình), この/その/あの luôn đi kèm danh từ phía sau.',
    example: 'この本は日本語の本です。(Quyển sách này là sách tiếng Nhật.)',
    example2: 'その傘はだれのですか。(Cái ô đó là của ai?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 2, order: 6
  },
  {
    title: 'N1 の N2',
    structure: 'N1 の N2',
    meaning: 'N2 của N1',
    explanation: 'Trợ từ の nối hai danh từ, biểu thị quan hệ sở hữu, thuộc tính, xuất xứ v.v.',
    example: '私の本。(Sách của tôi.)',
    example2: '日本語の先生。(Giáo viên tiếng Nhật.)',
    example3: '大学の学生。(Sinh viên đại học.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 2, order: 7
  },
  // Bài 3
  {
    title: 'ここ／そこ／あそこ',
    structure: 'ここ／そこ／あそこ は N です',
    meaning: 'Ở đây / Ở đó / Ở kia là N',
    explanation: 'Đại từ chỉ nơi chốn. ここ: gần người nói. そこ: gần người nghe. あそこ: xa cả hai.',
    example: 'ここは食堂です。(Đây là nhà ăn.)',
    example2: 'トイレはあそこです。(Nhà vệ sinh ở kia.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 3, order: 8
  },
  {
    title: 'N は どこ ですか',
    structure: 'N は どこ ですか',
    meaning: 'N ở đâu?',
    explanation: 'Dùng để hỏi vị trí, địa điểm của một người hoặc vật.',
    example: '郵便局はどこですか。(Bưu điện ở đâu?)',
    example2: 'エレベーターはどこですか。(Thang máy ở đâu?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 3, order: 9
  },
  // Bài 4
  {
    title: '今～時～分です',
    structure: '今 ～時 ～分 です',
    meaning: 'Bây giờ là ～ giờ ～ phút',
    explanation: 'Cách nói giờ trong tiếng Nhật. 時(じ) = giờ, 分(ふん/ぷん) = phút.',
    example: '今7時15分です。(Bây giờ là 7 giờ 15 phút.)',
    example2: '会議は3時からです。(Cuộc họp từ 3 giờ.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 4, order: 10
  },
  {
    title: 'V ます／V ません',
    structure: 'V ます / V ません',
    meaning: 'Làm V / Không làm V (thể lịch sự)',
    explanation: 'ます: thể khẳng định lịch sự hiện tại/tương lai. ません: thể phủ định lịch sự. ました: quá khứ khẳng định. ませんでした: quá khứ phủ định.',
    example: '毎日勉強します。(Mỗi ngày tôi học.)',
    example2: '昨日働きませんでした。(Hôm qua tôi không làm việc.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 4, order: 11
  },
  {
    title: 'N(thời gian) に V',
    structure: 'N(thời gian) に V ます',
    meaning: 'Làm V vào lúc N',
    explanation: 'Trợ từ に dùng với mốc thời gian cụ thể (giờ, ngày, tháng). Không dùng に với 今日、明日、毎日、いつ.',
    example: '7時に起きます。(Tôi thức dậy lúc 7 giờ.)',
    example2: '日曜日に映画を見ます。(Chủ nhật tôi xem phim.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 4, order: 12
  },
  // Bài 5
  {
    title: 'N(nơi) へ 行きます／来ます／帰ります',
    structure: 'N(nơi) へ 行きます／来ます／帰ります',
    meaning: 'Đi đến / Đến / Về N',
    explanation: 'Trợ từ へ (đọc là "e") chỉ hướng di chuyển. Dùng với các động từ di chuyển.',
    example: '学校へ行きます。(Tôi đi đến trường.)',
    example2: '日本へ来ました。(Tôi đã đến Nhật.)',
    example3: 'うちへ帰ります。(Tôi về nhà.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 5, order: 13
  },
  {
    title: 'N(phương tiện) で 行きます',
    structure: 'N(phương tiện) で V',
    meaning: 'Đi bằng N (phương tiện)',
    explanation: 'Trợ từ で chỉ phương tiện, công cụ được sử dụng. "歩いて" (đi bộ) không dùng で.',
    example: 'バスで学校へ行きます。(Tôi đi đến trường bằng xe buýt.)',
    example2: '箸で食べます。(Tôi ăn bằng đũa.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 5, order: 14
  },
  // Bài 6
  {
    title: 'N を V',
    structure: 'N を V ます',
    meaning: 'Làm V (đối tượng) N',
    explanation: 'Trợ từ を (đọc là "o") đánh dấu tân ngữ trực tiếp của động từ tha động từ.',
    example: 'パンを食べます。(Tôi ăn bánh mì.)',
    example2: '水を飲みます。(Tôi uống nước.)',
    example3: '日本語を勉強します。(Tôi học tiếng Nhật.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 6, order: 15
  },
  {
    title: 'N(nơi) で V',
    structure: 'N(nơi) で V ます',
    meaning: 'Làm V ở/tại N',
    explanation: 'Trợ từ で chỉ nơi diễn ra hành động. Khác với に (chỉ nơi tồn tại).',
    example: '図書館で勉強します。(Tôi học ở thư viện.)',
    example2: 'レストランで昼ごはんを食べます。(Tôi ăn trưa ở nhà hàng.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 6, order: 16
  },
  {
    title: 'V ませんか',
    structure: 'V ませんか',
    meaning: 'Bạn có muốn V không? (Mời rủ)',
    explanation: 'Dùng để mời, rủ ai đó làm gì một cách lịch sự.',
    example: 'いっしょに映画を見ませんか。(Cùng xem phim không?)',
    example2: 'コーヒーを飲みませんか。(Uống cà phê không?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 6, order: 17
  },
  {
    title: 'V ましょう',
    structure: 'V ましょう',
    meaning: 'Cùng làm V nhé/nào!',
    explanation: 'Dùng để đề xuất cùng làm gì đó. Thường dùng khi đối phương đã đồng ý hoặc trong nhóm.',
    example: 'いっしょに行きましょう。(Cùng đi nhé!)',
    example2: '休みましょう。(Nghỉ thôi nào!)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 6, order: 18
  },
  // Bài 7
  {
    title: 'N(công cụ) で V',
    structure: 'N(công cụ/ngôn ngữ) で V',
    meaning: 'Làm V bằng N',
    explanation: 'Trợ từ で chỉ phương tiện, công cụ, ngôn ngữ dùng để thực hiện hành động.',
    example: '日本語でレポートを書きます。(Tôi viết báo cáo bằng tiếng Nhật.)',
    example2: 'はさみで紙を切ります。(Tôi cắt giấy bằng kéo.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 7, order: 19
  },
  {
    title: 'N(người) に V',
    structure: 'N(người) に V ます',
    meaning: 'Làm V cho/với N (người)',
    explanation: 'Trợ từ に chỉ đối tượng nhận hành động (người nhận) với các động từ あげます、もらいます、かします v.v.',
    example: '友達に本をあげます。(Tôi tặng sách cho bạn.)',
    example2: '先生にもらいました。(Tôi đã nhận từ thầy.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 7, order: 20
  },
  // Bài 8
  {
    title: 'い-Adj です',
    structure: 'N は い-Adj です',
    meaning: 'N thì Adj (tính từ đuôi い)',
    explanation: 'Tính từ đuôi い trực tiếp bổ nghĩa. Phủ định: bỏ い thêm くないです. Quá khứ: bỏ い thêm かったです.',
    example: 'この本はおもしろいです。(Cuốn sách này hay.)',
    example2: '今日は暑くないです。(Hôm nay không nóng.)',
    example3: '昨日は寒かったです。(Hôm qua lạnh.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 8, order: 21
  },
  {
    title: 'な-Adj です',
    structure: 'N は な-Adj です',
    meaning: 'N thì Adj (tính từ đuôi な)',
    explanation: 'Tính từ đuôi な. Phủ định: じゃありません. Quá khứ: でした. Khi bổ nghĩa danh từ: な-Adj + な + N.',
    example: '東京はにぎやかです。(Tokyo nhộn nhịp.)',
    example2: '日本語は簡単じゃありません。(Tiếng Nhật không dễ.)',
    example3: 'きれいな花。(Hoa đẹp.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 8, order: 22
  },
  // Bài 9
  {
    title: 'N が 好きです／嫌いです',
    structure: 'N が 好きです / 嫌いです / 上手です / 下手です',
    meaning: 'Thích N / Ghét N / Giỏi N / Dở N',
    explanation: 'Với các tính từ chỉ cảm xúc, khả năng: dùng trợ từ が để đánh dấu đối tượng.',
    example: '私は音楽が好きです。(Tôi thích âm nhạc.)',
    example2: '田中さんは英語が上手です。(Anh Tanaka giỏi tiếng Anh.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 9, order: 23
  },
  {
    title: 'どうして～から',
    structure: 'どうしてですか。～からです。',
    meaning: 'Tại sao? Vì ～',
    explanation: 'どうして dùng để hỏi lý do. から ở cuối câu biểu thị nguyên nhân, lý do.',
    example: 'どうして遅れましたか。…バスが来なかったからです。(Sao đến muộn? ...Vì xe buýt không đến.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 9, order: 24
  },
  // Bài 10
  {
    title: 'N が あります／います',
    structure: 'N(nơi) に N が あります／います',
    meaning: 'Có N ở (nơi)',
    explanation: 'あります: dùng cho vật vô tri, cây cối. います: dùng cho người, động vật. に chỉ nơi tồn tại.',
    example: '部屋にテレビがあります。(Trong phòng có tivi.)',
    example2: '公園に子どもがいます。(Trong công viên có trẻ em.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 10, order: 25
  },
  {
    title: 'N は N(nơi) に あります／います',
    structure: 'N は N(nơi) に あります／います',
    meaning: 'N ở (nơi)',
    explanation: 'Khi muốn nói vị trí của một vật/người cụ thể, chủ ngữ dùng は.',
    example: '銀行は駅の前にあります。(Ngân hàng ở trước ga.)',
    example2: '猫はテーブルの下にいます。(Con mèo ở dưới bàn.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 10, order: 26
  },
  // Bài 11
  {
    title: '～つ／～人（助数詞）',
    structure: 'N を 数量 V ます',
    meaning: 'Cách đếm (trợ số từ)',
    explanation: 'Tiếng Nhật dùng trợ số từ khi đếm. ～つ: đếm vật chung. ～人(にん): đếm người. ～枚(まい): đếm vật mỏng phẳng. ～台(だい): đếm máy móc, xe.',
    example: 'りんごを3つ買いました。(Tôi đã mua 3 quả táo.)',
    example2: '学生が5人います。(Có 5 sinh viên.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 11, order: 27
  },
  // Bài 12
  {
    title: '～は～より Adj です',
    structure: 'N1 は N2 より Adj です',
    meaning: 'N1 hơn N2 về Adj',
    explanation: 'Cấu trúc so sánh hơn. より nghĩa là "hơn".',
    example: '東京は大阪より大きいです。(Tokyo lớn hơn Osaka.)',
    example2: '日本語は英語より難しいです。(Tiếng Nhật khó hơn tiếng Anh.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 12, order: 28
  },
  {
    title: 'N の中で～が いちばん Adj',
    structure: 'N の中で 何/どこ/だれ が いちばん Adj ですか',
    meaning: 'Trong N, cái gì/đâu/ai là Adj nhất?',
    explanation: 'Cấu trúc so sánh nhất. いちばん = nhất.',
    example: '果物の中で何がいちばん好きですか。(Trong hoa quả, bạn thích cái nào nhất?)',
    example2: '日本でどこがいちばんきれいですか。(Ở Nhật, đâu đẹp nhất?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 12, order: 29
  },
  // Bài 13
  {
    title: 'N が ほしいです',
    structure: 'N が ほしいです',
    meaning: 'Muốn có N',
    explanation: 'ほしい là tính từ đuôi い, biểu thị mong muốn sở hữu. Chỉ dùng cho ngôi thứ nhất (hoặc hỏi ngôi thứ hai).',
    example: '新しいパソコンがほしいです。(Tôi muốn có máy tính mới.)',
    example2: '何がほしいですか。(Bạn muốn có gì?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 13, order: 30
  },
  {
    title: 'V たいです',
    structure: 'V(ます form bỏ ます) たいです',
    meaning: 'Muốn làm V',
    explanation: 'Biểu thị mong muốn hành động. Bỏ ます, thêm たい. たい chia như tính từ đuôi い.',
    example: '日本へ行きたいです。(Tôi muốn đi Nhật.)',
    example2: '寿司を食べたいです。(Tôi muốn ăn sushi.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 13, order: 31
  },
  {
    title: 'N へ V に 行きます／来ます',
    structure: 'N(nơi) へ V(ます bỏ ます) に 行きます／来ます',
    meaning: 'Đi/Đến N để V',
    explanation: 'Biểu thị mục đích di chuyển. V ở dạng ます bỏ ます (masu-stem).',
    example: 'デパートへ買い物に行きます。(Tôi đi siêu thị để mua sắm.)',
    example2: '日本へ日本語を勉強しに来ました。(Tôi đến Nhật để học tiếng Nhật.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 13, order: 32
  },
  // Bài 14
  {
    title: 'V て ください',
    structure: 'V て ください',
    meaning: 'Hãy làm V (yêu cầu lịch sự)',
    explanation: 'Dùng thể て + ください để nhờ vả, yêu cầu lịch sự. Thể て là dạng nối của động từ.',
    example: 'ちょっと待ってください。(Xin hãy đợi một chút.)',
    example2: '名前を書いてください。(Hãy viết tên.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 14, order: 33
  },
  {
    title: 'V て います',
    structure: 'V て います',
    meaning: 'Đang làm V / Đã V (trạng thái)',
    explanation: 'Biểu thị hành động đang diễn ra, hoặc trạng thái kết quả của hành động đã xảy ra.',
    example: '今、本を読んでいます。(Bây giờ tôi đang đọc sách.)',
    example2: '田中さんは結婚しています。(Anh Tanaka đã kết hôn rồi.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 14, order: 34
  },
  {
    title: 'V ても いいですか',
    structure: 'V ても いいですか',
    meaning: 'Có được phép V không?',
    explanation: 'Dùng để xin phép. Trả lời: はい、いいですよ (Được) / いいえ、いけません (Không được).',
    example: 'ここで写真を撮ってもいいですか。(Có được chụp ảnh ở đây không?)',
    example2: '窓を開けてもいいですか。(Mở cửa sổ được không?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 14, order: 35
  },
  {
    title: 'V ては いけません',
    structure: 'V ては いけません',
    meaning: 'Không được phép V',
    explanation: 'Biểu thị sự cấm đoán.',
    example: 'ここでタバコを吸ってはいけません。(Không được hút thuốc ở đây.)',
    example2: '写真を撮ってはいけません。(Không được chụp ảnh.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 14, order: 36
  },
  // Bài 15
  {
    title: 'V て、V て、V (nối hành động)',
    structure: 'V1 て、V2 て、V3',
    meaning: 'Làm V1, rồi V2, rồi V3',
    explanation: 'Dùng thể て để nối các hành động theo trình tự thời gian.',
    example: '朝起きて、顔を洗って、朝ごはんを食べます。(Sáng dậy, rửa mặt, rồi ăn sáng.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 15, order: 37
  },
  // Bài 16
  {
    title: 'Adj くて / Adj で (nối tính từ)',
    structure: 'い-Adj(bỏ い)くて / な-Adj で',
    meaning: 'Vừa Adj1 vừa Adj2 (nối tính từ)',
    explanation: 'Nối tính từ: い-Adj bỏ い thêm くて. な-Adj thêm で.',
    example: 'この部屋は広くて明るいです。(Phòng này rộng và sáng.)',
    example2: 'ミラーさんはハンサムで親切です。(Anh Miller đẹp trai và tốt bụng.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 16, order: 38
  },
  {
    title: 'V てから、V',
    structure: 'V1 てから、V2',
    meaning: 'Sau khi làm V1, làm V2',
    explanation: 'Biểu thị hành động V2 xảy ra sau khi V1 hoàn thành.',
    example: 'ご飯を食べてから、薬を飲みます。(Sau khi ăn cơm, uống thuốc.)',
    example2: '映画を見てから、レストランへ行きましょう。(Sau khi xem phim, đi nhà hàng nhé.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 16, order: 39
  },
  // Bài 17
  {
    title: 'V ない で ください',
    structure: 'V(ない form) で ください',
    meaning: 'Xin đừng làm V',
    explanation: 'Thể ない + でください biểu thị yêu cầu không làm gì. Thể ない: nhóm I bỏ ます đổi âm cuối sang hàng あ + ない.',
    example: 'ここで写真を撮らないでください。(Xin đừng chụp ảnh ở đây.)',
    example2: '忘れないでください。(Xin đừng quên.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 17, order: 40
  },
  {
    title: 'V なければ なりません',
    structure: 'V(ない bỏ ない) なければ なりません',
    meaning: 'Phải làm V',
    explanation: 'Biểu thị nghĩa vụ, bắt buộc phải làm gì đó.',
    example: '薬を飲まなければなりません。(Phải uống thuốc.)',
    example2: '毎日勉強しなければなりません。(Phải học mỗi ngày.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 17, order: 41
  },
  {
    title: 'V なくても いいです',
    structure: 'V(ない bỏ ない) なくても いいです',
    meaning: 'Không cần phải làm V cũng được',
    explanation: 'Biểu thị không bắt buộc, không cần thiết phải làm.',
    example: '明日来なくてもいいです。(Ngày mai không cần đến cũng được.)',
    example2: '靴を脱がなくてもいいです。(Không cần cởi giày cũng được.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 17, order: 42
  },
  // Bài 18
  {
    title: 'V(辞書形) ことができます',
    structure: 'V(辞書形/dictionary form) ことができます',
    meaning: 'Có thể làm V',
    explanation: 'Biểu thị khả năng, năng lực. 辞書形 (dictionary form) là dạng nguyên thể của động từ.',
    example: '日本語を話すことができます。(Tôi có thể nói tiếng Nhật.)',
    example2: '車を運転することができますか。(Bạn có thể lái xe không?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 18, order: 43
  },
  {
    title: '趣味は V(辞書形) ことです',
    structure: '趣味は V(辞書形) ことです',
    meaning: 'Sở thích là V',
    explanation: 'V(辞書形) + こと biến động từ thành danh từ (danh từ hóa).',
    example: '趣味は映画を見ることです。(Sở thích của tôi là xem phim.)',
    example2: '趣味は料理を作ることです。(Sở thích là nấu ăn.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 18, order: 44
  },
  // Bài 19
  {
    title: 'V た ことが あります',
    structure: 'V(た form) ことが あります',
    meaning: 'Đã từng làm V',
    explanation: 'Biểu thị kinh nghiệm đã trải qua. た form là thể quá khứ thường.',
    example: '日本へ行ったことがあります。(Tôi đã từng đi Nhật.)',
    example2: '納豆を食べたことがありますか。(Bạn đã từng ăn natto chưa?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 19, order: 45
  },
  {
    title: 'V たり V たり します',
    structure: 'V1 たり、V2 たり します',
    meaning: 'Làm những việc như V1, V2...',
    explanation: 'Liệt kê một số hành động tiêu biểu (không phải tất cả). Dạng た + り.',
    example: '週末は映画を見たり、買い物をしたりします。(Cuối tuần tôi xem phim, mua sắm v.v.)',
    example2: '休みの日は本を読んだり、音楽を聞いたりします。(Ngày nghỉ đọc sách, nghe nhạc v.v.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 19, order: 46
  },
  // Bài 20
  {
    title: '普通形 (Thể thường)',
    structure: '普通形 (Plain form)',
    meaning: 'Thể thường / Thể thân mật',
    explanation: 'Dùng trong hội thoại thân mật, hoặc trước một số cấu trúc ngữ pháp. Động từ: 行く/行かない/行った/行かなかった. い-Adj: 高い/高くない. な-Adj: 静かだ/静かじゃない. N: 学生だ/学生じゃない.',
    example: 'これ、おいしい！(Cái này ngon!)',
    example2: '明日行く？(Ngày mai đi không?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 20, order: 47
  },
  // Bài 21
  {
    title: '普通形 と思います',
    structure: '普通形 と思います',
    meaning: 'Tôi nghĩ rằng ～',
    explanation: 'Biểu thị ý kiến, suy nghĩ cá nhân của người nói.',
    example: '明日は雨が降ると思います。(Tôi nghĩ ngày mai trời mưa.)',
    example2: 'この映画はおもしろいと思います。(Tôi nghĩ bộ phim này hay.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 21, order: 48
  },
  {
    title: '普通形 と言いました',
    structure: '「～」と言いました / 普通形 と言いました',
    meaning: '～ đã nói rằng ～',
    explanation: 'Dùng để trích dẫn lời nói. Trích dẫn trực tiếp dùng 「」, gián tiếp dùng 普通形.',
    example: '田中さんは「明日来ます」と言いました。(Anh Tanaka nói "Ngày mai tôi sẽ đến".)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 21, order: 49
  },
  // Bài 22
  {
    title: '連体修飾 (Mệnh đề quan hệ)',
    structure: '普通形 + N',
    meaning: 'N mà ～ (bổ nghĩa cho danh từ)',
    explanation: 'Mệnh đề bổ nghĩa đứng trước danh từ. な-Adj dùng な (không dùng だ). N dùng の (không dùng だ).',
    example: '昨日買った本。(Quyển sách đã mua hôm qua.)',
    example2: '日本語を教える先生。(Giáo viên dạy tiếng Nhật.)',
    example3: '背が高い人。(Người cao.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 22, order: 50
  },
  // Bài 23
  {
    title: 'V(辞書形) とき',
    structure: 'V(辞書形/た form) とき、～',
    meaning: 'Khi V thì ～',
    explanation: 'とき biểu thị thời điểm. V辞書形+とき: khi chưa xảy ra. Vた+とき: khi đã xảy ra. い-Adj+とき, な-Adj+な+とき, N+の+とき.',
    example: '国へ帰るとき、お土産を買います。(Khi về nước, tôi sẽ mua quà.)',
    example2: '子どものとき、よく泳ぎました。(Khi còn nhỏ, tôi hay bơi.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 23, order: 51
  },
  // Bài 24
  {
    title: 'V て あげます／もらいます／くれます',
    structure: 'V て あげます / もらいます / くれます',
    meaning: 'Làm V cho ai / Được ai làm V cho / Ai làm V cho tôi',
    explanation: 'てあげます: tôi làm cho ai. てもらいます: tôi được ai làm cho. てくれます: ai đó làm cho tôi (biết ơn).',
    example: '友達に日本語を教えてあげました。(Tôi đã dạy tiếng Nhật cho bạn.)',
    example2: '母が料理を作ってくれました。(Mẹ đã nấu ăn cho tôi.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 24, order: 52
  },
  // Bài 25
  {
    title: '普通形 たら',
    structure: 'V(た form) + ら / い-Adj(bỏ い)かったら / な-Adj だったら / N だったら',
    meaning: 'Nếu ～ thì ～',
    explanation: 'Biểu thị điều kiện giả định. Dạng た + ら.',
    example: '雨が降ったら、出かけません。(Nếu trời mưa thì không đi ra ngoài.)',
    example2: '安かったら、買います。(Nếu rẻ thì mua.)',
    example3: '暇だったら、映画を見に行きませんか。(Nếu rảnh thì đi xem phim không?)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 25, order: 53
  },
  {
    title: 'V ても',
    structure: 'V て + も',
    meaning: 'Dù có V thì ～',
    explanation: 'Biểu thị sự nhượng bộ: dù điều kiện xảy ra, kết quả vẫn không thay đổi.',
    example: '薬を飲んでも、熱が下がりません。(Dù uống thuốc, sốt vẫn không hạ.)',
    example2: '何回聞いても、わかりません。(Dù hỏi bao nhiêu lần vẫn không hiểu.)',
    level: 'N5', textbook: 'Minna no Nihongo 1', lesson: 25, order: 54
  },
];

// =============================================
// N4 - Minna no Nihongo 2 (Bài 26-50)
// =============================================
const n4Grammar: GrammarEntry[] = [
  // Bài 26
  {
    title: '普通形 んです',
    structure: '普通形 + んです',
    meaning: 'Là vì ～ / Chuyện là ～',
    explanation: 'Dùng để giải thích lý do, hoàn cảnh, hoặc hỏi nguyên nhân. な-Adj/N dùng な thay だ trước んです.',
    example: 'どうしたんですか。…頭が痛いんです。(Sao vậy? ...Là vì đau đầu.)',
    example2: '明日試験があるんです。(Chuyện là ngày mai có thi.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 26, order: 1
  },
  {
    title: 'V ないで',
    structure: 'V(ない form bỏ ない) ないで',
    meaning: 'Không V mà...',
    explanation: 'Biểu thị làm một việc gì trong trạng thái không làm việc khác.',
    example: '朝ご飯を食べないで、学校へ行きました。(Không ăn sáng mà đi học.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 26, order: 2
  },
  // Bài 27
  {
    title: '可能形 (Thể khả năng)',
    structure: 'V(可能形)',
    meaning: 'Có thể V',
    explanation: 'Nhóm I: bỏ ます, đổi âm cuối sang hàng え + ます (書きます→書けます). Nhóm II: bỏ ます thêm られます (食べます→食べられます). Nhóm III: します→できます, 来ます→来られます.',
    example: '漢字が読めます。(Tôi có thể đọc được Kanji.)',
    example2: '日本語が話せます。(Tôi có thể nói tiếng Nhật.)',
    example3: '明日来られますか。(Ngày mai bạn có thể đến không?)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 27, order: 3
  },
  {
    title: '見えます／聞こえます',
    structure: 'N が 見えます／聞こえます',
    meaning: 'Nhìn thấy / Nghe thấy (tự nhiên)',
    explanation: 'Khác với 見られます/聞けます (chủ động). 見えます/聞こえます biểu thị khả năng tự nhiên, không chủ ý.',
    example: 'ここから富士山が見えます。(Từ đây nhìn thấy núi Phú Sĩ.)',
    example2: '音楽が聞こえます。(Nghe thấy tiếng nhạc.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 27, order: 4
  },
  // Bài 28
  {
    title: 'V ながら',
    structure: 'V1(ます bỏ ます) ながら、V2',
    meaning: 'Vừa V1 vừa V2',
    explanation: 'Biểu thị hai hành động xảy ra đồng thời. V2 là hành động chính.',
    example: '音楽を聞きながら、勉強します。(Vừa nghe nhạc vừa học.)',
    example2: 'テレビを見ながら、ご飯を食べます。(Vừa xem TV vừa ăn cơm.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 28, order: 5
  },
  {
    title: 'V て います (thói quen)',
    structure: 'V て います',
    meaning: 'Vẫn đang làm V (thói quen, công việc)',
    explanation: 'Ngoài nghĩa "đang làm", ～ています còn biểu thị thói quen, nghề nghiệp, trạng thái kéo dài.',
    example: '毎朝ジョギングをしています。(Mỗi sáng tôi chạy bộ.)',
    example2: '銀行で働いています。(Tôi làm việc ở ngân hàng.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 28, order: 6
  },
  // Bài 29
  {
    title: 'V て しまいます',
    structure: 'V て しまいます',
    meaning: 'Đã V mất rồi (hoàn thành / tiếc nuối)',
    explanation: 'Biểu thị: 1) Hành động hoàn tất. 2) Kết quả đáng tiếc, ngoài ý muốn. Dạng nói: ～ちゃう/～じゃう.',
    example: '宿題を全部やってしまいました。(Tôi đã làm xong hết bài tập rồi.)',
    example2: '財布をなくしてしまいました。(Tôi đã làm mất ví rồi.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 29, order: 7
  },
  {
    title: 'V て あります',
    structure: 'N が V て あります',
    meaning: 'N đã được V (trạng thái kết quả)',
    explanation: 'Biểu thị trạng thái do ai đó đã cố ý thực hiện và kết quả vẫn còn.',
    example: '窓が開けてあります。(Cửa sổ đã được mở sẵn.)',
    example2: '部屋にエアコンがつけてあります。(Trong phòng đã bật điều hòa sẵn.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 29, order: 8
  },
  // Bài 30
  {
    title: 'V て おきます',
    structure: 'V て おきます',
    meaning: 'Làm V sẵn / Làm V trước',
    explanation: 'Biểu thị hành động chuẩn bị trước cho một mục đích nào đó.',
    example: '旅行の前にホテルを予約しておきます。(Trước chuyến đi, tôi đặt khách sạn sẵn.)',
    example2: '明日のパーティーのために、ケーキを買っておきます。(Mua bánh sẵn cho tiệc ngày mai.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 30, order: 9
  },
  // Bài 31
  {
    title: 'V(意向形) う／よう',
    structure: 'V(意向形)',
    meaning: 'Hãy cùng V / Tôi sẽ V (ý chí)',
    explanation: 'Nhóm I: bỏ ます, đổi âm cuối sang hàng お + う (行きます→行こう). Nhóm II: bỏ ます thêm よう (食べます→食べよう). Nhóm III: します→しよう, 来ます→来よう.',
    example: '一緒に帰ろう。(Cùng về nhé.)',
    example2: '来年日本へ行こうと思っています。(Tôi đang nghĩ năm sau sẽ đi Nhật.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 31, order: 10
  },
  {
    title: 'V(意向形) と思っています',
    structure: 'V(意向形) と思っています',
    meaning: 'Đang có ý định V',
    explanation: 'Biểu thị ý định, dự định đã suy nghĩ từ trước và vẫn đang giữ.',
    example: '来月引っ越そうと思っています。(Tôi đang định tháng sau chuyển nhà.)',
    example2: '大学院に進もうと思っています。(Tôi đang định học lên cao học.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 31, order: 11
  },
  // Bài 32
  {
    title: 'V(た form) ほうがいいです',
    structure: 'V(た form) ほうがいいです / V(ない form) ほうがいいです',
    meaning: 'Nên V / Không nên V',
    explanation: 'Dùng để khuyên bảo. Khẳng định dùng た form, phủ định dùng ない form.',
    example: '薬を飲んだほうがいいです。(Nên uống thuốc.)',
    example2: '夜遅く食べないほうがいいです。(Không nên ăn khuya.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 32, order: 12
  },
  {
    title: '～でしょう',
    structure: '普通形 でしょう',
    meaning: 'Có lẽ ～ / Chắc là ～',
    explanation: 'Biểu thị sự suy đoán, phỏng đoán. Ngữ điệu xuống = suy đoán, lên = xác nhận.',
    example: '明日は天気がいいでしょう。(Ngày mai chắc trời đẹp.)',
    example2: 'あの映画はおもしろいでしょう？(Phim đó hay chứ nhỉ?)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 32, order: 13
  },
  // Bài 33
  {
    title: '命令形／禁止形',
    structure: '命令形 / V(辞書形) な',
    meaning: 'Hãy V! (ra lệnh) / Đừng V! (cấm)',
    explanation: 'Mệnh lệnh: Nhóm I đổi え (書け), Nhóm II thêm ろ (食べろ), する→しろ, 来る→来い. Cấm chỉ: V辞書形+な.',
    example: '止まれ！(Dừng lại!)',
    example2: '走るな！(Đừng chạy!)',
    example3: 'がんばれ！(Cố lên!)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 33, order: 14
  },
  {
    title: '～と書いてあります／～と読みます',
    structure: '～と書いてあります',
    meaning: 'Viết rằng ～ / Đọc là ～',
    explanation: 'Dùng để mô tả nội dung được viết, hoặc cách đọc.',
    example: 'ここに「禁煙」と書いてあります。(Ở đây viết "Cấm hút thuốc".)',
    example2: 'この漢字は「やま」と読みます。(Chữ Kanji này đọc là "yama".)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 33, order: 15
  },
  // Bài 34
  {
    title: 'V(た form) とおりに',
    structure: 'V(た form) とおりに / N の とおりに',
    meaning: 'Theo đúng như ～',
    explanation: 'Biểu thị làm đúng theo cách ai đó đã làm/nói/viết.',
    example: '先生が言ったとおりにしてください。(Hãy làm đúng như thầy nói.)',
    example2: '説明書のとおりに組み立てました。(Tôi đã lắp ráp đúng theo hướng dẫn.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 34, order: 16
  },
  {
    title: 'V(た form) あとで',
    structure: 'V(た form) あとで / N の あとで',
    meaning: 'Sau khi V / Sau N',
    explanation: 'Biểu thị hành động xảy ra sau một hành động hoặc sự kiện khác.',
    example: '仕事が終わったあとで、飲みに行きます。(Sau khi xong việc, đi uống.)',
    example2: '昼ご飯のあとで、散歩します。(Sau bữa trưa, đi dạo.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 34, order: 17
  },
  // Bài 35
  {
    title: '条件形（ば形）',
    structure: 'V(ば form) / い-Adj(bỏ い)ければ / な-Adj なら / N なら',
    meaning: 'Nếu ～ thì ～',
    explanation: 'Điều kiện giả định. Nhóm I: bỏ ます đổi âm sang hàng え + ば (行けば). Nhóm II: bỏ ます thêm れば (食べれば).',
    example: '安ければ、買います。(Nếu rẻ thì mua.)',
    example2: '天気がよければ、ハイキングに行きます。(Nếu trời đẹp thì đi leo núi.)',
    example3: '日本人なら、この漢字が読めるでしょう。(Nếu là người Nhật thì chắc đọc được Kanji này.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 35, order: 18
  },
  // Bài 36
  {
    title: 'V(辞書形) ように',
    structure: 'V(辞書形/ない form) ように、～',
    meaning: 'Để có thể V / Để không V',
    explanation: 'Biểu thị mục đích, cố gắng để đạt được trạng thái nào đó. Dùng với động từ không chủ ý hoặc可能形.',
    example: 'JLPT に合格できるように、毎日勉強しています。(Để có thể đỗ JLPT, mỗi ngày tôi học.)',
    example2: '忘れないように、メモします。(Để không quên, tôi ghi chú lại.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 36, order: 19
  },
  {
    title: 'V(辞書形) ようになりました',
    structure: 'V(辞書形/可能形) ようになりました',
    meaning: 'Đã trở nên có thể V',
    explanation: 'Biểu thị sự thay đổi trạng thái, từ không thể → có thể.',
    example: '日本語が話せるようになりました。(Tôi đã nói được tiếng Nhật rồi.)',
    example2: '漢字が読めるようになりました。(Tôi đã đọc được Kanji rồi.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 36, order: 20
  },
  // Bài 37
  {
    title: '受身形 (Thể bị động)',
    structure: 'N は/が V(受身形)',
    meaning: 'N bị/được V',
    explanation: 'Nhóm I: bỏ ます, đổi âm sang hàng あ + れます (書かれます). Nhóm II: bỏ ます thêm られます (食べられます). する→される, 来る→来られる.',
    example: '私は先生に褒められました。(Tôi được thầy khen.)',
    example2: '電車で足を踏まれました。(Tôi bị giẫm chân trên tàu.)',
    example3: '弟にケーキを食べられました。(Bị em trai ăn mất bánh.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 37, order: 21
  },
  // Bài 38
  {
    title: 'V(辞書形) のは Adj です',
    structure: 'V(辞書形) の は Adj です',
    meaning: 'Việc V thì Adj',
    explanation: 'の danh từ hóa động từ, biến cả mệnh đề thành chủ ngữ.',
    example: '日本語を勉強するのは楽しいです。(Việc học tiếng Nhật thì vui.)',
    example2: '毎日運動するのは大切です。(Việc tập thể dục mỗi ngày là quan trọng.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 38, order: 22
  },
  {
    title: 'V(辞書形) のを忘れました',
    structure: 'V(辞書形) のを V',
    meaning: 'Quên/biết/thôi... việc V',
    explanation: 'の biến mệnh đề thành tân ngữ. Dùng với 忘れます、知っています、やめます v.v.',
    example: '傘を持ってくるのを忘れました。(Tôi quên mang ô.)',
    example2: '田中さんが結婚したのを知っていますか。(Bạn biết anh Tanaka kết hôn chưa?)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 38, order: 23
  },
  // Bài 39
  {
    title: '～て／～で (nguyên nhân)',
    structure: 'V て / い-Adj(bỏ い)くて / な-Adj で / N で',
    meaning: 'Vì ～ nên ～',
    explanation: 'Biểu thị nguyên nhân dẫn đến cảm xúc, trạng thái (không phải hành động chủ ý).',
    example: '試験に落ちて、がっかりしました。(Vì trượt thi nên thất vọng.)',
    example2: '地震で電車が止まりました。(Vì động đất nên tàu dừng.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 39, order: 24
  },
  // Bài 40
  {
    title: '疑問詞 + V(た form) ら いいですか',
    structure: '疑問詞 + V(た form) ら いいですか',
    meaning: 'Nên V gì/ở đâu/như thế nào?',
    explanation: 'Dùng để hỏi xin lời khuyên, chỉ dẫn.',
    example: 'パスポートをなくしたんですが、どうしたらいいですか。(Tôi mất hộ chiếu, nên làm thế nào?)',
    example2: 'この漢字はどう読んだらいいですか。(Kanji này đọc thế nào?)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 40, order: 25
  },
  // Bài 41
  {
    title: 'V て いただけませんか',
    structure: 'V て いただけませんか',
    meaning: 'Có thể vui lòng V cho tôi được không?',
    explanation: 'Cách nhờ vả rất lịch sự. Lịch sự hơn ～てくれませんか và ～てもらえませんか.',
    example: 'すみませんが、この漢字の読み方を教えていただけませんか。(Xin lỗi, bạn có thể chỉ cho tôi cách đọc Kanji này không?)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 41, order: 26
  },
  {
    title: 'V て くださいました',
    structure: 'V て くださいました',
    meaning: '(Người trên) đã V cho tôi',
    explanation: 'Dạng kính ngữ của てくれました. Dùng khi người bề trên làm gì đó cho mình.',
    example: '社長が推薦状を書いてくださいました。(Giám đốc đã viết thư giới thiệu cho tôi.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 41, order: 27
  },
  // Bài 42
  {
    title: 'V(辞書形) ために',
    structure: 'V(辞書形) ために / N の ために',
    meaning: 'Để V / Vì N',
    explanation: 'Biểu thị mục đích. Khác với ように, dùng với động từ chủ ý.',
    example: '日本で働くために、日本語を勉強しています。(Để làm việc ở Nhật, tôi đang học tiếng Nhật.)',
    example2: '家族のために、頑張ります。(Vì gia đình, tôi cố gắng.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 42, order: 28
  },
  // Bài 43
  {
    title: 'V そうです (dáng vẻ)',
    structure: 'V(ます bỏ ます) そうです / い-Adj(bỏ い) そうです / な-Adj そうです',
    meaning: 'Trông có vẻ ～',
    explanation: 'Biểu thị phán đoán dựa trên quan sát bằng mắt. いい→よさそう. ない→なさそう.',
    example: 'この料理はおいしそうです。(Món này trông có vẻ ngon.)',
    example2: '雨が降りそうです。(Trông như sắp mưa.)',
    example3: '元気そうですね。(Trông có vẻ khỏe nhỉ.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 43, order: 29
  },
  // Bài 44
  {
    title: 'V すぎます',
    structure: 'V(ます bỏ ます) すぎます / い-Adj(bỏ い) すぎます / な-Adj すぎます',
    meaning: 'Quá V / Quá Adj',
    explanation: 'Biểu thị mức độ quá mức, thường mang nghĩa tiêu cực.',
    example: '食べすぎました。(Ăn quá nhiều rồi.)',
    example2: 'このかばんは高すぎます。(Cái túi này đắt quá.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 44, order: 30
  },
  {
    title: 'Adj/V く／に します',
    structure: 'い-Adj(bỏ い) くします / な-Adj にします',
    meaning: 'Làm cho Adj (thay đổi)',
    explanation: 'Biểu thị sự thay đổi có chủ ý. なります: thay đổi tự nhiên. します: chủ động thay đổi.',
    example: '音を小さくしてください。(Hãy vặn nhỏ âm thanh.)',
    example2: '部屋をきれいにしました。(Tôi đã dọn sạch phòng.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 44, order: 31
  },
  // Bài 45
  {
    title: '～場合は',
    structure: 'V(普通形) 場合は / い-Adj 場合は / な-Adj な 場合は / N の 場合は',
    meaning: 'Trong trường hợp ～',
    explanation: 'Biểu thị tình huống giả định hoặc cụ thể. Mang tính chính thức hơn たら.',
    example: '地震の場合は、エレベーターを使わないでください。(Trong trường hợp động đất, xin đừng dùng thang máy.)',
    example2: '熱がある場合は、無理しないでください。(Trường hợp sốt thì đừng cố gắng quá.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 45, order: 32
  },
  // Bài 46
  {
    title: '～ところです',
    structure: 'V(辞書形) ところです / V(て form) いるところです / V(た form) ところです',
    meaning: 'Sắp V / Đang V / Vừa V xong',
    explanation: 'ところ biểu thị thời điểm cụ thể của hành động. 辞書形+ところ: sắp. ている+ところ: đang. た+ところ: vừa xong.',
    example: '今から出かけるところです。(Bây giờ sắp đi ra ngoài.)',
    example2: '今ご飯を食べているところです。(Bây giờ đang ăn cơm.)',
    example3: '今帰ったところです。(Vừa mới về.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 46, order: 33
  },
  // Bài 47
  {
    title: '～そうです (nghe nói)',
    structure: '普通形 そうです',
    meaning: 'Nghe nói ～',
    explanation: 'Biểu thị thông tin từ nguồn khác (truyền đạt). Khác với ～そうです (dáng vẻ - bài 43).',
    example: '天気予報によると、明日は雨だそうです。(Theo dự báo thời tiết, nghe nói ngày mai mưa.)',
    example2: '田中さんは来月結婚するそうです。(Nghe nói tháng sau anh Tanaka kết hôn.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 47, order: 34
  },
  {
    title: '～ようです',
    structure: '普通形 ようです',
    meaning: 'Có vẻ như ～ / Hình như ～',
    explanation: 'Biểu thị suy đoán dựa trên thông tin, bằng chứng. Trang trọng hơn ～みたいです.',
    example: 'この本は人気があるようです。(Có vẻ như cuốn sách này được ưa thích.)',
    example2: '田中さんは忙しいようです。(Hình như anh Tanaka bận.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 47, order: 35
  },
  // Bài 48
  {
    title: '使役形 (Thể sai khiến)',
    structure: 'V(使役形)',
    meaning: 'Cho/Bắt ai đó V',
    explanation: 'Nhóm I: bỏ ます, đổi âm sang hàng あ + せます (書かせます). Nhóm II: bỏ ます thêm させます (食べさせます). する→させる, 来る→来させる.',
    example: '母は子どもに野菜を食べさせます。(Mẹ bắt con ăn rau.)',
    example2: '先生は学生に作文を書かせました。(Thầy bắt học sinh viết luận.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 48, order: 36
  },
  // Bài 49
  {
    title: '尊敬語 (Kính ngữ)',
    structure: 'お V(ます bỏ ます) になります',
    meaning: '(Người trên) V (kính ngữ)',
    explanation: 'Kính ngữ nâng cao hành động của người khác. お+V masu stem+になります. Một số kính ngữ đặc biệt: いらっしゃる (いる/行く/来る), おっしゃる (言う), ご覧になる (見る).',
    example: '社長はもうお帰りになりました。(Giám đốc đã về rồi.)',
    example2: '先生は何とおっしゃいましたか。(Thầy đã nói gì ạ?)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 49, order: 37
  },
  // Bài 50
  {
    title: '謙譲語 (Khiêm nhường ngữ)',
    structure: 'お V(ます bỏ ます) します',
    meaning: 'Tôi xin V (khiêm nhường)',
    explanation: 'Hạ thấp hành động của bản thân để tôn trọng đối phương. お+V masu stem+します. Đặc biệt: 参る (行く/来る), 申す (言う), いただく (もらう/食べる), 拝見する (見る).',
    example: 'お荷物をお持ちします。(Tôi xin mang hành lý cho quý khách.)',
    example2: '明日参ります。(Ngày mai tôi sẽ đến ạ.)',
    level: 'N4', textbook: 'Minna no Nihongo 2', lesson: 50, order: 38
  },
];

// =============================================
// N3 - Shinkanzen Master N3 Ngữ pháp
// =============================================
const n3Grammar: GrammarEntry[] = [
  {
    title: '～において／～における',
    structure: 'N において / N における N',
    meaning: 'Tại N / Ở N / Trong N',
    explanation: 'Biểu thị nơi chốn, phạm vi, lĩnh vực. Trang trọng hơn で. における + N (dạng bổ nghĩa).',
    example: '国際会議において、環境問題が議論された。(Tại hội nghị quốc tế, vấn đề môi trường đã được thảo luận.)',
    example2: '日本における外国人労働者の数が増えている。(Số lượng lao động nước ngoài tại Nhật đang tăng.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 1, order: 1
  },
  {
    title: '～に対して',
    structure: 'N に対して / N に対する N',
    meaning: 'Đối với N',
    explanation: 'Biểu thị đối tượng mà hành động/thái độ hướng đến. に対する + N (dạng bổ nghĩa).',
    example: '先生は学生に対して厳しい。(Thầy nghiêm khắc đối với học sinh.)',
    example2: '環境問題に対する関心が高まっている。(Sự quan tâm đối với vấn đề môi trường đang tăng.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 1, order: 2
  },
  {
    title: '～について',
    structure: 'N について / N についての N',
    meaning: 'Về N',
    explanation: 'Biểu thị chủ đề, nội dung được đề cập.',
    example: '日本の文化について研究しています。(Tôi đang nghiên cứu về văn hóa Nhật.)',
    example2: '環境問題についてのレポートを書きました。(Tôi đã viết báo cáo về vấn đề môi trường.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 1, order: 3
  },
  {
    title: '～によって／～による',
    structure: 'N によって / N による N',
    meaning: 'Tùy theo N / Do N / Bởi N',
    explanation: 'Nhiều nghĩa: 1) Tùy theo (sự khác biệt). 2) Nguyên nhân. 3) Phương tiện. 4) Tác nhân (bị động).',
    example: '国によって文化が違います。(Văn hóa khác nhau tùy theo quốc gia.)',
    example2: '地震による被害は大きかった。(Thiệt hại do động đất là rất lớn.)',
    example3: 'この小説は村上春樹によって書かれた。(Tiểu thuyết này được viết bởi Murakami Haruki.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 1, order: 4
  },
  {
    title: '～として',
    structure: 'N として',
    meaning: 'Với tư cách là N',
    explanation: 'Biểu thị tư cách, vai trò, lập trường.',
    example: '留学生として日本に来ました。(Tôi đến Nhật với tư cách du học sinh.)',
    example2: 'ボランティアとして参加しました。(Tôi đã tham gia với tư cách tình nguyện viên.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 1, order: 5
  },
  {
    title: '～を中心に',
    structure: 'N を中心に（して）',
    meaning: 'Lấy N làm trung tâm',
    explanation: 'Biểu thị cái gì là trung tâm, trọng điểm.',
    example: '東京を中心に地震の被害が広がった。(Lấy Tokyo làm trung tâm, thiệt hại động đất lan rộng.)',
    example2: '文法を中心に勉強しています。(Tôi đang học lấy ngữ pháp làm trọng tâm.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 2, order: 6
  },
  {
    title: '～をもとに',
    structure: 'N をもとに（して）',
    meaning: 'Dựa trên N',
    explanation: 'Biểu thị cơ sở, nền tảng để làm gì đó.',
    example: '実話をもとに映画を作った。(Đã làm phim dựa trên câu chuyện có thật.)',
    example2: 'アンケートの結果をもとに報告書を書いた。(Đã viết báo cáo dựa trên kết quả khảo sát.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 2, order: 7
  },
  {
    title: '～に基づいて',
    structure: 'N に基づいて / N に基づく N',
    meaning: 'Dựa trên N / Căn cứ vào N',
    explanation: 'Biểu thị căn cứ, cơ sở chính thức. Trang trọng hơn をもとに.',
    example: '法律に基づいて判断します。(Phán đoán dựa trên pháp luật.)',
    example2: 'データに基づく分析が必要です。(Cần phân tích dựa trên dữ liệu.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 2, order: 8
  },
  {
    title: '～に関して',
    structure: 'N に関して / N に関する N',
    meaning: 'Liên quan đến N / Về N',
    explanation: 'Tương tự ～について nhưng trang trọng hơn, thường dùng trong văn viết.',
    example: 'この問題に関して、意見を述べてください。(Hãy nêu ý kiến liên quan đến vấn đề này.)',
    example2: '健康に関する本を読んでいます。(Tôi đang đọc sách liên quan đến sức khỏe.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 2, order: 9
  },
  {
    title: '～向け',
    structure: 'N 向け（の）',
    meaning: 'Dành cho N / Hướng đến N',
    explanation: 'Biểu thị đối tượng mục tiêu.',
    example: 'この教科書は初心者向けです。(Giáo trình này dành cho người mới.)',
    example2: '子ども向けのアニメが人気です。(Anime dành cho trẻ em rất được ưa thích.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 2, order: 10
  },
  {
    title: '～ようにする',
    structure: 'V(辞書形/ない form) ようにする',
    meaning: 'Cố gắng V / Chú ý để V',
    explanation: 'Biểu thị nỗ lực thay đổi thói quen, hành vi.',
    example: '毎日野菜を食べるようにしています。(Tôi cố gắng ăn rau mỗi ngày.)',
    example2: '遅刻しないようにしてください。(Hãy chú ý đừng đến muộn.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 3, order: 11
  },
  {
    title: '～ことにする／～ことになる',
    structure: 'V(辞書形/ない form) ことにする / ことになる',
    meaning: 'Quyết định V (chủ ý) / Được quyết định rằng V',
    explanation: 'ことにする: tự mình quyết định. ことになる: được quyết định bởi bên ngoài.',
    example: '来月引っ越すことにしました。(Tôi đã quyết định tháng sau chuyển nhà.)',
    example2: '来年から新しいルールが始まることになりました。(Từ năm sau quy tắc mới sẽ được áp dụng.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 3, order: 12
  },
  {
    title: '～ようとする',
    structure: 'V(意向形) とする',
    meaning: 'Cố gắng V / Định V',
    explanation: 'Biểu thị nỗ lực, cố gắng thực hiện hành động, hoặc sắp sửa xảy ra.',
    example: 'ドアを開けようとしたが、鍵がかかっていた。(Tôi định mở cửa nhưng đã bị khóa.)',
    example2: '犬が逃げようとしている。(Con chó đang cố trốn.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 3, order: 13
  },
  {
    title: '～ことはない',
    structure: 'V(辞書形) ことはない',
    meaning: 'Không cần phải V / Không việc gì phải V',
    explanation: 'Biểu thị không cần thiết, trấn an ai đó.',
    example: 'そんなに心配することはないですよ。(Không cần phải lo lắng đến vậy đâu.)',
    example2: '急ぐことはありません。(Không cần phải vội.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 3, order: 14
  },
  {
    title: '～わけにはいかない',
    structure: 'V(辞書形) わけにはいかない / V(ない form) わけにはいかない',
    meaning: 'Không thể V được (vì lý do đạo đức/xã hội)',
    explanation: 'Biểu thị không thể làm gì vì lý do ngoài khả năng cá nhân (quy tắc xã hội, đạo đức, lương tâm).',
    example: '約束したので、行かないわけにはいかない。(Đã hứa rồi nên không thể không đi.)',
    example2: '秘密なので、教えるわけにはいかない。(Vì là bí mật nên không thể nói được.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 3, order: 15
  },
  {
    title: '～わけがない',
    structure: '普通形 わけがない',
    meaning: 'Không thể nào ～ / Không có lý nào ～',
    explanation: 'Biểu thị sự phủ định mạnh mẽ, cho rằng điều đó không thể xảy ra.',
    example: 'あんなに勉強したんだから、落ちるわけがない。(Học nhiều thế rồi, không thể trượt được.)',
    example2: 'そんな高いもの、買えるわけがない。(Đồ đắt vậy, không thể mua nổi.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 4, order: 16
  },
  {
    title: '～わけだ',
    structure: '普通形 わけだ',
    meaning: 'Thì ra là ～ / Có nghĩa là ～',
    explanation: 'Biểu thị kết luận logic từ thông tin đã biết.',
    example: '彼は10年日本に住んでいたのか。日本語が上手なわけだ。(Anh ấy sống ở Nhật 10 năm à. Thảo nào tiếng Nhật giỏi.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 4, order: 17
  },
  {
    title: '～はずだ',
    structure: '普通形 はずだ',
    meaning: 'Chắc hẳn ～ / Lẽ ra phải ～',
    explanation: 'Biểu thị suy đoán có căn cứ, kỳ vọng logic. はずがない: không thể nào.',
    example: '彼は来るはずです。約束しましたから。(Anh ấy chắc hẳn sẽ đến. Vì đã hứa rồi.)',
    example2: '鍵をかけたはずなのに、ドアが開いている。(Lẽ ra đã khóa cửa rồi mà cửa lại mở.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 4, order: 18
  },
  {
    title: '～べきだ',
    structure: 'V(辞書形) べきだ',
    meaning: 'Nên V / Phải V (nghĩa vụ đạo đức)',
    explanation: 'Biểu thị nghĩa vụ, trách nhiệm, lời khuyên mạnh. する→すべき/するべき.',
    example: '約束は守るべきです。(Phải giữ lời hứa.)',
    example2: 'もっと早く病院に行くべきだった。(Lẽ ra nên đi bệnh viện sớm hơn.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 4, order: 19
  },
  {
    title: '～ものだ',
    structure: '普通形 ものだ',
    meaning: 'Là lẽ thường / Đáng ～ / Đã từng ～',
    explanation: 'Nhiều nghĩa: 1) Lẽ thường (chân lý). 2) Cảm thán. 3) Hồi tưởng (～たものだ).',
    example: '人は誰でも失敗するものだ。(Ai cũng mắc sai lầm, đó là lẽ thường.)',
    example2: '子どものころ、よくこの川で遊んだものだ。(Hồi nhỏ, tôi thường chơi ở con sông này.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 4, order: 20
  },
  {
    title: '～おかげで／～せいで',
    structure: 'N の おかげで / 普通形 おかげで / N の せいで / 普通形 せいで',
    meaning: 'Nhờ ～ / Tại ～',
    explanation: 'おかげで: nguyên nhân tích cực (nhờ). せいで: nguyên nhân tiêu cực (tại, do lỗi).',
    example: '先生のおかげで、合格できました。(Nhờ thầy mà tôi đỗ được.)',
    example2: '台風のせいで、旅行に行けなかった。(Tại bão mà không đi du lịch được.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 5, order: 21
  },
  {
    title: '～ように',
    structure: '普通形 ように',
    meaning: 'Như ～ / Giống như ～',
    explanation: 'Biểu thị sự so sánh, ví dụ minh họa.',
    example: '彼が言ったように、この問題は難しい。(Như anh ấy nói, vấn đề này khó.)',
    example2: 'ご存じのように、日本は島国です。(Như quý vị biết, Nhật là đảo quốc.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 5, order: 22
  },
  {
    title: '～ために (nguyên nhân)',
    structure: '普通形 ために',
    meaning: 'Vì ～ nên ～ (nguyên nhân)',
    explanation: 'Biểu thị nguyên nhân. Khác với ために (mục đích), ở đây thường đi với kết quả tiêu cực hoặc trung tính.',
    example: '事故があったために、電車が遅れた。(Vì có tai nạn nên tàu bị trễ.)',
    example2: '雪が降ったために、試合が中止になった。(Vì tuyết rơi nên trận đấu bị hủy.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 5, order: 23
  },
  {
    title: '～さえ～ば',
    structure: 'N さえ V(ば form) / V(ます bỏ ます) さえすれば',
    meaning: 'Chỉ cần ～ là ～',
    explanation: 'Biểu thị điều kiện tối thiểu cần thiết.',
    example: '薬さえ飲めば、すぐ治りますよ。(Chỉ cần uống thuốc là khỏi ngay.)',
    example2: 'お金さえあれば、何でも買える。(Chỉ cần có tiền là mua được gì cũng được.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 5, order: 24
  },
  {
    title: '～さえ',
    structure: 'N さえ / V(て form) さえ',
    meaning: 'Đến cả N / Thậm chí N',
    explanation: 'Biểu thị mức độ cực đoan, nhấn mạnh "đến cả cái cơ bản nhất".',
    example: '忙しくて、ご飯を食べる時間さえない。(Bận đến mức không có thời gian ăn cơm.)',
    example2: '名前さえ書けない子どもがいる。(Có trẻ em thậm chí không viết được tên.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 5, order: 25
  },
  {
    title: '～ば～ほど',
    structure: 'V(ば form) V(辞書形) ほど / い-Adj(ば) い-Adj ほど',
    meaning: 'Càng ～ càng ～',
    explanation: 'Biểu thị hai sự việc tỷ lệ thuận.',
    example: '勉強すればするほど、日本語が上手になる。(Càng học càng giỏi tiếng Nhật.)',
    example2: '安ければ安いほどいい。(Càng rẻ càng tốt.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 6, order: 26
  },
  {
    title: '～ほど～ない',
    structure: 'N1 は N2 ほど Adj(ない)',
    meaning: 'N1 không ～ bằng N2',
    explanation: 'Biểu thị so sánh kém. N2 là cái hơn.',
    example: '東京は大阪ほど暑くない。(Tokyo không nóng bằng Osaka.)',
    example2: '日本語は中国語ほど難しくない。(Tiếng Nhật không khó bằng tiếng Trung.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 6, order: 27
  },
  {
    title: '～くらい／ぐらい',
    structure: 'V(辞書形/ない form) くらい / N くらい',
    meaning: 'Đến mức ～ / Khoảng ～',
    explanation: 'Biểu thị mức độ, ước lượng.',
    example: '泣きたいくらい悲しかった。(Buồn đến mức muốn khóc.)',
    example2: '歩けないくらい疲れた。(Mệt đến mức không đi nổi.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 6, order: 28
  },
  {
    title: '～一方で',
    structure: '普通形 一方（で）',
    meaning: 'Một mặt ～ mặt khác ～',
    explanation: 'Biểu thị hai mặt đối lập hoặc song song tồn tại.',
    example: '仕事は大変な一方で、やりがいがある。(Công việc vất vả nhưng mặt khác rất đáng làm.)',
    example2: '日本語を勉強する一方で、英語も続けています。(Một mặt học tiếng Nhật, mặt khác vẫn tiếp tục tiếng Anh.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 6, order: 29
  },
  {
    title: '～反面',
    structure: '普通形 反面',
    meaning: 'Mặt trái / Ngược lại ～',
    explanation: 'Biểu thị hai mặt đối lập của cùng một sự việc/người.',
    example: '便利な反面、危険もある。(Tiện lợi nhưng mặt khác cũng nguy hiểm.)',
    example2: '彼は優しい反面、厳しいところもある。(Anh ấy hiền nhưng mặt khác cũng nghiêm khắc.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 6, order: 30
  },
  {
    title: '～とともに',
    structure: 'N とともに / V(辞書形) とともに',
    meaning: 'Cùng với ～ / Đồng thời với ～',
    explanation: 'Biểu thị: 1) Cùng với ai. 2) Hai sự việc xảy ra đồng thời/song song.',
    example: '時代とともに、生活スタイルも変わった。(Cùng với thời đại, lối sống cũng thay đổi.)',
    example2: '家族とともに日本に来ました。(Tôi đến Nhật cùng với gia đình.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 7, order: 31
  },
  {
    title: '～につれて',
    structure: 'V(辞書形) につれて / N につれて',
    meaning: 'Cùng với sự ～ thì ～',
    explanation: 'Biểu thị hai sự việc thay đổi cùng nhau, tỷ lệ thuận.',
    example: '年を取るにつれて、体力が落ちる。(Cùng với việc già đi, thể lực giảm sút.)',
    example2: '日本語が上手になるにつれて、勉強が楽しくなった。(Cùng với việc giỏi tiếng Nhật hơn, việc học trở nên vui.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 7, order: 32
  },
  {
    title: '～たびに',
    structure: 'V(辞書形) たびに / N の たびに',
    meaning: 'Mỗi khi ～ / Mỗi lần ～',
    explanation: 'Biểu thị mỗi khi xảy ra A thì luôn xảy ra B.',
    example: '日本に行くたびに、お土産を買います。(Mỗi lần đi Nhật, tôi đều mua quà.)',
    example2: 'この歌を聞くたびに、学生時代を思い出す。(Mỗi khi nghe bài hát này, tôi nhớ lại thời sinh viên.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 7, order: 33
  },
  {
    title: '～うちに',
    structure: 'V(辞書形/ない form) うちに / い-Adj うちに / な-Adj な うちに / N の うちに',
    meaning: 'Trong khi còn ～ / Tranh thủ khi ～',
    explanation: 'Biểu thị làm gì trong khoảng thời gian/trạng thái còn tồn tại.',
    example: '若いうちに、いろいろな経験をしたほうがいい。(Nên trải nghiệm nhiều khi còn trẻ.)',
    example2: '暖かいうちに食べてください。(Hãy ăn khi còn nóng.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 7, order: 34
  },
  {
    title: '～最中に',
    structure: 'V(ている) 最中に / N の 最中に',
    meaning: 'Đúng lúc đang ～',
    explanation: 'Biểu thị đúng lúc giữa chừng hành động thì có việc khác xảy ra.',
    example: '食事をしている最中に、電話が鳴った。(Đúng lúc đang ăn thì điện thoại reo.)',
    example2: '会議の最中に地震があった。(Đúng lúc đang họp thì có động đất.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 7, order: 35
  },
  {
    title: '～っぱなし',
    structure: 'V(ます bỏ ます) っぱなし',
    meaning: 'Cứ để nguyên V / V suốt',
    explanation: 'Biểu thị: 1) Để nguyên trạng thái (tiêu cực). 2) Tiếp tục hành động liên tục.',
    example: 'エアコンをつけっぱなしで寝てしまった。(Ngủ quên mà để điều hòa mở nguyên.)',
    example2: '今日は朝から立ちっぱなしで疲れた。(Hôm nay đứng suốt từ sáng nên mệt.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 8, order: 36
  },
  {
    title: '～きる／～きれない',
    structure: 'V(ます bỏ ます) きる / きれない',
    meaning: 'V hết / Không thể V hết',
    explanation: 'きる: hoàn tất, làm triệt để. きれない: không thể hoàn tất.',
    example: 'マラソンを走りきった。(Đã chạy hết marathon.)',
    example2: '多すぎて食べきれない。(Nhiều quá, ăn không hết.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 8, order: 37
  },
  {
    title: '～かけ',
    structure: 'V(ます bỏ ます) かけ（の）/ かける',
    meaning: 'V dở / Đang V dở',
    explanation: 'Biểu thị hành động chưa hoàn thành, đang dở dang.',
    example: '読みかけの本がテーブルにある。(Có cuốn sách đang đọc dở trên bàn.)',
    example2: '何か言いかけて、やめた。(Định nói gì đó rồi thôi.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 8, order: 38
  },
  {
    title: '～っけ',
    structure: '普通形 っけ',
    meaning: '～ nhỉ? (cố nhớ lại)',
    explanation: 'Dùng khi cố gắng nhớ lại điều gì đó, hoặc hỏi xác nhận.',
    example: '明日の会議は何時からだっけ？(Cuộc họp ngày mai mấy giờ nhỉ?)',
    example2: 'あの人の名前は何だっけ？(Tên người đó là gì nhỉ?)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 8, order: 39
  },
  {
    title: '～がち',
    structure: 'V(ます bỏ ます) がち / N がち',
    meaning: 'Hay bị ～ / Có xu hướng ～',
    explanation: 'Biểu thị xu hướng tiêu cực, hay xảy ra.',
    example: '冬は風邪をひきがちです。(Mùa đông hay bị cảm.)',
    example2: '彼は遅刻しがちだ。(Anh ấy hay đến muộn.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 9, order: 40
  },
  {
    title: '～気味',
    structure: 'V(ます bỏ ます) 気味 / N 気味',
    meaning: 'Hơi ～ / Có hơi ～',
    explanation: 'Biểu thị triệu chứng nhẹ, xu hướng nhẹ (thường tiêu cực).',
    example: '最近、太り気味です。(Gần đây hơi mập.)',
    example2: '風邪気味なので、早く寝ます。(Hơi bị cảm nên đi ngủ sớm.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 9, order: 41
  },
  {
    title: '～ついでに',
    structure: 'V(辞書形/た form) ついでに / N の ついでに',
    meaning: 'Nhân tiện ～ / Tiện thể ～',
    explanation: 'Biểu thị tranh thủ, nhân tiện làm thêm việc khác.',
    example: '買い物に行くついでに、手紙を出してきた。(Nhân tiện đi mua sắm, gửi luôn thư.)',
    example2: '散歩のついでに、パンを買ってきてください。(Nhân tiện đi dạo, mua bánh mì nhé.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 9, order: 42
  },
  {
    title: '～ようがない／～ようもない',
    structure: 'V(ます bỏ ます) ようがない',
    meaning: 'Không có cách nào V',
    explanation: 'Biểu thị không có phương pháp, không thể thực hiện.',
    example: '連絡先がわからないので、連絡しようがない。(Không biết liên lạc nên không có cách nào liên lạc.)',
    example2: '言い訳のしようがない。(Không có cách nào bào chữa.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 9, order: 43
  },
  {
    title: '～てたまらない',
    structure: 'V(て form) たまらない / い-Adj(bỏ い)くて たまらない / な-Adj で たまらない',
    meaning: '～ không chịu nổi / ～ vô cùng',
    explanation: 'Biểu thị cảm giác, cảm xúc ở mức độ rất cao, không kiềm chế được.',
    example: '暑くてたまらない。(Nóng không chịu nổi.)',
    example2: '彼女に会いたくてたまらない。(Nhớ cô ấy không chịu nổi.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 44
  },
  {
    title: '～てしょうがない／～てしかたがない',
    structure: 'V(て form) しょうがない / い-Adj(bỏ い)くて しょうがない',
    meaning: '～ không sao chịu được / ～ vô cùng',
    explanation: 'Tương tự ～てたまらない, biểu thị cảm xúc mãnh liệt. しかたがない trang trọng hơn.',
    example: '面白くてしょうがない。(Buồn cười không chịu được.)',
    example2: '子どものことが心配でしかたがない。(Lo cho con không sao chịu nổi.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 45
  },
  {
    title: '～からには',
    structure: 'V(普通形) からには',
    meaning: 'Đã ～ thì phải ～',
    explanation: 'Biểu thị một khi đã quyết định/bắt đầu thì phải làm đến cùng.',
    example: '留学するからには、一生懸命勉強するつもりだ。(Đã du học thì phải cố gắng hết sức học hành.)',
    example2: '約束したからには、守らなければならない。(Đã hứa thì phải giữ lời.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 46
  },
  {
    title: '～上（で）',
    structure: 'V(た form) 上で / N の 上で',
    meaning: 'Sau khi ～ rồi mới ～ / Trên phương diện ～',
    explanation: 'Biểu thị: 1) Sau khi làm A rồi mới làm B (thận trọng). 2) Trên phương diện.',
    example: 'よく考えた上で、決めたいと思います。(Tôi muốn suy nghĩ kỹ rồi mới quyết định.)',
    example2: '仕事の上で大切なことは信頼だ。(Điều quan trọng trong công việc là sự tin tưởng.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 47
  },
  {
    title: '～くせに',
    structure: '普通形 くせに / N の くせに',
    meaning: 'Mặc dù ～ mà ～ (trách móc)',
    explanation: 'Tương tự のに nhưng mang sắc thái trách móc, bất mãn mạnh hơn.',
    example: '知っているくせに、教えてくれない。(Biết mà không chịu chỉ cho tôi.)',
    example2: '子どものくせに、生意気だ。(Trẻ con mà hỗn.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 48
  },
  {
    title: '～ものの',
    structure: '普通形 ものの',
    meaning: 'Mặc dù ～ nhưng ～',
    explanation: 'Biểu thị nghịch cảnh. Tương tự けれども nhưng trang trọng hơn.',
    example: '日本に来たものの、まだ友達ができない。(Mặc dù đã đến Nhật nhưng vẫn chưa có bạn.)',
    example2: '買ったものの、一度も使っていない。(Mặc dù đã mua nhưng chưa dùng lần nào.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 49
  },
  {
    title: '～だらけ',
    structure: 'N だらけ',
    meaning: 'Đầy N / Toàn N (tiêu cực)',
    explanation: 'Biểu thị đầy, toàn là cái gì đó (thường tiêu cực).',
    example: '部屋はゴミだらけだ。(Phòng đầy rác.)',
    example2: '作文は間違いだらけだった。(Bài luận toàn lỗi sai.)',
    level: 'N3', textbook: 'Shinkanzen N3', lesson: 10, order: 50
  },
];

async function main() {
  console.log('Bắt đầu seed dữ liệu ngữ pháp...');

  // Xóa dữ liệu cũ
  await prisma.grammarLesson.deleteMany();
  console.log('Đã xóa dữ liệu ngữ pháp cũ.');

  const allGrammar = [...n5Grammar, ...n4Grammar, ...n3Grammar];

  console.log(`Tổng số ngữ pháp: ${allGrammar.length}`);
  console.log(`  N5 (Minna no Nihongo 1): ${n5Grammar.length}`);
  console.log(`  N4 (Minna no Nihongo 2): ${n4Grammar.length}`);
  console.log(`  N3 (Shinkanzen N3): ${n3Grammar.length}`);

  for (const grammar of allGrammar) {
    await prisma.grammarLesson.create({ data: grammar });
  }

  console.log('Seed dữ liệu ngữ pháp thành công!');
}

main()
  .catch((e) => {
    console.error('Lỗi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

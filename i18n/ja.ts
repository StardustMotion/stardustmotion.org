import i18nDict from "./i18nDict.js"

const jpDict: i18nDict = {
    nav: {
        resume: `<a href="res/cv_jp.pdf">履歴書</a>`,
        works: "作品",
        resources: "資源",
        contact: "お問い合わせ"
    },
    home: {
        intro: "StardustMotionが公開・専門情報で占める割合/HP。<br><br>おそらくこれ以上の説明は不要でしょう"
    },
    works: {
        workDate: "年",
        workProject: "作品",
        workType: "種類",
        workTypeGame: "ゲーム",
        workTypeStage: "ステージ",
        workTypeVR: "ＶＲ動画",
        workUnity: `<a target="_blank" href="https://unity.com/ja">Unity</a>`,
        workCredits: "謝意",

        tawawaTitle: "Unity開発",
        tawawaDate: "2026",
        tawawaBuild: "期間：5っ月（アバターエディター）",
        tawawaCredit: "サークル: たわわデリバリ",
        tawawaThread: "Steamページへ （18歳）",
        tawawaDesc: `プログラマーとしてゲーム「偽世界樹の巫女～街中おさわり放題」の開発に貢献。<br><br> また、<a target="_blank" href="https://assetstore.unity.com/packages/3d/characters/uma-2-35611" >UMA アセット</a>をエンジンとして使用し、今後のゲーム制作に向けて3Dモデルアバターエディターの社内ツールの開発。`,

        xoverDate: "2025",
        xoverDesc: `<a target="_blank" href="https://mm8bdm.net/">「Mega Man 8-Bit Deathmatch」</a>用の、武器を合成する制度を追加するmodです。<br><br>合成されたの武器はより強力なり、素材の特性によって（例えば属性や射撃の方法）といった決定されます。合成武器をさらに武器を作るための素材として使うことも可能です。<br><br>60種類以上のkん前新規武器を実装がされています`,
        xoverBuild: "期間:9ヶ月",
        xoverCredit: "ＳＦＸサンプルと複数スプライトの由来は外部ソースです",
        xoverCode: "試料のコード",
        xoverThread: "スレードへ",
        xoverVideo: "公式リリーズ",

        bur00Desc: `<a target="_blank" href="https://mm8bdm.net/forum/thread/cutstuff-mapping-jam-9-banana-jamma-60">マップジャム</a>の応募、<a target="_blank" href="https://mm8bdm.net/">「メガマン：8ビット・デスマッチ」</a>のプレイヤーｖｓ全員ステージです<br><br>甲板やエンジンルームや宙吊りエリア込みの大船です。<br><br>たまにはシップがプレイヤーの運動性を影響するの乱流に入ります<br>`,
        bur00Build: "期間:<br>2ヶ月",
        bur00Credit: "BGMとテクスチャの基本素材(タイルセット)の由来は外部ソースです",
        bur00Video: "動画",

        casinopolisTitle: "カジノポリス",
        casinopolisDesc: `<a target="_blank" href="https://www.youtube.com/watch?v=9hvXSUwWwiY">ソニックのステージ</a>参考したVR動画です<br><br>三人称視点カメラです。エンジンおかげで2つ側面、同じ点を眺めるの観点は深さの感じを映します.<br><br>適当な体験のため<a target="_blank" href="https://arvr.google.com/intl/ja_jp/cardboard/">特殊の仕掛け</a>は必須です<br>`,
        casinopolisBuild: "期間:<br>一週間",
        casinopolisCredit: "'Bumper Engine'の基本で作りました。<br>テクスチャの由来はソニックの原作です。外部鍛えた「ＥＳＲＧＡＮ」の神経回路網でテクスチャを磨きました",
        casinopolisVideo: "ビデオ",

        blacksmithDesc: `リズム/管理のゲーム<br><br>鍛冶屋として<a target="_blank" href="https://ja.wikipedia.org/wiki/Dance_Dance_Revolution">DDRっぽい</a>ゲーム勝負で鍛えたの武器は販売できます。神様たちに貢献も可能性があります。<br><br>侵略者はあなたの資源を盗むでも貢献おかげで加護をもらいます`,
        blacksmithBuild: "期間:<br>一週間",
        blacksmithCredit: "映像と音響の由来は外部のソースです",
        blacksmithDownload: "ウィンドウズバーション",

        seascapeDesc: `Ｂａｂｙｌｏｎ．ｊｓオンリー競争の応募です<br><br>期間限定以内ＺＱＳＤキーで目標に入らないとです。<br><br>タイマーは木箱を破壊すると1~3秒間止まります、弾丸の衝突したと5秒間減ります`,
        seascapeBuild: "期間:<br>1ヶ月",
        seascapeCredit: "3開発者の作品. テクスチャや音響や3Ｄモデルの由来は外部のソースです",
        seascapeCode: "ソースコード",
        seascapePlay: "ゲーム開始",

        voxelTitle: "簡単ボクセルエンジン",
        voxelDesc: `16ｘ16ｘ16の地味なシーンです<br><br>カメラを制御するやボクセルを置く/外す可能性があります</p>`,
        voxelBuild: "期間:<br>数日",
        voxelCredit: "opengl-tutorial.orgの案内",
        voxelCode: "ソースコード",

        srb2Title: "SRB2のステージ",
        srb2Desc: `半ダースの<a target="_blank" href="https://www.srb2.org/">ソニックRobo Blast 2</a>の1Ｐ・ＣＯ－ＯＰステージです<br><br>集団のなか一部コミュニティ競争に応募されました`,
        srb2Build: '期間:<br>1ステージは数日から数週間まで',
        srb2Volcano: "'Dangerous Volcano Zone'",
        srb2Island: "'Lost Feelings Island'",
        srb2Palace: "'Golden Palace Zone'",
    },
    contact: {
        howToContact: "直接連絡の方法は",
        fromSite: "フォームで",
        email: "電子メール",
        emailFormat: "メールの形式が不正です",
        emailUndefined: "返信受信のためメールは必須です",
        messageLength: "文字数制限は3000です",
        messageUndefined: "必須",
        message: "お問い合わせ内容",
        uploadFile: "ファイル送信 (上限は１０ＭＢ)",
        uploadFileMax: "ファイルサイズが１０ＭＢを超える",
        submit: "確認する",
    }
}

export default jpDict;
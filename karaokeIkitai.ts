import { OdnTweetData, OdnTweets } from "../../../odnTweets"
import { OdnPlugins, OdnPluginResultData } from "../../../odnPlugins";
import { Log } from "../../../odnUtils";

export class KaraokeIkitai {
  constructor(private tweetData: OdnTweetData, private fullName: string) {}

  /**
   * プラグインのメイン処理を実行
   *
   * @param {(isProcessed?: boolean) => void} finish
   */
  run(finish: (isProcessed?: boolean) => void) {
    Log.d(this.tweetData.text);

    const tweets = new OdnTweets(this.tweetData.accountData);
    tweets.text = "ぼくもからおけいきたい";
    tweets.targetTweetId = this.tweetData.idStr;

    // ツイートを投稿
    tweets.postTweet((isSuccess) => {
      Log.d(isSuccess ? "リプライに成功しました" : "リプライに失敗しました");
      // 元ツイートをお気に入り登録
      tweets.likeTweet();
      finish();
    });
  }

  /**
   * プラグインを実行するかどうか判定
   *
   * @param {OdnTweetData} tweetData
   * @returns {boolean}
   */
  static isValid(tweetData: OdnTweetData): boolean {
    return false === tweetData.isRetweet && tweetData.text.match(/^(からおけ|カラオケ|ひとから|ヒトカラ)(いきたい|行きたい)$/gi) ? true : false;
  }
}

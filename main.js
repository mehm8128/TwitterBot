import { ETwitterStreamEvent, TwitterApi } from "twitter-api-v2"
import { CronJob } from "cron"

import "dotenv/config"
// OAuth 1.0a (User context)
const client = new TwitterApi({
	appKey: process.env.CONSUMER_KEY,
	appSecret: process.env.CONSUMER_SECRET,
	accessToken: process.env.ACCESS_TOKEN_KEY,
	accessSecret: process.env.ACCESS_TOKEN_SECRET,
})
const client2 = new TwitterApi(process.env.BEARER_TOKEN)
const stream = await client2.v2.searchStream({
	"tweet.fields": ["id", "author_id", "created_at", "conversation_id", "text"],
})
stream.autoReconnect = true

stream.on(ETwitterStreamEvent.Data, async (tweet) => {
	if (tweet.data.author_id !== "1034716117556592640") {
		const tweet2 = await client.v2.singleTweet(tweet.data.id, {
			"tweet.fields": "conversation_id",
		}) //conversation_idをtweets/search/recentに使って会話を全部取ってきて、親ツイートの1つ下が自分なら返信しない、もしくは2つ下が自分なら返信しない
		if (tweet2.conversation_id !== tweet.id) {
			await client.v2.reply("こんにちは！自動返信機能です", tweet.data.id)
		}
		console.log(tweet.data)
	}
})

const timeSignal = new CronJob(
	"00 00 * * *",
	async () => {
		const tweet = await client.v2.tweet("日付が変わりました！")
		console.log(tweet)
	},
	null,
	true,
	"Asia/Tokyo"
)

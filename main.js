import { ETwitterStreamEvent, TwitterApi } from "twitter-api-v2"

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
	"tweet.fields": ["author_id", "created_at", "text"],
})
stream.autoReconnect = true

stream.on(ETwitterStreamEvent.Data, async (tweet) => {
	if (tweet.data.author_id !== "1034716117556592640") {
		await client.v2.reply("こんにちは！自動返信機能です", tweet.data.id)
		console.log(tweet.data)
	}
})

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
	//pagination or only be replyed or be mentioned
	let next_token = ""
	const followingsOfJack = await client.v2.following(tweet.data.author_id, {
		asPaginator: true,
		pagination_token: next_token !== "" ? next_token : "",
	})
	if (followingsOfJack.meta.next_token) {
		next_token = followingsOfJack.meta.next_token
	}
	console.log(followingsOfJack)
	for (let i = 0; i < followingsOfJack.length; i++) {
		if (followersOfList[i].username === "mehm8128") {
			await client.v2.reply(
				"botの実験に使わせていただいています(自動リプライ)",
				tweet.data.id
			)
			console.log(tweet.data)
		}
		console.log("completed")
	}
})

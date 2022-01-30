import { prop } from @typegoose/typegoose;

class user {
    @prop()
    codewarsUsername: String;

    @prop()
    name?: String;

@prop()
  honor: number;

  @prop()
  clan:String;
  @prop()
  leaderboardPosition: Number;

  @prop()
  skills: String[]

  @prop()
  ranks: {
    overall: {
      rank: -4,
      score: 1267
    },
    languages: {
      javascript: {
        rank: -4,
        score: 975
      },
      python: {
        rank: -5,
        score: 304
      }
    }
  },
  codeChallenges: {
    totalAuthored: 0,
    totalCompleted: 126
  }
}
}
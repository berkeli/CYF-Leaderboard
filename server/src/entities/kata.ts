import mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Kata {
  @prop()
    _id: mongoose.Types.ObjectId

  @prop()
    name: string

  @prop()
    slug: string

  @prop()
    url_string: string

  @prop()
    category: string

  @prop()
    description: string

  @prop({ type: String, default: [] })
    tags: mongoose.Types.Array<string>

  @prop({ type: String, default: [] })
    languages: mongoose.Types.Array<string>

  @prop({ type: mongoose.Schema.Types.Mixed, default: {} })
    rank: {
      id: number,
      name: string,
      color: string,
    }

  @prop()
    publishedAt: string

  @prop()
    totalCompleted: number

  @prop()
    totalAttempts: number

  @prop()
    totalStars: number

  @prop()
    voteScore?: number

  @prop()
    CYFCompletions?: number
}

export const KataModel = getModelForClass(Kata);

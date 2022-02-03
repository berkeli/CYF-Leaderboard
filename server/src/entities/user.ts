import mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions, Ref, Severity } from '@typegoose/typegoose';
import { Kata as KataClass } from './kata';

@modelOptions({ schemaOptions: { _id: false } })
export class CompleteKataClass {
  @prop({ ref: () => KataClass })
    id: Ref<KataClass>;

  @prop()
    completedAt: string;

  @prop({ type: String, default: [] })
    completedLanguages: mongoose.Types.Array<string>;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
    @prop({ type: String, unique: true })
      codewarsUsername: string;

    @prop()
      name?: string;

    @prop()
      honor: number;

    @prop()
      clan:string;

    @prop()
      leaderboardPosition: number;

    @prop({ type: String, default: [] })
      skills?: mongoose.Types.Array<string>;

    @prop({ type: mongoose.Schema.Types.Mixed, default: {} })
      ranks: object;

    @prop()
      totalCompleted: number;

    @prop({ type: CompleteKataClass, default: [] })
      completedKatas: mongoose.Types.Array<CompleteKataClass>
}

export const UserModel = getModelForClass(User);

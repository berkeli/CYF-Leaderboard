/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions, Ref, Severity, post } from '@typegoose/typegoose';
import { Kata as KataClass } from './kata';
import getMonday from '../utils/getMonday';
import { AuthoredCollection, AuthoredCollectionModel as AuthColl } from './authoredCollection';

@modelOptions({ schemaOptions: { _id: false } })

@modelOptions({ schemaOptions: { _id: false } })
export class CompleteKataClass {
  @prop({ ref: () => KataClass })
    id: Ref<KataClass> | KataClass;

  @prop()
    completedAt: string;

  @prop({ type: String, default: [] })
    completedLanguages: mongoose.Types.Array<string>;
}

class weeklyProgressClass {
  date: string;

  [key: string]: any;
}

@modelOptions({ schemaOptions: { _id: false } })
class collectionProgressClass {
  @prop({ ref: 'AuthoredCollection' })
    id: Ref<AuthoredCollection>;

  @prop()
    completed?: number;

  @prop()
    total?: number
}

function isKata(kata: KataClass | undefined | mongoose.Types.ObjectId):kata is KataClass {
  return (kata as KataClass)?.rank !== undefined;
}

@post<User>('findOneAndUpdate', async function (this: any) {
  const filter = this.getFilter();
  const userData = await UserModel.findOne(filter).populate({ path: 'completedKatas', populate: { path: 'id', model: 'Kata' } });
  if (!userData) return;
  // Calculate Weekly Progress

  const weeklyProgress:weeklyProgressClass[] = []
  userData?.completedKatas.forEach(({ id: kata, completedAt } : { id: mongoose.Types.ObjectId | KataClass | undefined; completedAt: string; }) => {
    if (!isKata(kata)) return;
    const week = getMonday(Date.parse(completedAt));
    const findWeek:weeklyProgressClass | undefined = weeklyProgress.find((e:weeklyProgressClass) => e.date === week)
    if (!findWeek) {
      weeklyProgress.unshift({ date: week, [kata?.rank.id as keyof weeklyProgressClass]: 1 })
    } else if (!findWeek[kata.rank.id]) {
      findWeek[kata.rank.id] = 1
    } else if (typeof findWeek[kata.rank.id] === 'number') {
      findWeek[kata?.rank.id]++;
    }
  })
  userData.weeklyProgress = weeklyProgress;

  // Calculate Collection progress
  const collections = await AuthColl.find({ createdByName: userData.clan }).sort('order').exec();
  const collectionProgress:collectionProgressClass[] = [];
  const listComplete = userData.completedKatas.map((e) => e.id?._id.toString())
  collections.forEach(({ _id, katas }) => {
    let completed = 0;
    katas?.forEach((kata) => {
      completed += listComplete.includes(kata?._id.toString()) ? 1 : 0
    })
    collectionProgress.push({ id: _id, completed, total: katas?.length })
  })
  userData.collectionProgress = collectionProgress;
  userData.save();
})
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

    @prop()
      collectionProgress?: object[];

    @prop()
      weeklyProgress?: weeklyProgressClass[];

    @prop({ type: CompleteKataClass, default: [] })
      completedKatas: mongoose.Types.Array<CompleteKataClass>
}

export const UserModel = getModelForClass(User);

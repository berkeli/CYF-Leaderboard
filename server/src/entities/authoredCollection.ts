import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';
import { Kata } from './kata';

export class AuthoredCollection {
    @prop()
      _id: mongoose.Types.ObjectId

    @prop({ ref: () => User })
      createdBy?: Ref<User>

    @prop()
      createdByName: string

    @prop()
      name: string;

    @prop()
      description?: string | null;

    @prop()
      order?: number;

    @prop({ ref: () => Kata })
      katas?: Ref<Kata>[]
}

export const AuthoredCollectionModel = getModelForClass(AuthoredCollection);

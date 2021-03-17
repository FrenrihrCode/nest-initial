import { Document } from "mongoose";

export interface Task extends Document {
  readonly title: String;
  readonly description: String;
  readonly done: Boolean;
  readonly imgUrl: String;
}

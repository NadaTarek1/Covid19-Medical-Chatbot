export class Message {
  message: string;
  timestamp: Date;
  avatar: string;

  constructor(message: string, avatar: string, timestamp?: Date) {
    this.message = message;
    this.timestamp = timestamp;
    this.avatar = avatar;
  }
}

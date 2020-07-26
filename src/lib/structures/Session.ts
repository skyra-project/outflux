export class Session {
	public createdAt!: Date;
	public expireAt!: Date;

	public static readonly LIFETIME = 1000 * 60 * 60 * 24;
}

import { flags, SfdxCommand } from '@salesforce/command';

/* eslint-disable camelcase */
interface PrizeWinnerRequest {
  participant: { id: string };
  user: { first_name: string; last_name: string };
  prize: { prize_type: { name: string } };
}

export default class Org extends SfdxCommand {
  public static description = 'make REST calls to a Salesforce org';

  public static examples: string[] = [];

  protected static flagsConfig = {
    firstname: flags.string({
      char: 'f',
      description: 'value to use for user.first_name',
      default: 'Peter',
    }),
    lastname: flags.string({
      char: 'l',
      description: 'value to use for user.last_name',
      default: 'Parker',
    }),
    prizetype: flags.string({
      char: 't',
      description: 'value to use for prize.prize_type.name',
      default: 'candy',
    }),
  };

  protected static requiresUsername = true;

  public async run(): Promise<PrizeWinnerRequest> {
    const request: PrizeWinnerRequest = {
      participant: { id: 'participant-id' },
      user: { first_name: this.flags.firstname as string, last_name: this.flags.lastname as string },
      prize: { prize_type: { name: this.flags.prizetype as string } },
    };

    this.ux.log('Making POST to Salesforce...');
    this.ux.logJson(request);

    const result = await this.org.getConnection().apex.post('/prize-winner/', { body: request }, {});
    // eslint-disable-next-line no-console
    console.log(result);

    return request;
  }
}

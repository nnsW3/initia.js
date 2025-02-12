import { RewardParams } from '../../../core'
import { APIParams } from '../APIRequester'
import { BaseAPI } from './BaseAPI'

export class RewardAPI extends BaseAPI {
  /**
   * Query the last release rate dilution timestamp.
   */
  public async last_dilution_timestamp(
    params: APIParams = {}
  ): Promise<string> {
    return this.c
      .get<{
        last_dilution_timestamp: string
      }>(`/initia/reward/v1/last_dilution_timestamp`, params)
      .then((d) => d.last_dilution_timestamp)
  }

  /**
   * Query the current annual provisions value.
   */
  public async annualProvisions(params: APIParams = {}): Promise<string> {
    return this.c
      .get<{
        annual_provisions: string
      }>(`/initia/reward/v1/annual_provisions`, params)
      .then((d) => d.annual_provisions)
  }

  /**
   * Query the parameters of the reward module.
   */
  public async parameters(params: APIParams = {}): Promise<RewardParams> {
    return this.c
      .get<{ params: RewardParams.Data }>(`/initia/reward/v1/params`, params)
      .then((d) => RewardParams.fromData(d.params))
  }
}

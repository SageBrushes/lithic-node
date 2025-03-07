// File generated from our OpenAPI spec by Stainless.
import * as Core from '../core';

export class Accounts extends Core.APIResource {
  /**
   * Get account configuration such as spend limits.
   */
  retrieve(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Account>> {
    return this.get(`/accounts/${id}`, options);
  }

  /**
   * Update account configuration such as spend limits. Can only be run on accounts that are part of the program managed by this API key. Accounts that are in the `PAUSED` state will not be able to transact or create new cards.
   */
  update(
    id: string,
    body?: AccountUpdateParams | null | undefined,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Account>> {
    return this.patch(`/accounts/${id}`, { body, ...options });
  }

  /**
   * List account configurations. This endpoint can only be used on accounts that are part of the program the calling API key manages.
   */
  list(
    query?: AccountListParams | null | undefined,
    options?: Core.RequestOptions,
  ): Core.APIListPromise<Account> {
    return this.getAPIList('/accounts', { query, ...options });
  }
}

export interface Account {
  /**
   * Spend limit information for the user containing the daily, monthly, and lifetime spend limit of the account. Any charges to a card owned by this account will be declined once their transaction volume has surpassed the value in the applicable time limit (rolling). A lifetime limit of 0 indicates that the lifetime limit feature is disabled.
   */
  spend_limit: Account.SpendLimit;

  /**
   * Account state: * `ACTIVE` - Active, account is able to transact and create new cards. * `PAUSED` - Paused, account will not be able to transact or create new cards.
   */
  state: 'ACTIVE' | 'PAUSED';

  /**
   * Globally unique identifier for the account. This is the same as the account_token returned by the enroll endpoint. If using this parameter, do not include pagination.
   */
  token: string;
}

export namespace Account {
  export interface SpendLimit {
    /**
     * Daily spend limit (in cents).
     */
    daily: number;

    /**
     * Total spend limit over account lifetime (in cents).
     */
    lifetime: number;

    /**
     * Monthly spend limit (in cents).
     */
    monthly: number;
  }
}

export interface AccountUpdateParams {
  /**
   * Amount (in cents) for the account's new daily spend limit.
   */
  daily_spend_limit?: number;

  /**
   * Amount (in cents) for the account's new lifetime limit. Once this limit is reached, no transactions will be accepted on any card created for this account until the limit is updated.
   */
  lifetime_spend_limit?: number;

  /**
   * Amount (in cents) for the account's new monthly spend limit.
   */
  monthly_spend_limit?: number;

  /**
   * Account states.
   */
  state?: 'ACTIVE' | 'PAUSED';
}

export interface AccountListParams {
  /**
   * Date string in 8601 format. Only entries created after the specified date will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in 8601 format. Only entries created before the specified date will be included. UTC time zone.
   */
  end?: string;

  /**
   * Page (for pagination).
   */
  page?: number;

  /**
   * Page size (for pagination).
   */
  page_size?: number;
}

/**
 * Type guards for token types
 */

import type { Token, TokenWithBalance } from './token.types';
import type { ProtoToken } from './token.api';

/**
 * Check if a value is a valid Token object
 */
export function isToken(value: unknown): value is Token {
  return (
    typeof value === 'object' &&
    value !== null &&
    'address' in value &&
    'symbol' in value &&
    'decimals' in value &&
    'name' in value &&
    'chainId' in value
  );
}

/**
 * Check if a value is a TokenWithBalance
 */
export function isTokenWithBalance(value: unknown): value is TokenWithBalance {
  return (
    isToken(value) &&
    'amount' in value &&
    'valueUsd' in value &&
    'priceUsd' in value
  );
}

/**
 * Check if a value is a ProtoToken
 */
export function isProtoToken(value: unknown): value is ProtoToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    'chain_id' in value &&
    'address' in value &&
    'decimals' in value
  );
}
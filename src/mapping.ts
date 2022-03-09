import { BigInt, ByteArray, Bytes, crypto, log } from "@graphprotocol/graph-ts"
import {
  UniV3Staker,
  DepositTransferred,
  IncentiveCreated,
  IncentiveEnded,
  RewardClaimed,
  TokenStaked,
  TokenUnstaked
} from "../generated/UniV3Staker/UniV3Staker"
import { Incentive } from "../generated/schema"

export function handleDepositTransferred(event: DepositTransferred): void {
}

export function handleIncentiveCreated(event: IncentiveCreated): void {
  let abiEncodedKey = new Uint8Array(160)
  abiEncodedKey.set(event.params.rewardToken, 0 + 12)
  abiEncodedKey.set(event.params.pool, 32 + 12)
  abiEncodedKey.set(event.params.startTime.reverse(), 64 + (32 - event.params.startTime.length))
  abiEncodedKey.set(event.params.endTime.reverse(), 96 + (32 - event.params.endTime.length))
  abiEncodedKey.set(event.params.refundee, 128 + 12)
  log.warning(Bytes.fromUint8Array(abiEncodedKey).toHex(), [])
  let id = crypto.keccak256(Bytes.fromUint8Array(abiEncodedKey))

  let incentive = new Incentive(id.toHex())
  incentive.rewardToken = event.params.rewardToken
  incentive.pool = event.params.pool
  incentive.startTime = event.params.startTime
  incentive.endTime = event.params.endTime
  incentive.refundee = event.params.refundee
  incentive.numDeposits = 0
  incentive.save()
}

export function handleIncentiveEnded(event: IncentiveEnded): void {}

export function handleRewardClaimed(event: RewardClaimed): void {}

export function handleTokenStaked(event: TokenStaked): void {}

export function handleTokenUnstaked(event: TokenUnstaked): void {}

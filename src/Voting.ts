import {
  StartVote as StartVoteEvent,
  CastVote as CastVoteEvent,
  ExecuteVote as ExecuteVoteEvent
} from '../generated/templates/Voting/Voting'
import {
  Voting as VotingContract
} from '../generated/templates/Voting/Voting'
import {
  Vote as VoteEntity,
  Cast as CastEntity
} from '../generated/schema'

export function handleStartVote(event: StartVoteEvent): void {
  let voteId = event.params.voteId
  let vote = new VoteEntity(voteId.toHex())

  vote.creator = event.params.creator
  vote.metadata = event.params.metadata

  let voting = VotingContract.bind(event.address)
  let voteData = voting.getVote(voteId)
  vote.open = voteData.value0
  vote.executed = voteData.value1
  vote.startDate = voteData.value2
  vote.snapshotBlock = voteData.value3
  vote.supportRequiredPct = voteData.value4
  vote.minAcceptQuorum = voteData.value5
  vote.yea = voteData.value6
  vote.nay = voteData.value7
  vote.votingPower = voteData.value8
  vote.script = voteData.value9

  vote.executed = false
  vote.casts = []

  vote.save()
}

export function handleCastVote(event: CastVoteEvent): void {
  let voteId = event.params.voteId
  let vote = VoteEntity.load(voteId.toHex())
  let numCasts = vote.casts.length

  let castId = voteId.toHex() + '-' + numCasts.toString()
  let cast = new CastEntity(castId)

  cast.voteId = voteId.toHex()
  cast.voter = event.params.voter
  cast.supports = event.params.supports
  cast.voterStake = event.params.stake
  cast.save()

  let casts = vote.casts
  casts.push(castId)
  vote.casts = casts
  vote.save()
}

export function handleExecuteVote(event: ExecuteVoteEvent): void {
  let voteId = event.params.voteId
  let vote = VoteEntity.load(voteId.toHex())

  vote.executed = true
  vote.save()
}
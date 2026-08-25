export function automaticRewardCount(total:number,threshold:number,mode:'first_reward_only'|'repeat_every_threshold'|'manual_after_first'):number;
export function minimumBookableDate(today:string|Date,leadDays:number):string;
export function rewardEconomics(threshold:number,cost:number,rush?:number):{grossRemainingBeforePlatformCosts:number;fulfillmentCostPercentage:number};

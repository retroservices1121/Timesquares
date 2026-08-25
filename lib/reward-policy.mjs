export function automaticRewardCount(total,threshold,mode){if(total<threshold)return 0;if(mode==='repeat_every_threshold')return Math.floor(total/threshold);return 1}
export function minimumBookableDate(today,leadDays){const date=new Date(today);date.setUTCHours(0,0,0,0);date.setUTCDate(date.getUTCDate()+leadDays);return date.toISOString().slice(0,10)}
export function rewardEconomics(threshold,cost,rush=0){return {grossRemainingBeforePlatformCosts:threshold-cost-rush,fulfillmentCostPercentage:threshold?cost/threshold*100:0}}

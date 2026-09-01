export const STARTING_BID=2;

const namedAdvertisers = [
  ['VOIDLABS',STARTING_BID,'Central Crown','18h 42m'],['AURORA®',STARTING_BID,'North Star','6h 14m'],['KINETIC',STARTING_BID,'East Motion','4h 08m'],['NOVA.FM',STARTING_BID,'Midtown Pulse','2h 51m'],['PIXEL.FUN',STARTING_BID,'Arcade Wall','1d 3h'],['FUTURE™',STARTING_BID,'Skyline Six','9h 12m'],['FORM',STARTING_BID,'West Stack','3h 22m'],['MONO',STARTING_BID,'Nightline','7h 19m'],['LOOP.AI',STARTING_BID,'Transit Glow','44m'],['BUILDER.DEV',STARTING_BID,'Corner Ten','12h 05m'],
  ['ORBIT',STARTING_BID,'Orbit Eleven','5h 41m'],['STACKED',STARTING_BID,'Stack Twelve','8h 03m'],['NORTHSTAR',STARTING_BID,'North Thirteen','2h 18m'],['DAYBREAK',STARTING_BID,'Daybreak Fourteen','11h 27m'],['HYPERLINK',STARTING_BID,'Link Fifteen','3h 56m'],['SIGNAL',STARTING_BID,'Signal Sixteen','6h 33m'],['MOTION',STARTING_BID,'Motion Seventeen','1h 09m'],['PRISM',STARTING_BID,'Prism Eighteen','14h 20m'],['ECHO',STARTING_BID,'Echo Nineteen','4h 47m'],['PARALLEL',STARTING_BID,'Parallel Twenty','7h 36m'],['NEON.HQ',STARTING_BID,'Neon Twenty-One','2h 04m'],['FRAME',STARTING_BID,'Frame Twenty-Two','9h 52m'],['TOMORROW',STARTING_BID,'Tomorrow Twenty-Three','53m'],['MINT',STARTING_BID,'Mint Twenty-Four','12h 44m'],['SHIFT',STARTING_BID,'Shift Twenty-Five','5h 16m'],['ATLAS',STARTING_BID,'Atlas Twenty-Six','8h 39m'],['TEMPO',STARTING_BID,'Tempo Twenty-Seven','3h 11m'],['VECTOR',STARTING_BID,'Vector Twenty-Eight','10h 06m'],['LUMEN',STARTING_BID,'Lumen Twenty-Nine','1h 37m'],['LEVEL',STARTING_BID,'Level Thirty','6h 58m'],
  ['HALO',STARTING_BID,'Halo Thirty-One','4h 26m'],['PULSE',STARTING_BID,'Pulse Thirty-Two','7h 02m'],['FORGE',STARTING_BID,'Forge Thirty-Three','2h 39m'],['VANTA',STARTING_BID,'Vanta Thirty-Four','9h 18m'],['SPARK',STARTING_BID,'Spark Thirty-Five','1h 46m'],['AXIS',STARTING_BID,'Axis Thirty-Six','5h 33m'],
] as const;

export const BILLBOARD_COUNT=64;
export const advertisers=[...namedAdvertisers,...Array.from({length:BILLBOARD_COUNT-namedAdvertisers.length},(_,index)=>{const slot=namedAdvertisers.length+index+1;return[`OPEN SLOT ${slot}`,STARTING_BID,`Billboard ${slot}`,'AVAILABLE'] as const})];
export const advertiserSlug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]/g,'');
export const minimumBid=(bid:number)=>bid<=STARTING_BID?STARTING_BID:Math.ceil(bid*1.1);

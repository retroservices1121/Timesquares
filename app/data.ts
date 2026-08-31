export const advertisers = [
  ['VOIDLABS',12500,'Central Crown','18h 42m'],['AURORA®',8420,'North Star','6h 14m'],['KINETIC',6180,'East Motion','4h 08m'],['NOVA.FM',4900,'Midtown Pulse','2h 51m'],['PIXEL.FUN',3740,'Arcade Wall','1d 3h'],['FUTURE™',3210,'Skyline Six','9h 12m'],['FORM',2840,'West Stack','3h 22m'],['MONO',2570,'Nightline','7h 19m'],['LOOP.AI',2310,'Transit Glow','44m'],['BUILDER.DEV',1980,'Corner Ten','12h 05m'],
  ['ORBIT',1865,'Orbit Eleven','5h 41m'],['STACKED',1750,'Stack Twelve','8h 03m'],['NORTHSTAR',1635,'North Thirteen','2h 18m'],['DAYBREAK',1520,'Daybreak Fourteen','11h 27m'],['HYPERLINK',1405,'Link Fifteen','3h 56m'],['SIGNAL',1290,'Signal Sixteen','6h 33m'],['MOTION',1175,'Motion Seventeen','1h 09m'],['PRISM',1060,'Prism Eighteen','14h 20m'],['ECHO',945,'Echo Nineteen','4h 47m'],['PARALLEL',830,'Parallel Twenty','7h 36m'],['NEON.HQ',715,'Neon Twenty-One','2h 04m'],['FRAME',600,'Frame Twenty-Two','9h 52m'],['TOMORROW',485,'Tomorrow Twenty-Three','53m'],['MINT',370,'Mint Twenty-Four','12h 44m'],['SHIFT',255,'Shift Twenty-Five','5h 16m'],['ATLAS',250,'Atlas Twenty-Six','8h 39m'],['TEMPO',250,'Tempo Twenty-Seven','3h 11m'],['VECTOR',250,'Vector Twenty-Eight','10h 06m'],['LUMEN',250,'Lumen Twenty-Nine','1h 37m'],['LEVEL',250,'Level Thirty','6h 58m'],
  ['HALO',250,'Halo Thirty-One','4h 26m'],['PULSE',250,'Pulse Thirty-Two','7h 02m'],['FORGE',250,'Forge Thirty-Three','2h 39m'],['VANTA',250,'Vanta Thirty-Four','9h 18m'],['SPARK',250,'Spark Thirty-Five','1h 46m'],['AXIS',250,'Axis Thirty-Six','5h 33m'],
] as const;

export const BILLBOARD_COUNT=advertisers.length;
export const advertiserSlug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]/g,'');
export const minimumBid=(bid:number)=>Math.ceil(bid*1.1);

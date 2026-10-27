/* Pure scheduling rules: replace persistence adapters without changing this domain layer. */
(function(root){
const overlap=(a,b,c,d)=>new Date(a)<new Date(d)&&new Date(c)<new Date(b);
function active(items,room,now){return items.find(x=>x.room===room&&new Date(x.start)<=now&&new Date(x.end)>now)}
function status(db,room,now=new Date()){
 if(room.override==='UNDER MAINTENANCE'||room.override==='UNAVAILABLE')return room.override;
 if(active(db.schedules,room.id,now))return 'IN CLASS';
 if(active(db.reservations.filter(x=>x.status==='Approved'),room.id,now))return 'RESERVED';
 if(db.sessions.some(x=>x.room===room.id&&!x.closed&&new Date(x.end)>now))return 'OCCUPIED';
 return 'AVAILABLE';
}
function blockers(db,room,start,end,exclude){return [...db.schedules,...db.reservations.filter(x=>x.status==='Approved'&&x.id!==exclude),...db.sessions.filter(x=>!x.closed)].filter(x=>x.room===room&&overlap(start,end,x.start,x.end))}
function sessionEnd(db,room,minutes,now=new Date()){let end=new Date(+now+minutes*60000);for(const x of [...db.schedules,...db.reservations.filter(x=>x.status==='Approved')]){const t=new Date(x.start);if(x.room===room&&t>now&&t<end)end=t}return end.toISOString()}
const api={overlap,status,blockers,sessionEnd};root.CampusEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

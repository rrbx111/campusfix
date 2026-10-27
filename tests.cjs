const assert=require('node:assert/strict');const E=require('./engine.js');const now=new Date('2026-10-27T02:00:00Z'),r={id:'R',override:''};const d={schedules:[],reservations:[],sessions:[]};
assert.equal(E.status(d,r,now),'AVAILABLE');assert.equal(E.status(d,{...r,override:'UNDER MAINTENANCE'},now),'UNDER MAINTENANCE');
d.sessions.push({room:'R',start:'2026-10-27T01:50:00Z',end:'2026-10-27T02:30:00Z',closed:false});assert.equal(E.status(d,r,now),'OCCUPIED');
d.schedules.push({room:'R',start:'2026-10-27T02:00:00Z',end:'2026-10-27T03:00:00Z'});assert.equal(E.status(d,r,now),'IN CLASS');assert.equal(E.status(d,{...r,override:'UNDER MAINTENANCE'},now),'UNDER MAINTENANCE');
assert.equal(E.overlap('2026-10-27T01:00Z','2026-10-27T02:00Z','2026-10-27T02:00Z','2026-10-27T03:00Z'),false);
assert.equal(E.blockers(d,'R','2026-10-27T02:10Z','2026-10-27T02:20Z').length,2);
const future={schedules:[{room:'R',start:'2026-10-27T02:20:00Z',end:'2026-10-27T03:00:00Z'}],reservations:[],sessions:[]};assert.equal(E.sessionEnd(future,'R',60,now),'2026-10-27T02:20:00.000Z');future.reservations.push({room:'R',start:'2026-10-27T02:10:00Z',end:'2026-10-27T02:15:00Z',status:'Pending'});assert.equal(E.sessionEnd(future,'R',60,now),'2026-10-27T02:20:00.000Z');future.reservations[0].status='Approved';assert.equal(E.sessionEnd(future,'R',60,now),'2026-10-27T02:10:00.000Z');
assert.equal(E.status({schedules:[],reservations:[],sessions:[{room:'R',end:'2026-10-27T01:59:00Z',closed:false}]},r,now),'AVAILABLE');console.log('10 scheduling assertions passed');

!function(t){var e={};function a(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(s,o,(function(e){return t[e]}).bind(null,o));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s="fmah")}({fmah:function(t,e,a){"use strict";a.r(e);class s{constructor(t){this.shipData=t,this.accumulatedThreat=0,this.armour=t.totalArmour,this.shield=t.totalShield,this.threat=t.threat}}class o{}class i{constructor(){this.quantity=0,this.quantityEnd=0,this.lost=0,this.exploded=0,this.kills=0,this.oneShotted=0,this.oneShotDone=0,this.damageDone=0,this.armourDamageDone=0,this.shieldDamageDone=0,this.damageTaken=0,this.armourDamageTaken=0,this.shieldDamageTaken=0,this.deathTargets=0,this.aliveTargets=0,this.aliveTargetsShield=0,this.aliveTargetsNoShield=0,this.explosionTriggered=0,this.shotTaken=0,this.shotTakenDeath=0,this.shieldRegenerationReceived=0,this.threatAvg=0,this.threatQta=0,this.shipHit=0,this.defenceHit=0}}class n{constructor(){this.name=""}}class r{constructor(){this.won=!1}}function l(t,e){let a=0;const s=e.shieldPercent*e.adaptivePrecision,o=e.armourPercent*e.adaptivePrecision,i=(e.defencePercent-1)*e.adaptivePrecision;for(let h=0,d=t.length;h<d;h++)a+=t[h].totalThreat,a+=t[h].alive.length*e.precision,a+=s*t[h].withShield,a+=o*t[h].withArmour,t[h].isDefence&&(a+=i*t[h].alive.length);const n=Math.random()*a;let r,l=0;for(let h=0,d=t.length;h<d;h++)for(let a=0,u=t[h].ships.length;a<u;a++)if(r=t[h].ships[a],l+=r.threat,t[h].isDefence&&r.armour>0&&(l+=i),r.shield>0?l+=s:r.armour>0&&(l+=o,l+=e.precision),l>=n)return r}function h(t,e,a,s){let o=0,i=t.damage;e.shipData.isDefence&&(i*=t.defencePercent);const n=e.armour>=e.shipData.totalArmour&&e.shield>=e.shipData.totalShield;if(e.shield>0){let n=0;if(i*=t.shieldPercent,i-=e.shipData.shieldReduction,i>0){const r=e.shield;e.shield-=i,e.shield>0?(n=i,i=0):(i=-1*e.shield/t.shieldPercent,n=r,e.shipData.withShield--,e.shipData.withArmour++),e.shipData.stats.rounds[s].damageTaken+=n,e.shipData.stats.rounds[s].shieldDamageTaken+=n,a.shipData.stats.rounds[s].damageDone+=n,a.shipData.stats.rounds[s].shieldDamageDone+=n,a.shipData.stats.rounds[s].aliveTargetsShield++,o+=n}}else a.shipData.stats.rounds[s].aliveTargetsNoShield++;if(i>0&&(i*=t.armourPercent,i-=e.shipData.armourReduction,i>0)){const t=e.armour;e.armour-=i;const n=Math.max(t-e.armour,0);e.shipData.stats.rounds[s].damageTaken+=n,e.shipData.stats.rounds[s].armourDamageTaken+=n,a.shipData.stats.rounds[s].damageDone+=n,a.shipData.stats.rounds[s].armourDamageDone+=n,o+=n}if(o>0&&(a.accumulatedThreat+=o*t.threatMulti),e.armour>0&&e.armour<e.shipData.explosionThreshold){const t=1-e.armour/e.shipData.explosionThreshold;Math.random()<t&&(e.armour=0,e.shipData.stats.rounds[s].exploded++,a.shipData.stats.rounds[s].explosionTriggered++,e.shipData.explosionDamage>0&&a.armour>0&&h(e.shipData.explosionWeapon,a,e,s))}if(e.armour<=0){const t=e.shipData.alive.indexOf(e);t>=0&&e.shipData.alive.splice(t,1),e.shipData.withArmour--,e.shipData.stats.rounds[s].lost++,a.shipData.stats.rounds[s].kills++,n&&(e.shipData.stats.rounds[s].oneShotted++,a.shipData.stats.rounds[s].oneShotDone++)}}addEventListener("message",({data:t})=>{const e=function(t){const e=new r,a=[t.enemyFleet,t.playerFleet];for(let r=0,l=a.length;r<l;r++)a[r].forEach(t=>{t.ships=[],t.alive=[],t.targets=0===r?a[1]:a[0],t.explosionDamage>0&&(t.explosionWeapon=new o,t.explosionWeapon.shieldPercent=1,t.explosionWeapon.armourPercent=1,t.explosionWeapon.damage=t.explosionDamage),t.totalThreat=t.threat*t.quantity,t.stats=new n,t.stats.name=t.name,t.stats.designId=t.designId,t.stats.player=1===r,t.stats.total=new i,t.stats.total.quantity=t.quantity,t.stats.rounds=new Array(5);for(let e=0,a=t.weapons.length;e<a;e++)t.weapons[e].armourPercent/=100,t.weapons[e].shieldPercent/=100;for(let e=0;e<5;e++)t.stats.rounds[e]=new i;for(let e=0;e<t.quantity;e++){const e=new s(t);t.ships.push(e),t.alive.push(e)}t.totalShield>0?(t.withArmour=0,t.withShield=t.quantity):(t.withArmour=t.quantity,t.withShield=0)});for(let s=0;s<5;s++){for(let t=0;t<2;t++){const e=a[t];for(let t=0,a=e.length;t<a;t++){const a=e[t];a.stats.rounds[s].quantity=a.ships.length;for(let t=0,e=a.ships.length;t<e;t++){const e=a.ships[t];for(let t=0,o=a.weapons.length;t<o;t++){const o=l(e.shipData.targets,a.weapons[t]);o&&(o.shipData.stats.rounds[s].shotTaken++,o.shipData.isDefence?e.shipData.stats.rounds[s].defenceHit++:e.shipData.stats.rounds[s].shipHit++,o.armour>0?(e.shipData.stats.rounds[s].aliveTargets++,h(a.weapons[t],o,e,s)):(e.shipData.stats.rounds[s].deathTargets++,o.shipData.stats.rounds[s].shotTakenDeath++))}}}}for(let t=0;t<2;t++){const e=a[t];for(let t=0,a=e.length;t<a;t++){for(let a=0,o=e[t].ships.length;a<o;a++){const o=e[t].ships[a].threat+e[t].ships[a].accumulatedThreat;e[t].stats.rounds[s].threatAvg+=o,e[t].stats.total.threatAvg+=o}e[t].stats.rounds[s].threatAvg/=e[t].ships.length,e[t].stats.total.threatQta+=e[t].ships.length}}for(let t=0;t<2;t++){const e=a[t];for(let t=0,a=e.length;t<a;t++){const a=e[t];if(a.ships=a.alive.slice(),a.stats.rounds[s].quantityEnd=a.alive.length,s<4){a.totalThreat=0;for(let t=0,e=a.alive.length;t<e;t++)a.alive[t].threat+=a.alive[t].accumulatedThreat,a.totalThreat+=a.alive[t].threat}}}for(let t=0;t<2;t++){const e=a[t];let o=0,i=new Array;for(let t=0,a=e.length;t<a;t++){const a=e[t];o+=a.shieldRecharge*a.alive.length;for(let t=0,e=a.alive.length;t<e;t++)a.alive[t].shield>0&&a.alive[t].shield<a.alive[t].shipData.totalShield&&i.push(a.alive[t])}if(o>0&&i.length>0){i=i.sort((t,e)=>(t.shipData.totalShield-t.shield)/t.shipData.totalShield-(e.shipData.totalShield-e.shield)/e.shipData.totalShield);for(let t=0,e=i.length;t<e;t++)if(o>0){const e=i[t].shield;i[t].shield=Math.min(i[t].shield+o,i[t].shipData.totalShield);const a=i[t].shield-e;o-=a,i[t].shipData.stats.rounds[s].shieldRegenerationReceived+=a}}}if(t.enemyFleet.findIndex(t=>t.ships.length>0)<0||t.playerFleet.findIndex(t=>t.ships.length>0)<0)break}e.gameId=t.gameId,e.playerLost=t.playerFleet.map(t=>({id:t.designId,lost:t.quantity-t.ships.length})),e.enemyLost=t.enemyFleet.map(t=>({id:t.designId,lost:t.quantity-t.ships.length})),e.stats=[];for(let s=0,o=a.length;s<o;s++)a[s].forEach(t=>{for(let e=0;e<5;e++)t.stats.total.exploded+=t.stats.rounds[e].exploded,t.stats.total.kills+=t.stats.rounds[e].kills,t.stats.total.lost+=t.stats.rounds[e].lost,t.stats.total.quantityEnd=t.alive.length,t.stats.total.oneShotted+=t.stats.rounds[e].oneShotted,t.stats.total.shotTaken+=t.stats.rounds[e].shotTaken,t.stats.total.shotTakenDeath+=t.stats.rounds[e].shotTakenDeath,t.stats.total.aliveTargetsShield+=t.stats.rounds[e].aliveTargetsShield,t.stats.total.aliveTargetsNoShield+=t.stats.rounds[e].aliveTargetsNoShield,t.stats.total.explosionTriggered+=t.stats.rounds[e].explosionTriggered,t.stats.total.oneShotDone+=t.stats.rounds[e].oneShotDone,t.stats.total.deathTargets+=t.stats.rounds[e].deathTargets,t.stats.total.aliveTargets+=t.stats.rounds[e].aliveTargets,t.stats.total.damageDone+=t.stats.rounds[e].damageDone,t.stats.total.armourDamageDone+=t.stats.rounds[e].armourDamageDone,t.stats.total.shieldDamageDone+=t.stats.rounds[e].shieldDamageDone,t.stats.total.damageTaken+=t.stats.rounds[e].damageTaken,t.stats.total.armourDamageTaken+=t.stats.rounds[e].armourDamageTaken,t.stats.total.shieldDamageTaken+=t.stats.rounds[e].shieldDamageTaken,t.stats.total.shieldRegenerationReceived+=t.stats.rounds[e].shieldRegenerationReceived,t.stats.total.shipHit+=t.stats.rounds[e].shipHit,t.stats.total.defenceHit+=t.stats.rounds[e].defenceHit;t.stats.total.threatAvg=t.stats.total.threatAvg/t.stats.total.threatQta,e.stats.push(t.stats)});return e.endTime=t.endTime,e}(t);postMessage(e)})}});
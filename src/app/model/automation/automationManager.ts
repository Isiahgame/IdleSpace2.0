import { AbstractAutobuyer } from "./abstractAutoBuyer";
import { Game } from "../game";
import { AutoBuilding } from "./autoBuilding";
import { AutoWorker } from "./autoWorker";
import { AutoFleetUpdate } from "./autoFleetUpdate";
import { AutoSearch } from "./autoSearch";
import { SpaceStationAutoBuyer } from "./spaceStationAutoBuyer";
import { AutoSurrender } from "./autoSurrender";
import { AutoRefresh } from "./autoRefresh";
import { AutoMod } from "./autoMod";
import { AutoFull } from "./autoFull";
import { AutoPrestige } from "./autoPrestige";
import { InfrastructureAutoBuyer } from "./infrastructureAutoBuyer";
import { AutoWarp } from "./autoWarp";

export class AutomationManager {
  on = true;
  autobuyers = new Array<AbstractAutobuyer>();
  orderedAutoBuyers = new Array<AbstractAutobuyer>();
  fleetUpdater: AutoFleetUpdate;
  autoSearch: AutoSearch;
  spaceStationAutoBuyer: SpaceStationAutoBuyer;
  autoSurrender: AutoSurrender;
  autoRefresh: AutoRefresh;
  autoFull: AutoFull;
  autoPrestige: AutoPrestige;
  autoInfrastructure: InfrastructureAutoBuyer;
  autoWarp: AutoWarp;

  constructor() {
    const game = Game.getGame();
    game.resourceManager.buildings.forEach((building) => {
      this.autobuyers.push(new AutoBuilding(building));
    });
    game.resourceManager.workers.forEach((worker) => {
      this.autobuyers.push(new AutoWorker(worker));
      this.autobuyers.push(new AutoMod(worker));
    });

    this.fleetUpdater = new AutoFleetUpdate();
    this.autobuyers.push(this.fleetUpdater);

    this.autoSearch = new AutoSearch();
    this.autobuyers.push(this.autoSearch);

    this.spaceStationAutoBuyer = new SpaceStationAutoBuyer();
    this.autobuyers.push(this.spaceStationAutoBuyer);

    this.autoSurrender = new AutoSurrender();
    this.autobuyers.push(this.autoSurrender);

    this.autoRefresh = new AutoRefresh();
    this.autobuyers.push(this.autoRefresh);

    this.autoFull = new AutoFull();
    this.autobuyers.push(this.autoFull);

    this.autoPrestige = new AutoPrestige();
    this.autobuyers.push(this.autoPrestige);

    this.autoInfrastructure = new InfrastructureAutoBuyer();
    this.autobuyers.push(this.autoInfrastructure);

    this.autoWarp = new AutoWarp();
    this.autobuyers.push(this.autoWarp);

    this.autobuyers.forEach((a) => a.reload());
    this.sort();
  }
  update() {
    if (!this.on) return false;
    if (Game.getGame().firstUpdate) return false;

    const now = Date.now();
    for (let i = 0, n = this.orderedAutoBuyers.length; i < n; i++) {
      this.orderedAutoBuyers[i].execute(now);
    }
  }
  sort() {
    this.orderedAutoBuyers = this.autobuyers.sort(
      (p, n) => n.priority - p.priority
    );
  }

  //#region Save and Load
  getSave(): any {
    return { o: this.on, l: this.autobuyers.map((a) => a.getSave()) };
  }
  load(save: any) {
    if (!("l" in save)) return false;
    if ("o" in save) this.on = save.o;
    for (const data of save.l) {
      if ("i" in data) {
        // tslint:disable-next-line:triple-equals
        const auto = this.autobuyers.find((a) => a.id == data.i);
        if (auto) {
          auto.load(data);
        }
      }
    }
    this.autobuyers.forEach((a) => a.reload());
    this.sort();
    return true;
  }
  //#endregion
}
